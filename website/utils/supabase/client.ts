// biome-ignore-all lint/style/noNonNullAssertion: env

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/env";

export const createClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient();
