'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface SpringTransition {
	type: 'spring'
	stiffness?: number
	damping?: number
	mass?: number
	velocity?: number
	restSpeed?: number
	restDelta?: number
	duration?: number
}

interface TweenTransition {
	type: 'tween'
	ease?: string | string[]
	duration?: number
	delay?: number
}

interface InertiaTransition {
	type: 'inertia'
	bounceStiffness?: number
	bounceDamping?: number
	power?: number
	timeConstant?: number
	restDelta?: number
	restSpeed?: number
	duration?: number
}

type CustomTransition = SpringTransition | TweenTransition | InertiaTransition

interface DialogContextProps {
	open: boolean
	setOpen: (open: boolean) => void
	layoutId: string
	transition?: CustomTransition
}

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
	transition?: CustomTransition
}

interface DialogTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
	animateProps?: HTMLMotionProps<'div'>
}

interface DialogContentProps extends HTMLMotionProps<'div'> {
	overlayClassName?: string
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined)

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
	({ children, transition, ...props }, ref) => {
		const [open, setOpen] = useState(false)
		const [layoutId] = useState(() => uuidv4())

		return (
			<DialogContext.Provider value={{ open, setOpen, layoutId, transition }}>
				<div {...props} ref={ref}>
					{children}
				</div>
			</DialogContext.Provider>
		)
	}
)

Dialog.displayName = 'Dialog'

const DialogTrigger = React.forwardRef<HTMLDivElement, DialogTriggerProps>(
	({ children, className, animateProps, ...props }, ref) => {
		const context = useContext(DialogContext)
		if (!context) {
			throw new Error('DialogTrigger must be used within a Dialog')
		}
		const { setOpen, layoutId } = context

		return (
			<motion.div
				ref={ref}
				className={cn(className, 'relative isolate')}
				onClick={() => setOpen(true)}
				layoutId={layoutId}
			>
				{children}
			</motion.div>
		)
	}
)

DialogTrigger.displayName = 'DialogTrigger'

const DialogPortal = React.forwardRef<HTMLDivElement, DialogContentProps>(
	({ children, className, ...props }, ref) => {
		const context = useContext(DialogContext)
		if (!context) {
			throw new Error('DialogPortal must be used within a Dialog')
		}
		const { open, transition } = context

		return (
			<AnimatePresence>
				{open && (
					<motion.div
						className={cn(
							'fixed inset-0 z-10 flex items-center justify-center',
							className
						)}
						transition={transition}
						{...props}
						ref={ref}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		)
	}
)

DialogPortal.displayName = 'DialogPortal'

const DialogOverlay = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
	({ className, ...props }, ref) => (
		<motion.div
			className={cn('fixed inset-0 bg-black bg-opacity-50 backdrop-blur', className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			{...props}
			ref={ref}
		/>
	)
)

DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
	({ children, className, ...props }, ref) => {
		const context = useContext(DialogContext)
		if (!context) {
			throw new Error('DialogContent must be used within a Dialog')
		}
		const { setOpen, layoutId } = context

		return (
			<motion.div
				ref={ref}
				className={cn('relative isolate flex h-full w-full', className)}
				layoutId={layoutId}
				onClick={() => setOpen(false)}
				{...props}
			>
				{children}
			</motion.div>
		)
	}
)

DialogContent.displayName = 'DialogContent'

export { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger }

export type { CustomTransition }
