/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home';
import WebViewScreen from './Screens/WebViewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{header: () => null}}
          />
           <Stack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
