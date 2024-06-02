export const runtime = 'edge'

const getBrowserInfo = (userAgent: string) => {
	const browsers = [
		{ name: 'Edge', pattern: /Edg/ },
		{ name: 'Opera', pattern: /OPR/ },
		{ name: 'Chrome', pattern: /Chrome/ },
		{ name: 'Safari', pattern: /Safari/ },
		{ name: 'Firefox', pattern: /Firefox/ },
		{ name: 'IE', pattern: /MSIE|Trident/ },
	]

	for (const browser of browsers) {
		if (browser.pattern.test(userAgent)) {
			return browser.name
		}
	}
	return 'Unknown'
}

export async function GET(request: Request) {
	try {
		const userAgent = request.headers.get('user-agent') || 'Unknown'
		const browser = getBrowserInfo(userAgent)

		return new Response(JSON.stringify({ browser }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to get browser data' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500,
		})
	}
}
