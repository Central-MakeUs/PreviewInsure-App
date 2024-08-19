import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetScreen from './src/screens/NoInternetScreen';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const netInfo = useNetInfo();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {netInfo.isConnected ? <WebViewScreen /> : <NoInternetScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default App;
