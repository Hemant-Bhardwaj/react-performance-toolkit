import { ComponentType, FunctionComponent } from 'react';

export function withProfiler<P>(
  Component: ComponentType<P>,
  id: string
): FunctionComponent<P>;
