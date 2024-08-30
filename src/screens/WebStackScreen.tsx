import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../types/types';
import {StackNavigationProp} from '@react-navigation/stack';
interface navType {
  url: string;
  canGoBack: boolean;
}
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface WebStackContainerProps {
  route: DetailsScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
}

// 외부 링크 클릭시 오픈되는 웹뷰
const WebStackScreen: React.FC<WebStackContainerProps> = ({route, navigation}) => {
  const {url} = route.params;

  // 뒤로가기 설정
  const webViewRef = useRef<WebView>(null);
  const [navState, setNavState] = useState({
    url: '',
    canGoBack: false,
  });

  useEffect(() => {
    const handleBackButton = () => {
      if (navState.canGoBack) {
        if (navState.url === url) {
          navigation.pop();
        } else {
          webViewRef.current?.goBack();
        }
      } else {
        navigation.pop();
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
    <WebView
      style={styles.webview}
      source={{uri: url}}
      // 구글 로그인 userAgent
      userAgent="Mozilla/5.0 AppleWebKit/535.19 Chrome/56.0.0 Mobile Safari/535.19"
      // 뒤로가기 설정
      onNavigationStateChange={(nav: navType) => {
        setNavState({url: nav.url, canGoBack: nav.canGoBack});
      }}
      ref={webViewRef}
      // 확대 막기
      injectedJavaScript={disableZoom}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default WebStackScreen;
