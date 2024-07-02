import { LazyExoticComponent, ComponentType } from 'react';

export function withLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): LazyExoticComponent<T>;
