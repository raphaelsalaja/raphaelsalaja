import { Separator } from "@base-ui-components/react/separator";

import "./styles.css";

interface SeparatorProps extends React.ComponentProps<typeof Separator> {
  variant?: "default" | "dashed" | "unset";
}

const Seperator = ({ variant = "default", className, ...props }: SeparatorProps) => {
  return <Separator data-shunpo-seperator={variant} className={className} {...props} />;
};

export { Seperator };
