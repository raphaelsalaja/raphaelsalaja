import { TraktHistoryEntry, TraktHistoryRaw, TraktIds } from "@/types/trakt";

const BASE_URL = "https://api.trakt.tv";
const API_VERSION = "2";

interface ClientConfig {
  clientId: string;
  userSlug: string;
  token?: string; // if you eventually need OAuth
}

export class TraktClient {
  private clientId: string;
  private userSlug: string;
  private token?: string;

  constructor({ clientId, userSlug, token }: ClientConfig) {
    if (!clientId || !userSlug) {
      throw new Error("TraktClient requires clientId and userSlug");
    }
    this.clientId = clientId;
    this.userSlug = userSlug;
    this.token = token;
  }

  private get headers() {
    const h: Record<string, string> = {
      "Content-Type": "application/json",
      "trakt-api-key": this.clientId,
      "trakt-api-version": API_VERSION,
    };
    if (this.token) {
      h.Authorization = `Bearer ${this.token}`;
    }
    return h;
  }

  private async request<T>(path: string): Promise<T> {
    const res = await fetch(BASE_URL + path, { headers: this.headers });
    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      throw new Error(`Trakt API ${res.status}: ${text}`);
    }
    return res.json();
  }

  /** raw history items */
  async getUserHistory(options?: { limit?: number; extended?: string }): Promise<TraktHistoryRaw[]> {
    const qp = new URLSearchParams();
    if (options?.limit) qp.set("limit", String(options.limit));
    if (options?.extended) qp.set("extended", options.extended);
    const path = `/users/${encodeURIComponent(this.userSlug)}/history?${qp}`;
    return this.request<TraktHistoryRaw[]>(path);
  }

  /** mapped, single entry or null */
  async getLastWatchedEntry(): Promise<TraktHistoryEntry | null> {
    const raw = (await this.getUserHistory({ limit: 1, extended: "images" }))[0];
    if (!raw) return null;

    const base = {
      watchedAt: raw.watched_at,
      action: raw.action,
    };

    if (raw.movie) {
      const m = raw.movie;
      return {
        ...base,
        type: "movie",
        title: m.title,
        year: m.year,
        ids: m.ids as TraktIds,
        images: m.images,
        url: `https://trakt.tv/movies/${m.ids.slug}-${m.year}`,
      };
    }

    if (raw.episode && raw.show) {
      const e = raw.episode;
      const s = raw.show;
      const poster = Array.isArray(e.images?.poster) && e.images.poster.length ? e.images.poster : s.images.poster;

      return {
        ...base,
        type: "episode",
        showTitle: s.title,
        showYear: s.year,
        showIds: s.ids as TraktIds,
        episodeTitle: e.title || "",
        season: e.season,
        episode: e.number,
        ids: e.ids as TraktIds,
        images: { poster, screenshot: e.images?.screenshot || [] },
        url: `https://trakt.tv/shows/${s.ids.slug}/seasons/${e.season}/episodes/${e.number}`,
      };
    }

    // unknown type
    return null;
  }
}
