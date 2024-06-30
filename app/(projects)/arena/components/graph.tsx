import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import { ForceGraphMethods, NodeObject } from 'react-force-graph-3d'

import { forces } from '../lib/graph/forces'
import { handleClick } from '../lib/graph/handlers/handle-click'
import { block, channel, text } from '../lib/graph/nodes'
import NodeDetailsCard from './card'

interface ForceGraphProps {
  data: {
    nodes: any[]
    links: any[]
  }
}

export const ForceGraph = ({ data }: ForceGraphProps) => {
  const reference = useRef<ForceGraphMethods>()
  const [isSelected, setIsSelected] = useState(false)
  const [selectedNode, setSelectedNode] = useState<NodeObject | undefined>()

  useEffect(() => {
    if (reference.current) {
      forces(reference.current)
    }
  }, [reference])

  const onNodeClick = useCallback(
    (node: NodeObject) => {
      handleClick(node, reference, setSelectedNode, setIsSelected)
    },
    [reference]
  )

  const memoizedForceGraph = useMemo(
    () => (
      <ForceGraph3D
        ref={reference}
        graphData={data}
        showNavInfo={false}
        linkColor={() => 'rgba(0,0,0,1)'}
        backgroundColor='rgba(0,0,0,0)'
        onNodeClick={onNodeClick}
        nodeThreeObject={(node: NodeObject) => {
          switch (node.arena.class) {
            case 'Text':
              return text(node)
            case 'Image':
            case 'Media':
            case 'Link':
            case 'Attachment':
              return block(node)
            default:
              return channel(node)
          }
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    ),
    [data, onNodeClick]
  )

  return (
    <div className='relative h-full w-full'>
      <NodeDetailsCard isSelected={isSelected} selectedNode={selectedNode} setIsSelected={setIsSelected} />

      <div className='flex h-full w-full items-center justify-center'>{memoizedForceGraph}</div>
    </div>
  )
}
