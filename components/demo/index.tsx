import type { ReactNode } from "react";

export function Demo({ children }: { children: ReactNode }) {
  return (
    <div data-demo data-light>
      {children}
    </div>
  );
}
