import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("https://raphaelsalaja.com"),
  },
  server: {
    SPOTIFY_CLIENT_ID: z.string().optional(),
    SPOTIFY_CLIENT_SECRET: z.string().optional(),
    SPOTIFY_REFRESH_TOKEN: z.string().optional(),
    STEAM_STEAM_ID: z.string().optional(),
    STEAM_API_KEY: z.string().optional(),
    STEAM_DOMAIN_NAME: z.string().optional(),
    POLAR_ACCESS_TOKEN: z.string().optional(),
    POLAR_SUCCESS_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("https://raphaelsalaja.com"),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_POLAR_PRODUCT_ID: z.string().uuid().optional(),
    NEXT_PUBLIC_POLAR_SERVER: z.enum(["sandbox", "production"]).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_POLAR_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    STEAM_STEAM_ID: process.env.STEAM_STEAM_ID,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
    STEAM_DOMAIN_NAME: process.env.STEAM_DOMAIN_NAME,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_SUCCESS_URL: process.env.POLAR_SUCCESS_URL,
    NEXT_PUBLIC_POLAR_SERVER: process.env.NEXT_PUBLIC_POLAR_SERVER,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
