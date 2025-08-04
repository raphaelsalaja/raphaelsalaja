import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

/**
 * @description next.js mobile detection
 * @note This function uses headers() which makes components dynamic
 */
export async function isServerMobile() {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const { device } = userAgentFromString(userAgent || undefined);

    return device.type === "mobile";
  } catch (error) {
    // Fallback for when headers are not available (e.g., static generation)
    console.warn("Could not access headers for mobile detection:", error);
    return false;
  }
}
