import React, { memo, useCallback } from 'react';

export const withMemo = (Component, areEqual) => memo(Component, areEqual);

export const useSmartCallback = (callback, deps) => useCallback(callback, deps);
