import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

export const withMemo = (Component, areEqual) => {
  const MemoizedComponent = memo(Component, areEqual);

  MemoizedComponent.propTypes = {
    areEqual: PropTypes.func,
  };

  return MemoizedComponent;
};

export const useSmartCallback = (callback, deps) => useCallback(callback, deps);
