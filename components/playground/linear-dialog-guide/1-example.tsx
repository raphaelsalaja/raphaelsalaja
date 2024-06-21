'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function BasicExample() {
	const [active, setActive] = useState(false)

	const stroke = {
		boxShadow: '0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)',
	}

	const transition = {
		type: 'spring',
		stiffness: 300,
		damping: 20,
	}

	const shared = cn('absolute h-20 w-20 md:h-32 md:w-32 rounded-lg')

	return (
		<>
			<div className={cn(shared, 'left-5 bg-grass-9 md:left-16')} style={stroke} />
			<div className={cn(shared, 'right-5 bg-tomato-9 md:right-16')} style={stroke} />
		</>
	)
}
