import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  runtimeEnv: process.env as Record<string, string>,
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_POLAR_DEVELOPMENT_PRODUCT_ID: z.string(),
    NEXT_PUBLIC_POLAR_PREVIEW_PRODUCT_ID: z.string(),
    NEXT_PUBLIC_POLAR_PRODUCTION_PRODUCT_ID: z.string(),
    NEXT_PUBLIC_POLAR_DEVELOPMENT_SERVER: z.enum(["sandbox", "production"]),
    NEXT_PUBLIC_POLAR_PREVIEW_SERVER: z.enum(["sandbox", "production"]),
    NEXT_PUBLIC_POLAR_PRODUCTION_SERVER: z.enum(["sandbox", "production"]),
    NEXT_PUBLIC_APP_DEVELOPMENT_URL: z.string(),
    NEXT_PUBLIC_APP_PREVIEW_URL: z.string(),
    NEXT_PUBLIC_APP_PRODUCTION_URL: z.string(),
  },
  server: {
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REFRESH_TOKEN: z.string(),
    STEAM_STEAM_ID: z.string(),
    STEAM_API_KEY: z.string(),
    STEAM_DOMAIN_NAME: z.string(),
    POLAR_ACCESS_DEVELOPMENT_TOKEN: z.string(),
    POLAR_ACCESS_PREVIEW_TOKEN: z.string(),
    POLAR_ACCESS_PRODUCTION_TOKEN: z.string(),
    POLAR_SUCCESS_DEVELOPMENT_URL: z.string(),
    POLAR_SUCCESS_PREVIEW_URL: z.string(),
    POLAR_SUCCESS_PRODUCTION_URL: z.string(),
  },
});
