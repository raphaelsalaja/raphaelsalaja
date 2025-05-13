import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    // biome-ignore lint/style/noNonNullAssertion: env variable is always set
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: env variable is always set
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient();
