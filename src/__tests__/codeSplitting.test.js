import React from 'react';
import { render, screen } from '@testing-library/react';
import { withLazyLoad } from '../codeSplitting';

// Mock component for lazy loading
const LazyComponent = React.lazy(() => Promise.resolve({ default: () => <div>Lazy Component</div> }));
const LazyLoadedComponent = withLazyLoad(() => Promise.resolve({ default: LazyComponent }));

test('renders LazyLoadedComponent correctly', async () => {
  render(<LazyLoadedComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the lazy component to load
  const lazyComponentText = await screen.findByText('Lazy Component');
  expect(lazyComponentText).toBeInTheDocument();
});
