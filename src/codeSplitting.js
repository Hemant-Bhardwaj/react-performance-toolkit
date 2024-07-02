import React, { Suspense } from 'react';

export const withLazyLoad = (Component) => {
  const LazyComponent = React.lazy(Component);
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
