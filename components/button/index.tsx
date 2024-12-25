import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { type HTMLMotionProps, motion } from 'motion/react'
import { forwardRef } from 'react'

import styles from './styles.module.scss'

export interface ButtonProps extends HTMLMotionProps<'button'> {
  href?: string
  className?: string
  asChild?: boolean
  asMotion?: boolean
  disabled?: boolean
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent' | undefined
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, variant = 'primary', disabled, className, asMotion, ...props }, ref) => {
    const Comp = asChild ? Slot : asMotion ? (motion.button as any) : 'button'

    return (
      <Comp
        ref={ref}
        data-shunpo-button
        data-shunpo-button-variant={variant}
        data-shunpo-button-disabled={disabled}
        className={clsx(styles.button, className)}
        aria-disabled={disabled}
        {...props}
      >
        {children && <span className={styles.children}>{children}</span>}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export default Button
