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
import { parseKjInput } from './src/input';

export default function App() {
  const [input, setInput] = useState('');

  const parsed = parseKjInput(input);
  const result = parsed === null ? 0 : kJtoCal(parsed);

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
              accessibilityLabel="Kilojoules input"
            />
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.result} accessibilityLiveRegion="polite">{result}</Text>
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
