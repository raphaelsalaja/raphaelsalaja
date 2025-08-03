import { Checkout } from "@polar-sh/nextjs";
import { APP_ENV } from "@/config/site";
import { env } from "@/env";

export const GET = Checkout({
  accessToken:
    APP_ENV === "development"
      ? env.POLAR_SANDBOX_ACCESS_TOKEN
      : env.POLAR_ACCESS_TOKEN,
  successUrl:
    APP_ENV === "development"
      ? env.POLAR_SANDBOX_SUCCESS_URL
      : env.POLAR_SUCCESS_URL,
  server: "sandbox",
  theme: "light",
});
