import { MutableRefObject } from 'react'
import { ForceGraphMethods, NodeObject } from 'react-force-graph-3d'

const handleClick = (
	node: NodeObject,
	reference: MutableRefObject<ForceGraphMethods | undefined>,
	setSelectedNode: (node: NodeObject | undefined) => void,
	setIsSelected: (isSelected: boolean) => void
) => {
	if (!node) return

	const distance = 200

	const position = {
		x: node.x ?? 0,
		y: node.y ?? 0,
		z: node.z ?? 0,
	}

	const distRatio = 1 + distance / Math.hypot(position.x, position.y, position.z)

	if (reference.current) {
		reference.current.cameraPosition(
			{
				x: position.x * distRatio,
				y: position.y * distRatio,
				z: position.z * distRatio,
			},
			position,
			2000
		)
	}

	setSelectedNode(node)
	setIsSelected(true)
}

export { handleClick }
