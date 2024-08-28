import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import WebViewScreen from './WebViewScreen';
import WebStackScreen from './WebStackScreen';
import {RootStackParamList} from '../types/types';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="프리뷰인슈"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}>
        <Stack.Screen name="프리뷰인슈" component={WebViewScreen} />
        <Stack.Screen
          name="Details"
          component={WebStackScreen}
          options={{
            headerShown: true,
            title: '',
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 2000,
                  damping: 1000,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                },
              },
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
