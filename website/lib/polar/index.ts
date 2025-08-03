import { Polar } from "@polar-sh/sdk";
import { APP_ENV } from "@/config/site";
import { env } from "@/env";

export const polar = new Polar({
  accessToken:
    APP_ENV === "development"
      ? env.POLAR_SANDBOX_ACCESS_TOKEN
      : env.POLAR_ACCESS_TOKEN,
  server: APP_ENV === "development" ? "sandbox" : "production",
});
