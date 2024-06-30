import { Artist } from '@spotify/web-api-ts-sdk'

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played'
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists'

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN ?? ''
    })
  })

  const data = await response.json()

  return data.access_token as string
}

async function getNowPlaying() {
  const accessToken = await getAccessToken()

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      revalidate: 60
    }
  })

  if (response.status === 204) {
    return getLastPlayed()
  }

  try {
    const song = await response.json()

    if (song.is_playing) {
      return {
        status: response.status,
        data: song
      }
    } else {
      return getLastPlayed()
    }
  } catch {
    return {
      status: response.status
    }
  }
}

async function getLastPlayed() {
  const accessToken = await getAccessToken()

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      revalidate: 60
    }
  })

  if (response.status === 204) {
    return {
      status: response.status
    }
  }

  try {
    const song = await response.json()

    return {
      status: response.status,
      data: song
    }
  } catch {
    return {
      status: response.status
    }
  }
}

async function getTopTracks() {
  const accessToken = await getAccessToken()

  const response = await fetch(`${TOP_TRACKS_ENDPOINT}?time_range=long_term&limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      revalidate: 60
    }
  })

  try {
    const tracks = await response.json()

    return {
      status: response.status,
      data: tracks
    }
  } catch {
    return {
      status: response.status
    }
  }
}

async function getTopArtists() {
  const accessToken = await getAccessToken()

  const response = await fetch(`${TOP_ARTISTS_ENDPOINT}?time_range=long_term&limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      revalidate: 60
    }
  })

  try {
    const artists = await response.json()

    return {
      status: response.status,
      data: artists
    }
  } catch {
    return {
      status: response.status
    }
  }
}

function getTopArtistsGroupedByGenres(artists: Artist[]) {
  const genres: Record<string, Artist[]> = {}

  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (!genres[genre]) {
        genres[genre] = []
      }

      genres[genre].push(artist)
    })
  })

  return genres
}

function getSpotifyNodesAndLinks(artists: Artist[]) {
  const genreSet = new Set()

  const artistNodes = artists.map((artist) => {
    artist.genres.forEach((genre) => genreSet.add(genre))
    console.log(artist)
    return {
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url,
      genres: artist.genres
    }
  })

  const genreNodes = Array.from(genreSet).map((genre) => ({
    id: genre,
    name: genre
  }))

  const nodes = [...artistNodes, ...genreNodes]

  const links = artists.flatMap((artist) => {
    return artist.genres.map((genre) => {
      return {
        source: artist.id,
        target: genre
      }
    })
  })

  return { nodes, links }
}

export { getNowPlaying, getSpotifyNodesAndLinks, getTopArtists, getTopArtistsGroupedByGenres, getTopTracks }
