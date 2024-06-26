import * as d3 from 'd3'
import { ForceGraphMethods, NodeObject } from 'react-force-graph-3d'

const forces = (reference: ForceGraphMethods) => {
	const collide = d3.forceCollide<NodeObject>().radius(10)
	reference.d3Force('charge')?.strength(-100).distanceMax(400)
	reference.d3Force('collide', collide)
	reference.d3Force('link')?.distance(100)
}

export { forces }
