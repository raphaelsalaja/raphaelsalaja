import { routes, type VercelConfig } from "@vercel/config/v1";

const immutable = {
  public: true,
  maxAge: "1 year",
  immutable: true,
} as const;

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite(
      "/provenance",
      "https://provenance-nine-blond.vercel.app/provenance",
    ),
    routes.rewrite(
      "/provenance/:path*",
      "https://provenance-nine-blond.vercel.app/provenance/:path*",
    ),
  ],
  redirects: [
    { source: "/work", destination: "/#experiments", permanent: true },
  ],
  headers: [
    routes.cacheControl("/media/(.*)", immutable),
    routes.cacheControl("/shaders/(.*)", immutable),
    routes.header("/(.*)", [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ]),
  ],
};
