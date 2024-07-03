import React, { useState } from 'react';
import { render, act } from '@testing-library/react';
import { useDeepCompareEffect } from '../virtualDOMDiffing';

// Mock component to test useDeepCompareEffect
const MockComponent = ({ deps }) => {
  const [count, setCount] = useState(0);

  useDeepCompareEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, deps);

  return <div>Count: {count}</div>;
};

test('useDeepCompareEffect triggers effect only on deep changes', () => {
  const { rerender, getByText } = render(<MockComponent deps={[{ a: 1 }]} />);
  expect(getByText('Count: 1')).toBeInTheDocument();

  // Re-render with the same dependencies (no deep change)
  rerender(<MockComponent deps={[{ a: 1 }]} />);
  expect(getByText('Count: 1')).toBeInTheDocument();

  // Re-render with changed dependencies (deep change)
  rerender(<MockComponent deps={[{ a: 2 }]} />);
  expect(getByText('Count: 2')).toBeInTheDocument();
});
