import { Separator } from "@base-ui-components/react/separator";

import "./styles.css";

interface SeparatorProps extends React.ComponentProps<typeof Separator> {
  variant?: "default" | "dashed" | "unset";
}

const SeparatorComponent = ({ variant = "default", className, ...props }: SeparatorProps) => {
  return <Separator data-shunpo-separator={variant} className={className} {...props} />;
};

export { SeparatorComponent as Separator };
