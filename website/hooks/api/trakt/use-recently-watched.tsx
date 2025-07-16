import { useQuery } from "@tanstack/react-query";
import type { components } from "@/types/trakt";

type Show = components["schemas"]["Show"];

export function useTraktGetLastWatched() {
  return useQuery({
    queryKey: ["trakt", "last-watched-show"],
    queryFn: async () => {
      const res = await fetch("/api/trakt/get/last-watched");
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return res.json() as Promise<Show | null>;
    },
    staleTime: 60_000,
  });
}
