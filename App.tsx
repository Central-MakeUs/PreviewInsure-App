import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, Dimensions, SafeAreaView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import WebView from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';
interface navType {
  url: string;
  canGoBack: boolean;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function App(): React.JSX.Element {
  const URL = 'https://preview-insure-web-git-dev-sehuns-projects.vercel.app/';
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 뒤로가기 설정
  const webViewRef = useRef<WebView>(null);
  const [navState, setNavState] = useState({
    url: '',
    canGoBack: false,
  });

  function close() {
    Alert.alert('종료하시겠어요?', '확인을 누르면 종료합니다.', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {text: '확인', onPress: () => BackHandler.exitApp()},
    ]);
  }

  useEffect(() => {
    const handleBackButton = () => {
      if (navState.canGoBack) {
        if (navState.url === URL) {
          close();
        } else {
          webViewRef.current?.goBack();
        }
      } else {
        close();
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [navState]);

  // 확대 막기
  const disableZoom = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);
    true; // note: this is required, or the webview will not load correctly
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <WebView
        style={styles.webview}
        source={{uri: URL}}
        // 구글 로그인 우회를 위한 userAgent
        userAgent="Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19"
        // 뒤로가기 설정
        ref={webViewRef}
        onNavigationStateChange={(nav: navType) => {
          setNavState({url: nav.url, canGoBack: nav.canGoBack});
        }}
        // 확대 막기
        injectedJavaScript={disableZoom}
      />
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
