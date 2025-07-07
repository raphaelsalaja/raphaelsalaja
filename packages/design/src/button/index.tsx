import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";

import "./styles.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
  focused?: boolean;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "warning" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, variant = "primary", disabled = false, focused, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-shunpo-button
        data-shunpo-button-variant={variant}
        data-shunpo-button-disabled={disabled}
        data-shunpo-button-focus-visible={focused}
        className={clsx("button", className)}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
