import React from 'react';
import {Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import WebView from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 구글 로그인 우회를 위함
  const userAgent =
    Platform.OS === 'android' ? 'Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19' : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WebView
        // 구글 로그인 우회를 위한 userAgent
        userAgent="Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19"
        style={styles.webview}
        source={{uri: 'https://preview-insure-web-git-dev-sehuns-projects.vercel.app/'}}></WebView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default App;
