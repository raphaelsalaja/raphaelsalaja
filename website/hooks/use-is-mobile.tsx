import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

/**
 * @description next.js mobile detection
 */
export async function isServerMobile() {
  const userAgent = (await headers()).get("user-agent") || "";
  const { device } = userAgentFromString(userAgent || undefined);

  return device.type === "mobile";
}
