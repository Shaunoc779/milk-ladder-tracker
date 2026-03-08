import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ChildProvider } from './src/context/ChildContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChildProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ChildProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
