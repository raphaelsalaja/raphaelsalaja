import type { MDXComponents } from "mdx/types";

export async function libraryDemos(slug: string): Promise<MDXComponents> {
  if (slug === "12-principles-of-animation") {
    const { Principles } = await import("@/components/mdx/12-principles");
    return Principles;
  }

  if (slug === "the-rise-of-design-engineering") {
    const { Talk } = await import("@/components/mdx/talk");
    return { Talk };
  }

  if (slug === "simply-effective") {
    const { SimplyEffective } = await import(
      "@/components/mdx/simply-effective"
    );
    return SimplyEffective;
  }

  return {};
}

export async function workDemos(slug: string): Promise<MDXComponents> {
  if (slug === "family-wallet") {
    const { FamilyWallet } = await import(
      "@/components/mdx/experiments/family-wallet"
    );
    return { FamilyWallet };
  }

  if (slug === "low-battery-notification") {
    const { LowBatteryNotification } = await import(
      "@/components/mdx/experiments/low-battery-notification"
    );
    return { LowBatteryNotification };
  }

  return {};
}
