import { Children, isValidElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { Showcase } from "@/components/showcase";

export function Demo({
  variant,
  wide,
  children,
}: {
  variant?: "transparent";
  /** Breaks out of the text column, for a stage with settings beside it. */
  wide?: boolean;
  children: ReactNode;
}) {
  const nodes = Children.toArray(children);
  const isCode = (node: ReactNode) =>
    isValidElement(node) && node.type === CodeBlock;
  const code = nodes.filter(isCode);

  if (code.length === 0) {
    return (
      <div data-demo={variant ?? ""} data-wide={wide ? "" : undefined}>
        {children}
      </div>
    );
  }

  return (
    <Showcase code={code}>
      <div data-demo={variant ?? ""} data-wide={wide ? "" : undefined}>
        {nodes.filter((node) => !isCode(node))}
      </div>
    </Showcase>
  );
}
