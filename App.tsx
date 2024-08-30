import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetScreen from './src/screens/NoInternetScreen';
import StackNavigation from './src/screens/StackNavigation';
import SplashScreen from 'react-native-splash-screen';
function App(): React.JSX.Element {
  const netInfo = useNetInfo();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1100); //스플래시 활성화 시간
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />

      {netInfo.isConnected ? <StackNavigation /> : <NoInternetScreen />}
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
