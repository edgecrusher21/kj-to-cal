# KJ to Cal

[![Checks](https://github.com/edgecrusher21/kj-to-cal/actions/workflows/checks.yml/badge.svg)](https://github.com/edgecrusher21/kj-to-cal/actions/workflows/checks.yml)

A small Android app that converts kilojoules (kJ) into food calories (Cal, or kilocalories). Built as a personal project to showcase my knowledge of React and mobile application development.

Enter a value in kilojoules and the result updates as you type. For example, **1,000 kJ = 239 Cal**.

## Features

- Instant conversion, rounded to one decimal place.
- A single-screen, dark-themed interface with a decimal keyboard.
- Input validation for non-negative, finite numbers. Empty or invalid input displays `0 Cal`.
- Works entirely offline, with no accounts or backend.

## What this project demonstrates

- React state management with `useState` and a result derived from the current input.
- Native UI development with React Native, including keyboard handling and accessibility labels.
- TypeScript and separation of UI, input validation, and conversion logic.
- Unit testing with Jest, covering conversion, rounding, and input edge cases.
- Expo project configuration and Android APK build profiles through EAS.
- Automated code quality checks and continuous integration with GitHub Actions.

## Stack

- React 19
- React Native 0.81
- Expo SDK 54
- TypeScript
- Jest and ts-jest
- ESLint with Expo and React Native rules, Knip, and Expo Doctor

## Run locally

You'll need Node.js 22 (the version used in CI), npm, and an Android emulator or a physical Android device with a compatible Expo Go installation.

```sh
npm ci
npm start
```

Use the Expo development server to open the app on your device, or launch it in a running Android emulator:

```sh
npm run android
```

## Checks

Run all checks (lint, types, unused code, tests, and Expo project health):

```sh
npm run check
```

These checks also run in GitHub Actions on pushes and pull requests. Expo Doctor needs internet access to validate dependencies against Expo and React Native Directory.

Run an individual check:

| Command | Purpose |
| --- | --- |
| `npm run lint` | Expo, React Hooks, and React Native lint rules |
| `npm run typecheck` | TypeScript type checking |
| `npm run check:unused` | Unused files, exports, and dependencies |
| `npm test` | Unit tests |
| `npm run doctor` | Expo configuration and dependency compatibility |

The tests cover the conversion and input-validation helpers; they do not cover the rendered UI.

ESLint checks include React Hooks usage, text outside React Native's `Text` component, and unused styles. Knip follows the app from `index.ts` to find unused code and dependencies. These checks do not include a dependency security audit.

## Project structure

```text
App.tsx                 Main screen and styles
src/converter.ts        kJ-to-Cal conversion
src/converter.test.ts   Conversion tests
src/input.ts            Input parsing and validation
src/input.test.ts       Input-validation tests
assets/                 App icons and splash image
app.json                Expo and Android configuration
eas.json                Android build profiles
eslint.config.js        Expo, React Hooks, and React Native lint rules
knip.json               Unused-code analysis configuration
.github/workflows/      Automated checks for pushes and pull requests
```

The conversion uses **Cal = kJ / 4.184**, where Cal refers to the kilocalories used on food labels.

## License

See [LICENSE](LICENSE).
