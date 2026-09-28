import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const optionalUrl = z.preprocess((value) => {
  if (typeof value !== "string" || value.trim() === "") return undefined;

  try {
    const url = new URL(value);
    if (!url.hostname || /[$}]/.test(url.hostname)) return undefined;
    return value;
  } catch {
    return undefined;
  }
}, z.string().url().optional());

export const env = createEnv({
  runtimeEnv: {
    NEXT_PUBLIC_APP_DEVELOPMENT_URL:
      process.env.NEXT_PUBLIC_APP_DEVELOPMENT_URL,
    NEXT_PUBLIC_APP_PREVIEW_URL: process.env.NEXT_PUBLIC_APP_PREVIEW_URL,
    NEXT_PUBLIC_APP_PRODUCTION_URL: process.env.NEXT_PUBLIC_APP_PRODUCTION_URL,
  },
  client: {
    NEXT_PUBLIC_APP_DEVELOPMENT_URL: z.string().url(),
    NEXT_PUBLIC_APP_PREVIEW_URL: optionalUrl,
    NEXT_PUBLIC_APP_PRODUCTION_URL: optionalUrl,
  },
  server: {},
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
