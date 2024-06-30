import { AnimationProps } from 'framer-motion'
import React from 'react'

interface Root extends React.HTMLAttributes<HTMLDivElement> {}

interface Content extends React.HTMLAttributes<HTMLDivElement> {
  transition?: AnimationProps['transition']
}

export type { Content, Root }
