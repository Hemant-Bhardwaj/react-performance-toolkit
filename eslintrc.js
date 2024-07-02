module.exports = {
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react-hooks/recommended',
    ],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'jsx-a11y',
      'react-hooks',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  };
  