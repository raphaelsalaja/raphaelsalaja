import * as React$1 from 'react';
import { HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    href?: string;
    className?: string;
    asChild?: boolean;
    asMotion?: boolean;
    disabled?: boolean;
    focused?: boolean;
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "warning" | "ghost";
}
declare const Button: React$1.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

export { type ButtonProps, Button as default };
