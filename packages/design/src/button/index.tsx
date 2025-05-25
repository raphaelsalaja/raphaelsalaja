import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import { forwardRef } from "react";

import "./styles.css";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  href?: string;
  className?: string;
  asChild?: boolean;
  asMotion?: boolean;
  disabled?: boolean;
  focused?: boolean;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "warning" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, variant = "primary", disabled = false, focused, className, asMotion, ...props }, ref) => {
    const Comp = asChild ? Slot : asMotion ? (motion.button as any) : "button";

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
        {children && (
          <button type="button" className="children">
            {children}
          </button>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
