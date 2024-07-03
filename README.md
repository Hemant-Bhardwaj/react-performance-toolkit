# React Performance Toolkit

A comprehensive toolkit for optimizing React applications. The toolkit includes features such as automatic code splitting and lazy loading, smart component memoization, virtual DOM diffing algorithm improvements, and built-in profiling and bottleneck detection tools.

## Features

- **Automatic Code Splitting and Lazy Loading**: Enhance performance by only loading components when needed.
- **Smart Component Memoization**: Improve performance by memoizing components and preventing unnecessary re-renders.
- **Virtual DOM Diffing Algorithm Improvements**: Optimize rendering performance with deep comparison effects.
- **Built-in Profiling and Bottleneck Detection Tools**: Profile components to detect and optimize performance bottlenecks.

## Installation

You can install the toolkit via npm:

```sh
npm install react-performance-toolkit
```

or 

```sh
yarn add react-performance-toolkit
```

## Usage

### Code Splitting and Lazy Loading
Wrap your component with withLazyLoad to enable lazy loading:

```js
import React from 'react';
import { withLazyLoad } from 'react-performance-toolkit';

const LazyComponent = withLazyLoad(() => import('./LazyComponent'));

const App = () => (
  <div>
    <LazyComponent />
  </div>
);

export default App;
```

### Smart Component Memoization
Use withMemo to memoize your component:

```js
import React from 'react';
import { withMemo } from 'react-performance-toolkit';

const MyComponent = ({ text }) => <div>{text}</div>;
const MemoizedComponent = withMemo(MyComponent);

const App = () => (
  <div>
    <MemoizedComponent text="Hello, World!" />
  </div>
);

export default App;
```

### Virtual DOM Diffing Algorithm Improvements
Use useDeepCompareEffect to optimize effects with deep comparison:

```js
import React, { useState } from 'react';
import { useDeepCompareEffect } from 'react-performance-toolkit';

const MyComponent = ({ dependencies }) => {
  useDeepCompareEffect(() => {
    // Effect logic
  }, dependencies);

  return <div>My Component</div>;
};

const App = () => {
  const [deps, setDeps] = useState([{ a: 1 }]);

  return <MyComponent dependencies={deps} />;
};

export default App;
```

### Built-in Profiling and Bottleneck Detection Tools
Wrap your component with withProfiler to enable profiling:

```js
import React from 'react';
import { withProfiler } from 'react-performance-toolkit';

const MyComponent = () => <div>My Component</div>;
const ProfiledComponent = withProfiler(MyComponent, 'MyComponent');

const App = () => (
  <div>
    <ProfiledComponent />
  </div>
);

export default App;
```

## TypeScript Support

The toolkit is fully typed. Type definitions are included and can be used directly.

### Example

```js
import React from 'react';
import { withLazyLoad, withMemo, useDeepCompareEffect, withProfiler } from 'react-performance-toolkit';

const LazyComponent = withLazyLoad(() => import('./LazyComponent'));

const MyComponent: React.FC<{ text: string }> = ({ text }) => <div>{text}</div>;
const MemoizedComponent = withMemo(MyComponent);

const DeepCompareComponent: React.FC<{ deps: any[] }> = ({ deps }) => {
  useDeepCompareEffect(() => {
    // Effect logic
  }, deps);

  return <div>Deep Compare Component</div>;
};

const ProfiledComponent = withProfiler(MyComponent, 'ProfiledComponent');

const App: React.FC = () => (
  <div>
    <LazyComponent />
    <MemoizedComponent text="Hello, TypeScript!" />
    <DeepCompareComponent deps={[{ a: 1 }]} />
    <ProfiledComponent text="Profiled Component" />
  </div>
);

export default App;
```

## Testing
Unit tests are provided using Jest and React Testing Library. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

