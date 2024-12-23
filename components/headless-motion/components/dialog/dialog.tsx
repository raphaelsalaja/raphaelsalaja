'use client'

import * as React from 'react'
import * as Types from './types'

import { clsx } from 'clsx'
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

const Context = React.createContext<Types.Context | undefined>(undefined)

const useDialogContext = (): Types.Context => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useDialogContext must be used within a Root')
  }
  return context
}

const Root = React.memo(
  React.forwardRef<HTMLDivElement, Types.Root>(({ transition, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const layoutId = React.useRef(`dialog-${uuidv4()}`).current

    return (
      <Context.Provider value={{ open, setOpen, layoutId }}>
        <MotionConfig transition={transition}>
          <LayoutGroup>
            <div ref={ref} {...props} />
          </LayoutGroup>
        </MotionConfig>
      </Context.Provider>
    )
  })
)
Root.displayName = 'Dialog.Root'

const Trigger = React.memo(
  React.forwardRef<HTMLDivElement, Types.Trigger>(({ ...props }, ref) => {
    const { setOpen, layoutId } = useDialogContext()
    return (
      <motion.div
        ref={ref}
        className={props.className}
        style={props.style}
        layoutId={layoutId}
        onClick={() => setOpen(true)}
      >
        {props.children}
      </motion.div>
    )
  })
)
Trigger.displayName = 'Dialog.Trigger'

const Portal = React.memo(
  React.forwardRef<HTMLDivElement, Types.Portal>(({ ...props }, ref) => {
    const { open } = useDialogContext()
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            className={clsx('fixed inset-0 z-10 flex items-center justify-center', props.className)}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  })
)
Portal.displayName = 'Dialog.Portal'

const Background = React.memo(
  React.forwardRef<HTMLDivElement, Types.Background>(({ ...props }, ref) => {
    const { setOpen } = useDialogContext()
    return (
      <motion.div
        ref={ref}
        className={clsx('fixed inset-0 bg-black bg-opacity-50 backdrop-blur', props.className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setOpen(false)}
      />
    )
  })
)
Background.displayName = 'Dialog.Background'

const Content = React.memo(
  React.forwardRef<HTMLDivElement, Types.Content>(({ ...props }, ref) => {
    const { setOpen, layoutId } = useDialogContext()
    return (
      <motion.div
        ref={ref}
        onClick={() => setOpen(false)}
        layoutId={layoutId}
        className={clsx(props.className)}
        style={props.style}
      >
        {props.children}
      </motion.div>
    )
  })
)
Content.displayName = 'Dialog.Content'

const Item: React.FC<Types.Item> = React.memo(({ id, ...props }) => {
  return (
    <motion.div layoutId={id} className={props.className}>
      {props.children}
    </motion.div>
  )
})
Item.displayName = 'Dialog.Item'

export { Background, Content, Item, Portal, Root, Trigger }
