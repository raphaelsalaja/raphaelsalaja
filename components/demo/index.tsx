import type { ReactNode } from "react";

export function Demo({
  variant,
  children,
}: {
  variant?: "transparent";
  children: ReactNode;
}) {
  return <div data-demo={variant ?? ""}>{children}</div>;
}
