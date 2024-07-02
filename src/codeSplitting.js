import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

export const withLazyLoad = (importFunc) => {
  const LazyComponent = React.lazy(importFunc);
  const Wrapper = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  Wrapper.propTypes = {
    fallback: PropTypes.element,
  };

  return Wrapper;
};
