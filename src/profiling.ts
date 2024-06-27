import React from 'react';

export function withProfiling<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return class extends React.Component<P> {
    renderCount = 0;
    lastRenderTime = 0;

    componentDidMount() {
      console.log(`${componentName} mounted`);
    }

    componentDidUpdate() {
      this.renderCount++;
      const currentTime = performance.now();
      const renderTime = currentTime - this.lastRenderTime;
      console.log(`${componentName} re-rendered (${this.renderCount})`);
      console.log(`Render time: ${renderTime.toFixed(2)}ms`);

      if (renderTime > 16) {
        console.warn(`${componentName} render time exceeded 16ms. Consider optimizing.`);
      }

      this.lastRenderTime = currentTime;
    }

    render() {
      this.lastRenderTime = performance.now();
      return <WrappedComponent {...this.props} />;
    }
  };
}

export function measurePerformance(callback: () => void, label: string) {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
}