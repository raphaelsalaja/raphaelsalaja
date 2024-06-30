import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = { width: 32, height: 32 }

export const contentType = 'image/png'

const getRandomBaseColor = (): string => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const getShade = (color: string, factor: number): string => {
  let colorInt = parseInt(color.slice(1), 16)
  let r = (colorInt >> 16) & 0xff
  let g = (colorInt >> 8) & 0xff
  let b = colorInt & 0xff

  r = Math.min(255, Math.floor(r * factor))
  g = Math.min(255, Math.floor(g * factor))
  b = Math.min(255, Math.floor(b * factor))

  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

const getShadedGradient = (): string => {
  const baseColor = getRandomBaseColor()
  const shade1 = getShade(baseColor, 1.8)
  const shade2 = getShade(baseColor, 1.6)
  const shade3 = getShade(baseColor, 1.4)
  const shade4 = getShade(baseColor, 1.2)

  return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${shade4} 0.52%, ${shade3} 45.83%, ${shade2} 65.62%, ${shade1} 100%)`
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: getShadedGradient(),
          borderRadius: '100%'
        }}
      />
    ),
    {
      ...size
    }
  )
}
