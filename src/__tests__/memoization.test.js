import React from 'react';
import { render, screen } from '@testing-library/react';
import { withMemo } from '../memoization';

// Mock component
const MockComponent = ({ text }) => <div>{text}</div>;
const MemoizedComponent = withMemo(MockComponent);

test('renders MemoizedComponent correctly', () => {
  const { rerender } = render(<MemoizedComponent text="Initial" />);
  expect(screen.getByText('Initial')).toBeInTheDocument();

  rerender(<MemoizedComponent text="Updated" />);
  expect(screen.getByText('Updated')).toBeInTheDocument();
});
