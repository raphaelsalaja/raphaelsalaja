import { getRecentlyPlayed } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
	const data = await getRecentlyPlayed()

	return NextResponse.json({ message: data }, { status: 200 })
}
