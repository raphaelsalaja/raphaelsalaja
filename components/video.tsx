'use client'

import { gray } from '@radix-ui/colors'
import { motion } from 'framer-motion'
import React from 'react'

interface CustomVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  caption?: string
  href?: string
}

export default function CustomVideo({ caption, ...props }: CustomVideoProps) {
  const [isVideoLoading, setVideoLoading] = React.useState(true)
  const { ...remaining } = props

  return (
    <motion.div
      className='my-6 flex cursor-pointer flex-col justify-end gap-2'
      whileHover={{
        scale: 0.975,
        opacity: 0.9
      }}
      onClick={() => {
        if (props.href) window.open(props.href.toString(), '_blank')
      }}
    >
      <div
        className='bg-red overflow-hidden rounded border'
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          maxHeight: '480px',
          backgroundColor: gray.gray2
        }}
      >
        <video
          width='1000'
          height='1000'
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            objectPosition: 'center',
            transition: 'all 0.5s ease'
          }}
          autoPlay
          loop
          muted
          {...remaining}
        />
      </div>
      {caption && <p className='text-center text-xs text-gray-500'>{caption}</p>}
    </motion.div>
  )
}
