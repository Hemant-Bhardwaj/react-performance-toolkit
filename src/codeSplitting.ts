import React from 'react';

export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComponent = React.lazy(importFunc);

  return (props: any) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}

export function withCodeSplitting(Component: React.ComponentType<any>) {
  return lazyLoad(() => Promise.resolve({ default: Component }));
}