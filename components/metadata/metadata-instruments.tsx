'use client'

import { ExternalLinkIcon } from '@radix-ui/react-icons'
import type { TCountryCode } from 'countries-list'
import { getCountryData } from 'countries-list'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const fixedWidthStyle = {
	width: '144px',
}

const Geolocation: React.FC = () => {
	const [location, setLocation] = useState<Location | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const response = await fetch('/api/geolocation')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data: Location = await response.json()

				data.city = getCountryData(data.country as TCountryCode).capital || 'City'
				data.country = getCountryData(data.country as TCountryCode).name || 'Country'

				setLocation(data)
			} catch (error) {
				setError('Error fetching geolocation data')
				console.error('Error fetching geolocation data:', error)
			}
		}

		fetchLocation()
	}, [])

	return (
		<div style={fixedWidthStyle}>
			<h1>Last Visit</h1>
			{error && <p>{error}</p>}
			{location ? (
				<>
					{location.city}, {location.country}
				</>
			) : (
				<p>City, Country</p>
			)}
		</div>
	)
}

const Deployment: React.FC = () => {
	const [deployment, setDeployment] = useState<Deployment | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchDeployment = async () => {
			try {
				const response = await fetch('/api/vercel/deployment')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data: Deployment = await response.json()
				setDeployment(data)
			} catch (error) {
				setError('Error fetching deployment data')
				console.error('Error fetching deployment data:', error)
			}
		}

		fetchDeployment()
	}, [])

	return (
		<div style={fixedWidthStyle}>
			<h1>Last Deployment</h1>
			{error && <p>{error}</p>}
			{deployment ? (
				<div>
					{formatDistanceToNow(new Date(deployment.createdAt), { addSuffix: true })}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

const Browser: React.FC = () => {
	const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchBrowserInfo = async () => {
			try {
				const response = await fetch('/api/browser')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data: BrowserInfo = await response.json()
				setBrowserInfo(data)
			} catch (error) {
				setError('Error fetching browser data')
				console.error('Error fetching browser data:', error)
			}
		}

		fetchBrowserInfo()
	}, [])

	return (
		<div style={fixedWidthStyle}>
			<h1>Browser</h1>
			{error && <p>{error}</p>}
			{browserInfo ? <div>{browserInfo.browser}</div> : <p>Loading...</p>}
		</div>
	)
}

const Dimensions: React.FC = () => {
	const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		handleResize() // Set initial size

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div style={fixedWidthStyle}>
			<h1>Dimensions</h1>
			<p>
				{dimensions.width} x {dimensions.height}
			</p>
		</div>
	)
}

const Time: React.FC = () => {
	const [currentTime, setCurrentTime] = useState('')

	useEffect(() => {
		const updateTime = () => {
			setCurrentTime(
				new Date().toLocaleString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: false,
				})
			)
		}

		updateTime()

		const intervalId = setInterval(updateTime, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<div style={fixedWidthStyle}>
			<h1>Current Time</h1>
			<p>{currentTime}</p>
		</div>
	)
}

const Source: React.FC = () => {
	return (
		<div style={fixedWidthStyle}>
			<h1>Source</h1>
			<Link
				href='https://github.com/rafunderscore/raphaelsalaja'
				target='_blank'
				rel='noopener noreferrer'
				className='gap-1 transition-all hover:text-black hover:underline'
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<span>raphaelsalaja</span> <ExternalLinkIcon className='size-fit' />
			</Link>
		</div>
	)
}

export { Browser, Deployment, Dimensions, Geolocation, Source, Time }
