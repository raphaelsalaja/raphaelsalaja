import { useCallback } from "react";

const useCombinedReferences = <T>(...refs: React.Ref<T>[]): ((node: T) => void) => {
  return useCallback(
    (node) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }
    },
    [refs],
  );
};

export { useCombinedReferences };
