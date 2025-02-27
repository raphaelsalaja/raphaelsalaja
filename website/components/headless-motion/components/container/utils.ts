const ignoreCircularReferences = () => {
  const cache = new Set();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return;
      }
      cache.add(value);
    }
    return value;
  };
};

export { ignoreCircularReferences };
