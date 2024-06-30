'use client'

import * as React from 'react'
import * as Hooks from './hooks'
import * as Types from './types'
import * as Utils from './utils'

import useMeasure from 'react-use-measure'

import { AnimatePresence, motion } from 'framer-motion'

const Root = React.forwardRef<HTMLDivElement, Types.Root>(({ ...props }, ref) => {
  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  )
})
Root.displayName = 'Container.Root'

const Content = React.forwardRef<HTMLDivElement, Types.Content>(({ transition, ...props }, forwardedRef) => {
  const [measure, { height }] = useMeasure()
  const ref = Hooks.useCombinedReferences(measure, forwardedRef)

  return (
    <motion.div animate={{ height: height || 'auto' }} transition={transition} className='relative overflow-hidden'>
      <AnimatePresence initial={false}>
        <motion.div key={JSON.stringify(props.children, Utils.ignoreCircularReferences())}>
          <div ref={ref} className='absolute'>
            {props.children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})
Content.displayName = 'Container.Content'

export { Content, Root }
