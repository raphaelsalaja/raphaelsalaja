import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const AI_SEARCH = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

const AI_TRAINING = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

const group = (agents: string[], rule: string) =>
  `${agents.map((agent) => `User-agent: ${agent}`).join("\n")}\n${rule}`;

export function GET() {
  const text = `# Content signals: https://contentsignals.org
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

# AI search and assistants: allowed, so pages can be cited in answers
${group(AI_SEARCH, "Allow: /")}

# AI training crawlers: not allowed
${group(AI_TRAINING, "Disallow: /")}

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
