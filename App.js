import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AuthContextProvider from './contextProvider/AuthProvider';
import 'react-native-gesture-handler';
import RootNavigation from './RootNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthContextProvider>
        <RootNavigation />
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
