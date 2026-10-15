// ABOUTME: Applies Expo's React, Hooks, and TypeScript lint rules across the project.
// ABOUTME: Adds targeted React Native checks for text and unused styles.
const expoConfig = require('eslint-config-expo/flat');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  ...expoConfig,
  { ignores: ['.expo/**', 'dist/**', 'coverage/**', 'android/**', 'ios/**'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { 'react-native': reactNative },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-raw-text': 'error',
    },
  },
];
