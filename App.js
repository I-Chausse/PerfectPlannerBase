import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import MainNavigator from './navigation/MainNavigator';
import { AuthProvider } from './contexts/AuthContext'; // Assurez-vous d'importer le AuthProvider

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider> {/* Enveloppez votre application avec AuthProvider */}
        <SafeAreaView style={styles.container}>
          <MainNavigator />
          <StatusBar style="auto" />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
