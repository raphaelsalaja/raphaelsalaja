import { NodeObject } from 'react-force-graph-3d'
import { Mesh, Sprite, SpriteMaterial, TextureLoader } from 'three'
import SpriteText from 'three-spritetext'

const channel = (node: NodeObject) => {
  const spriteText = new SpriteText()
  spriteText.text = node.arena.title ?? ''
  spriteText.textHeight = 1
  spriteText.padding = 5
  spriteText.borderWidth = 0.5
  spriteText.borderColor = 'rgba(0,0,0,0.2)'
  spriteText.color = 'black'
  spriteText.backgroundColor = 'white'
  return spriteText
}

const block = (node: NodeObject) => {
  const mesh = new Mesh()
  const sprite = new Sprite()
  const texture = new TextureLoader().load(node.arena.image.thumb.url, (tex) => {
    tex.needsUpdate = true
    sprite.scale.set(tex.image.width / 20, tex.image.height / 20, 1)
  })
  sprite.material = new SpriteMaterial({ map: texture, transparent: true })
  mesh.add(sprite)
  return mesh
}

const text = (node: NodeObject) => {
  const spriteText = new SpriteText()
  spriteText.text = node.arena.content.substring(0, 60) + '...'
  spriteText.textHeight = 1
  spriteText.padding = 5
  spriteText.borderWidth = 0.5
  spriteText.borderColor = 'rgba(0,0,0,0.2)'
  spriteText.color = 'black'
  spriteText.backgroundColor = 'white'
  return spriteText
}

const time = (date: string | number | Date) => {
  const formattedDate = new Date(date)
  const year = formattedDate.getFullYear()
  const month = formattedDate.toLocaleString('default', { month: 'long' })
  const day = formattedDate.getDate()
  const hour = formattedDate.getHours().toString().padStart(2, '0')
  const minute = formattedDate.getMinutes().toString().padStart(2, '0')

  return `${month} ${day}, ${year} ${hour}:${minute}`
}

export { block, channel, text, time }
