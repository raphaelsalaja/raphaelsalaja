import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {},
  server: {
    CLOUDINARY_API_SECRET: z.string(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REFRESH_TOKEN: z.string(),
    STEAM_STEAM_ID: z.string(),
    STEAM_API_KEY: z.string(),
    STEAM_DOMAIN_NAME: z.string(),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_SUCCESS_URL: z.string(),
    POLAR_SANDBOX_ACCESS_TOKEN: z.string(),
    POLAR_SANDBOX_SUCCESS_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_SUCCESS_URL: process.env.POLAR_SUCCESS_URL,
    POLAR_SANDBOX_ACCESS_TOKEN: process.env.POLAR_SANDBOX_ACCESS_TOKEN,
    POLAR_SANDBOX_SUCCESS_URL: process.env.POLAR_SANDBOX_SUCCESS_URL,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    STEAM_STEAM_ID: process.env.STEAM_STEAM_ID,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
    STEAM_DOMAIN_NAME: process.env.STEAM_DOMAIN_NAME,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
