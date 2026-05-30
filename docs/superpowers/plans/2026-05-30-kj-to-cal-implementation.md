# KJ to Cal Converter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal Android-only Expo app that converts kilojoules to kilocalories with instant results on a single dark-themed screen.

**Architecture:** Single-screen bare Expo app (no router). One `App.tsx` component with a pure conversion function in `src/converter.ts`. Live conversion on every keystroke.

**Tech Stack:** Expo SDK, React Native, TypeScript

---

### File Map

| File | Responsibility |
|------|----------------|
| `package.json` | Project dependencies |
| `app.json` | Expo configuration (Android-only) |
| `tsconfig.json` | TypeScript configuration |
| `App.tsx` | Single screen component with UI and state |
| `src/converter.ts` | Pure conversion function: `kJ / 4.184` |
| `src/converter.test.ts` | Tests for conversion function |
| `eas.json` | EAS build configuration |

---

### Task 1: Initialize Expo Project

**Files:**
- Create: `package.json`
- Create: `app.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialize Expo project**

Run:
```bash
npx create-expo-app@latest . --template blank-typescript --yes
```
Expected: Expo project scaffolded with `App.tsx`, `package.json`, `tsconfig.json`, `app.json`

- [ ] **Step 2: Clean up unnecessary files**

Remove Expo Router and any boilerplate files not needed:
```bash
rm -f app.json  # We'll create our own
```

- [ ] **Step 3: Configure app.json for Android-only**

Create `app.json`:
```json
{
  "expo": {
    "name": "KJ to Cal",
    "slug": "kj-to-cal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a2e"
    },
    "android": {
      "package": "com.kjocal.converter",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a2e"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static"
    }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "init: scaffold Expo project with Android config"
```

---

### Task 2: Conversion Logic with Tests

**Files:**
- Create: `src/converter.ts`
- Create: `src/converter.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/converter.test.ts`:
```typescript
import { kJtoCal } from './converter';

describe('kJtoCal', () => {
  it('converts 0 kJ to 0 Cal', () => {
    expect(kJtoCal(0)).toBe(0);
  });

  it('converts 4.184 kJ to 1 Cal', () => {
    expect(kJtoCal(4.184)).toBe(1);
  });

  it('converts 836 kJ to 199.8 Cal (rounded to 1 decimal)', () => {
    expect(kJtoCal(836)).toBe(199.8);
  });

  it('handles negative values', () => {
    expect(kJtoCal(-4.184)).toBe(-1);
  });

  it('rounds to 1 decimal place', () => {
    expect(kJtoCal(10)).toBe(2.4);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:
```bash
npx jest src/converter.test.ts --no-coverage
```
Expected: FAIL with "Cannot find module './converter'" or "kJtoCal is not defined"

- [ ] **Step 3: Write conversion function**

Create `src/converter.ts`:
```typescript
export function kJtoCal(kJ: number): number {
  const cal = kJ / 4.184;
  return Math.round(cal * 10) / 10;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
npx jest src/converter.test.ts --no-coverage
```
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/converter.ts src/converter.test.ts
git commit -m "feat: add kJ to Cal conversion function with tests"
```

---

### Task 3: Build the Converter UI

**Files:**
- Modify: `App.tsx`

- [ ] **Step 1: Write the UI component**

Replace `App.tsx` with:
```typescript
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { kJtoCal } from './src/converter';

export default function App() {
  const [input, setInput] = useState('');

  const result = input === '' ? 0 : kJtoCal(parseFloat(input) || 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.label}>Kilojoules (kJ)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#555"
              textAlign="center"
              autoFocus
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.result}>{result}</Text>
            <Text style={styles.resultLabel}>Cal</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  label: {
    color: '#888',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0f3460',
    marginBottom: 48,
  },
  input: {
    color: '#e94560',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 16,
  },
  resultContainer: {
    alignItems: 'center',
  },
  result: {
    color: '#4ecca3',
    fontSize: 72,
    fontWeight: 'bold',
    lineHeight: 80,
  },
  resultLabel: {
    color: '#888',
    fontSize: 18,
    marginTop: 8,
  },
});
```

- [ ] **Step 2: Verify the app runs**

Run:
```bash
npx expo start --port 8081
```
Expected: Metro bundler starts, no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add App.tsx
git commit -m "feat: build converter UI with dark theme and live conversion"
```

---

### Task 4: Configure EAS Build for Android APK

**Files:**
- Create: `eas.json`

- [ ] **Step 1: Install EAS CLI**

Run:
```bash
npm install -g eas-cli
```

- [ ] **Step 2: Create eas.json**

Create `eas.json`:
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

- [ ] **Step 3: Initialize EAS project**

Run:
```bash
eas init
```
Expected: Project initialized (may prompt for account creation if not logged in)

- [ ] **Step 4: Commit**

```bash
git add eas.json
git commit -m "chore: add EAS build config for Android APK"
```

---

### Task 5: Add .gitignore and Cleanup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update .gitignore**

Ensure `.gitignore` includes:
```
node_modules/
.expo/
dist/
.web/
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.superpowers/
```

- [ ] **Step 2: Final commit**

```bash
git add .gitignore
git commit -m "chore: update gitignore for Expo project"
```

---

### Self-Review Checklist

1. **Spec coverage:**
   - [x] Expo bare setup (no router) — Task 1
   - [x] Android-only — Task 1 (app.json), Task 4 (eas.json)
   - [x] Single screen — Task 3
   - [x] Pure conversion function — Task 2
   - [x] Dark theme with specified colors — Task 3
   - [x] Live conversion on keystroke — Task 3
   - [x] Numeric keyboard — Task 3
   - [x] Result rounded to 1 decimal — Task 2
   - [x] Empty state shows 0 — Task 3
   - [x] Offline, no network — All tasks (no network code)

2. **Placeholder scan:** No TBD, TODO, or vague steps found.

3. **Type consistency:** `kJtoCal` function signature consistent across Tasks 2 and 3. All TypeScript.

4. **Test design:** Tests cover zero, exact conversion, rounding, negatives, and typical food label value (836 kJ).
