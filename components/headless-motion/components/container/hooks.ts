import { useCallback } from 'react'

const useCombinedReferences = (...refs: any[]): ((node: any) => void) => {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      })
    },
    [refs]
  )
}

export { useCombinedReferences }
