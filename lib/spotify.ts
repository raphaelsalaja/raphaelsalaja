import querystring from 'querystring'

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN as string

const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

export type SpotifyTrack = {
	track: {
		name: string
		album: {
			name: string
			images: { url: string }[]
		}
		artists: { name: string }[]
	}
	played_at: string
}

export const getAccessToken = async (
	client_id: string,
	client_secret: string,
	refresh_token: string
) => {
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	})

	return response.json()
}

export async function getRecentlyPlayed() {
	const { access_token } = await getAccessToken(client_id, client_secret, refresh_token)

	const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})

	if (response.status > 400) {
		throw new Error('Unable to Fetch Song')
	} else if (response.status === 204) {
		throw new Error('Currently Not Playing')
	}

	const tracks = await response.json()

	const track = tracks.items[0]

	return {
		track: {
			name: track.track.name,
			album: {
				name: track.track.album.name,
				images: track.track.album.images,
			},
			artists: track.track.artists.map((artist: { name: string }) => ({
				name: artist.name,
			})),
		},
		played_at: new Date(track.played_at).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			timeZoneName: 'short',
		}),
	}
}
