export interface TraktIds {
  trakt: number;
  slug: string;
  imdb?: string;
  tmdb?: number;
  tvdb?: number;
}

export interface TraktHistoryRaw {
  watched_at: string;
  action: string;
  type: "movie" | "episode";
  movie?: {
    title: string;
    year: number;
    ids: TraktIds;
    images: Record<string, string[]>;
  };
  show?: {
    title: string;
    year: number;
    ids: TraktIds;
    images: Record<string, string[]>;
  };
  episode?: {
    title?: string;
    season: number;
    number: number;
    ids: TraktIds;
    images?: Record<string, string[]>;
  };
}

export type TraktHistoryEntry =
  | {
      type: "movie";
      watchedAt: string;
      action: string;
      title: string;
      year: number;
      ids: TraktIds;
      images: Record<string, string[]>;
      url: string;
    }
  | {
      type: "episode";
      watchedAt: string;
      action: string;
      showTitle: string;
      showYear: number;
      showIds: TraktIds;
      episodeTitle: string;
      season: number;
      episode: number;
      ids: TraktIds;
      images: { poster?: string[]; screenshot?: string[] };
      url: string;
    };
