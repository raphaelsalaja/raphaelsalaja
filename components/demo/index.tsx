import { Children, isValidElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { Showcase } from "@/components/showcase";

export function Demo({
  variant,
  children,
}: {
  variant?: "transparent";
  children: ReactNode;
}) {
  const nodes = Children.toArray(children);
  const isCode = (node: ReactNode) =>
    isValidElement(node) && node.type === CodeBlock;
  const code = nodes.filter(isCode);

  if (code.length === 0) {
    return <div data-demo={variant ?? ""}>{children}</div>;
  }

  return (
    <Showcase code={code}>
      <div data-demo={variant ?? ""}>
        {nodes.filter((node) => !isCode(node))}
      </div>
    </Showcase>
  );
}
