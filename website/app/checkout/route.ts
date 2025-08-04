import { Checkout } from "@polar-sh/nextjs";
import { accessToken, server, successUrl } from "@/lib/polar";

export const GET = Checkout({
  accessToken: accessToken(),
  successUrl: successUrl(),
  server: server(),
  theme: "light",
});
