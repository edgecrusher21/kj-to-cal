# KJ to Cal

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

## Stack

- React 19
- React Native 0.81
- Expo SDK 54
- TypeScript
- Jest and ts-jest

## Run locally

You'll need Node.js, npm, and an Android emulator or a physical Android device with a compatible Expo Go installation.

```sh
npm install
npm start
```

Use the Expo development server to open the app on your device, or launch it in a running Android emulator:

```sh
npm run android
```

## Checks

Run the unit tests:

```sh
npm test
```

Check TypeScript types:

```sh
npx tsc --noEmit
```

The tests cover the conversion and input-validation helpers; they do not cover the rendered UI.

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
```

The conversion uses **Cal = kJ / 4.184**, where Cal refers to the kilocalories used on food labels.

## License

See [LICENSE](LICENSE).
