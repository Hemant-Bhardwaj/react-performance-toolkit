import React from 'react';
import { render, screen } from '@testing-library/react';
import { lazyLoad, withCodeSplitting } from '../codeSplitting';

const MockComponent = () => <div>Mock Component</div>;

describe('Code Splitting', () => {
  test('lazyLoad creates a lazy-loaded component', async () => {
    const LazyComponent = lazyLoad(() => Promise.resolve({ default: MockComponent }));
    render(<LazyComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await screen.findByText('Mock Component');
  });

  test('withCodeSplitting creates a code-split component', async () => {
    const CodeSplitComponent = withCodeSplitting(MockComponent);
    render(<CodeSplitComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await screen.findByText('Mock Component');
  });
});