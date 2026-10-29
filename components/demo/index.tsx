import type { ReactNode } from "react";

export function Demo({
  children,
  light = true,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div data-demo data-light={light || undefined}>
      {children}
    </div>
  );
}
