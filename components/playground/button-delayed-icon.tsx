'use client'

import Button from '@/components/button'
import { Showcase } from '@/components/showcase'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export default function DelayedButton() {
  const [variant, setVariant] = useState<string>('Primary')
  const [state, setState] = useState<string>('Default')

  return (
    <Showcase
      options={[
        {
          label: 'Variant',
          values: ['Primary', 'Secondary', 'Tertiary', 'Accent'],
          onChange: (value: string) => {
            setVariant(value)
          }
        },
        {
          label: 'State',
          values: ['Default', 'Disabled'],
          onChange: (value: string) => {
            setState(value)
          }
        }
      ]}
    >
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={variant}
          initial={{
            opacity: 0,
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)'
          }}
          exit={{
            opacity: 0,
            filter: 'blur(10px)'
          }}
        >
          <Button variant={variant.toLowerCase()} disabled={state === 'Disabled'} asMotion>
            Button
          </Button>
        </motion.div>
      </AnimatePresence>
    </Showcase>
  )
}
