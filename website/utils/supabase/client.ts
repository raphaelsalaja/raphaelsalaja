// biome-ignore-all lint/style/noNonNullAssertion: env

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/env";

export const createClient = () => {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return a mock client or throw an error that can be handled gracefully
    console.warn("Supabase environment variables not configured");
    return null;
  }

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};

export const supabase = createClient();
