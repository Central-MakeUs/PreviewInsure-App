import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, Platform, StyleSheet} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {RootStackParamList} from '../types/types';

interface navType {
  url: string;
  canGoBack: boolean;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface WebviewContainerProps {
  navigation: HomeScreenNavigationProp;
}

function WebViewScreen({navigation}: WebviewContainerProps): React.JSX.Element {
  const URL = 'https://previewinsure.vercel.app/';

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

  useEffect(() => {
    // 웹뷰 url load

    // 웹뷰로 현재 기기 정보 전송
    webViewRef.current?.postMessage(JSON.stringify({platform: Platform.OS}));
  }, [webViewRef]);

  const handleOnLoad = () => {
    webViewRef.current?.postMessage(JSON.stringify({platform: Platform.OS}));
    // console.log('Platform 정보 전송됨:', Platform.OS);
  };

  // 확대 막기
  const disableZoom = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);
    true; // note: this is required, or the webview will not load correctly
  `;

  // 새탭열기
  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);
    // console.log(nativeEvent);
    if (nativeEvent?.type === 'ROUTER_EVENT') {
      const url: string = nativeEvent.data;
      navigation.navigate('Details', {url: url});
    }
  };

  return (
    <WebView
      style={styles.webview}
      source={{uri: URL}}
      onMessage={requestOnMessage}
      // 구글 로그인 userAgent
      userAgent="Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19"
      // 뒤로가기 설정
      ref={webViewRef}
      onNavigationStateChange={(nav: navType) => {
        setNavState({url: nav.url, canGoBack: nav.canGoBack});
      }}
      // 확대 막기
      injectedJavaScript={disableZoom}
      onLoad={handleOnLoad}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default WebViewScreen;
