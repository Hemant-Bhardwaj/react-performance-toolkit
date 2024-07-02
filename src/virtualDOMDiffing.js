import { useRef, useEffect } from 'react';

export const useDeepCompareEffect = (callback, dependencies) => {
  const previousDependencies = useRef();

  const isSame = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  useEffect(() => {
    if (!isSame(previousDependencies.current, dependencies)) {
      previousDependencies.current = dependencies;
      return callback();
    }
  }, [dependencies, callback]);
};
