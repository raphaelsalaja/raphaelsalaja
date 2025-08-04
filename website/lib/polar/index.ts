import { Polar } from "@polar-sh/sdk";
import { VERCEL_ENV } from "@/config/site";
import { env } from "@/env";

export const accessToken = () => {
  switch (VERCEL_ENV) {
    case "development":
      return env.POLAR_ACCESS_DEVELOPMENT_TOKEN;
    case "preview":
      return env.POLAR_ACCESS_PREVIEW_TOKEN;
    case "production":
      return env.POLAR_ACCESS_PRODUCTION_TOKEN;
    default:
      return env.POLAR_ACCESS_DEVELOPMENT_TOKEN;
  }
};

export const successUrl = () => {
  switch (VERCEL_ENV) {
    case "development":
      return env.POLAR_SUCCESS_DEVELOPMENT_URL;
    case "preview":
      return env.POLAR_SUCCESS_PREVIEW_URL;
    case "production":
      return env.POLAR_SUCCESS_PRODUCTION_URL;
    default:
      return env.POLAR_SUCCESS_DEVELOPMENT_URL;
  }
};

export const server = () => {
  switch (VERCEL_ENV) {
    case "development":
      return env.NEXT_PUBLIC_POLAR_DEVELOPMENT_SERVER;
    case "preview":
      return env.NEXT_PUBLIC_POLAR_PREVIEW_SERVER;
    case "production":
      return env.NEXT_PUBLIC_POLAR_PRODUCTION_SERVER;
    default:
      return env.NEXT_PUBLIC_POLAR_DEVELOPMENT_SERVER;
  }
};

export const id = () => {
  switch (VERCEL_ENV) {
    case "development":
      return env.NEXT_PUBLIC_POLAR_DEVELOPMENT_PRODUCT_ID;
    case "preview":
      return env.NEXT_PUBLIC_POLAR_PREVIEW_PRODUCT_ID;
    case "production":
      return env.NEXT_PUBLIC_POLAR_PRODUCTION_PRODUCT_ID;
    default:
      return env.NEXT_PUBLIC_POLAR_DEVELOPMENT_PRODUCT_ID;
  }
};

export const polar = new Polar({
  accessToken: accessToken(),
  server: server(),
});
