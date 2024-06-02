import { NextRequest, NextResponse } from 'next/server'

const VERCEL_API_URL = 'https://api.vercel.com/v6/deployments'
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID

export const runtime = 'edge'

export async function GET(request: NextRequest) {
	try {
		if (!VERCEL_API_TOKEN || !VERCEL_PROJECT_ID) {
			return NextResponse.json(
				{ error: 'Missing Vercel API token or project ID' },
				{ status: 500 }
			)
		}

		const response = await fetch(
			`${VERCEL_API_URL}?projectId=${VERCEL_PROJECT_ID}&state=READY&limit=1`,
			{
				headers: {
					Authorization: `Bearer ${VERCEL_API_TOKEN}`,
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error('Failed to fetch deployment data')
		}

		const data = await response.json()

		const latestSuccessfulDeployment = data.deployments[0]

		return NextResponse.json(latestSuccessfulDeployment)
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
