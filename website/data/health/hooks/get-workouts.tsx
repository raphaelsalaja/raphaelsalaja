import { useQuery } from "@tanstack/react-query";
import { Period } from "@/types/period";
import { supabase } from "@/utils/supabase/client";
import { Workouts } from "../types";

interface GetWorkoutsOptions {
  period?: Period;
  from?: Date;
  to?: Date;
}

export async function getWorkouts(opts: GetWorkoutsOptions = {}): Promise<Workouts[]> {
  const now = new Date();

  let start: Date;

  const end: Date = opts.to ?? now;

  if (opts.period && !opts.from && !opts.to) {
    switch (opts.period) {
      case Period.Today:
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case Period.Week:
        start = new Date(now);
        start.setDate(now.getDate() - 7);
        break;
      case Period.Month:
        start = new Date(now);
        start.setMonth(now.getMonth() - 1);
        break;
      case Period.Year:
        start = new Date(now);
        start.setFullYear(now.getFullYear() - 1);
        break;
      case Period.Quarter:
        start = new Date(now);
        start.setMonth(now.getMonth() - 3);
        break;
    }
  } else {
    start =
      opts.from ??
      (() => {
        const d = new Date(end);
        d.setMonth(d.getMonth() - 1);
        return d;
      })();
  }

  const fromIso = start.toISOString();
  const toIso = end.toISOString();

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .gte("end_timestamp", Math.floor(start.getTime() / 1000))
    .lte("end_timestamp", Math.floor(end.getTime() / 1000))
    .order("end_timestamp", { ascending: false });

  if (error) {
    throw error;
  }
  return data ?? [];
}

type UseWorkoutsOptions = {
  period?: Period;
  from?: Date;
  to?: Date;
  staleTime?: number;
  enabled?: boolean;
};

export function useWorkouts({ period, from, to, staleTime = 1000 * 60 * 5, enabled = true }: UseWorkoutsOptions) {
  return useQuery<Workouts[], Error>({
    queryKey: ["workouts", { period, from: from?.toISOString(), to: to?.toISOString() }],
    queryFn: () => getWorkouts({ period, from, to }),
    staleTime,
    refetchOnWindowFocus: true,
    enabled,
  });
}
