import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: "Login" }}
        />

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
