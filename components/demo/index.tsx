import { Children, isValidElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { Showcase } from "@/components/showcase";

export function Demo({
  wide,
  children,
}: {
  /** Breaks out of the text column, for a stage with settings beside it. */
  wide?: boolean;
  children: ReactNode;
}) {
  if (wide) {
    return (
      <div data-demo data-wide>
        {children}
      </div>
    );
  }

  const nodes = Children.toArray(children);
  const isCode = (node: ReactNode) =>
    isValidElement(node) && node.type === CodeBlock;

  return (
    <Showcase code={nodes.filter(isCode)}>
      <div data-demo>{nodes.filter((node) => !isCode(node))}</div>
    </Showcase>
  );
}
