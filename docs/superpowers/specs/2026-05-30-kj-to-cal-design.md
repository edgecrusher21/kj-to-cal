# KJ to Cal Converter — Design Spec

Date: 2026-05-30

## Purpose

A minimal Android app for converting kilojoules (kJ) to kilocalories (Cal) — the units used on food labels. Personal use, single screen, instant results.

## Architecture

- **Framework**: Expo (bare, no Expo Router)
- **Platform**: Android only
- **Structure**: Single `App.tsx` with one `ConverterScreen` component
- **Logic**: Pure conversion function in `src/converter.ts`
- **State**: Single `useState` for input value, result computed on render
- **Dependencies**: React Native core only, no external libraries

## Project Structure

```
kj-to-cal/
├── app.json              # Expo config (Android-only)
├── package.json
├── tsconfig.json
├── App.tsx               # Single screen component
└── src/
    └── converter.ts      # Pure conversion function: kJ / 4.184
```

## UI/UX Design

### Theme
- Dark background: `#1a1a2e`
- Input card: `#16213e` with accent border
- Input accent color: `#e94560` (red)
- Result accent color: `#4ecca3` (green)

### Layout
- **Input**: Full-width text field, large font (32px), labeled "Kilojoules (kJ)", numeric keyboard
- **Result**: Centered, extra-large font (72px), displays converted value with "Cal" label underneath
- **Live conversion**: Result updates on every keystroke
- **Empty state**: Displays "0 Cal" when no input

### Interaction
- User types kJ value → result appears instantly
- No submit button, no navigation, no settings
- Decimal results rounded to 1 decimal place

## Error Handling & Edge Cases

- **Invalid input**: Numeric keyboard prevents most invalid input; non-numeric characters filtered out
- **Negative values**: Allowed (valid mathematically)
- **Very large numbers**: Handled by JavaScript number precision limits
- **Empty input**: Shows "0 Cal"
- **Offline**: Entirely offline, no network calls needed

## Conversion Formula

```
Cal = kJ / 4.184
```

Where:
- kJ = kilojoules
- Cal = kilocalories (food calories, capital C)
