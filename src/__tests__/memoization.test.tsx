import React from 'react';
import { render } from '@testing-library/react';
import { smartMemo } from '../memoization';

describe('Memoization', () => {
  test('smartMemo memoizes component correctly', () => {
    const MockComponent = jest.fn(() => <div>Memoized Component</div>);
    const MemoizedComponent = smartMemo(MockComponent);

    const { rerender } = render(<MemoizedComponent a={1} b={2} />);
    expect(MockComponent).toHaveBeenCalledTimes(1);

    rerender(<MemoizedComponent a={1} b={2} />);
    expect(MockComponent).toHaveBeenCalledTimes(1);

    rerender(<MemoizedComponent a={2} b={2} />);
    expect(MockComponent).toHaveBeenCalledTimes(2);
  });
});