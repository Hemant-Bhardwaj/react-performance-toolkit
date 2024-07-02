import { ComponentType } from 'react';

export function withMemo<T extends ComponentType<any>>(
  component: T,
  areEqual?: (prevProps: Readonly<any>, nextProps: Readonly<any>) => boolean
): T;

export function useSmartCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T;
