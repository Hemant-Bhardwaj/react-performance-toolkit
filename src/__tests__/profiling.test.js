import React from 'react';
import { render } from '@testing-library/react';
import { withProfiler } from '../profiling';

// Mock component
const MockComponent = () => <div>Mock Component</div>;
const ProfiledComponent = withProfiler(MockComponent, 'MockComponent');

test('renders ProfiledComponent correctly', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<ProfiledComponent />);
  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Profiled MockComponent'));

  consoleSpy.mockRestore();
});
