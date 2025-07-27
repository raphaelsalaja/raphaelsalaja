import clsx from "clsx";
import { forwardRef } from "react";

import "./styles.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  children?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "accent"
    | "destructive"
    | "warning"
    | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      disabled = false,
      focused,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
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
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
