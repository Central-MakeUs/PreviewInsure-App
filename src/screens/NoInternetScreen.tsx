import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function NoInternetScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/logo-white.png')} style={styles.logo} />
      <Text style={styles.logoText}>완전히 새로운 보험 경험</Text>
      <Image source={require('../assets/imgs/internet-background.png')} style={styles.background} />
      <Text style={styles.text}>서비스 이용을 위해 인터넷 연결이 필요합니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6879FB',
  },
  logo: {
    marginTop: 40,
    marginHorizontal: 'auto',
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 6,
    marginHorizontal: 'auto',
    color: 'white',
    fontSize: 12,
  },
  background: {
    width: '100%',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
});

export default NoInternetScreen;
