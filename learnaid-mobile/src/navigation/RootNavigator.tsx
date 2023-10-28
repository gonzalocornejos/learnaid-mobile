import {NavigationContainer} from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {reactNavigationTheme} from '../styles/theme';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {ImageBackground} from 'react-native';
import { Text, Container } from 'native-base';

const Stack = createNativeStackNavigator();
const backgroundUrl = '../../assets/background.png';

function RootNavigator() {
  return (
    <NavigationContainer theme={reactNavigationTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'LearnAid',
              headerShown: true,
              headerTitleStyle: {color: 'orange'},
              headerTitleAlign: 'center',
              headerStyle:{
                backgroundColor:'white'
              }
            }}
          />
            
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'LearnAid',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
