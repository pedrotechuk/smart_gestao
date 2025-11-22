import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import CreateUserScreen from './src/screens/admin/users/CreateUserScreen';
import UsuarioScreen from './src/screens/admin/users/UsuariosScreen';
import EditUserScreen from './src/screens/admin/users/EditUserScreen';


export type RootStackParamList = {
  Login: undefined;
  Home: { token: string };
  CreateUser: { token: string };
  Usuarios: { token: string };
  EditUser: { token: string; userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Usuarios"
          component={UsuarioScreen}
          options={{ title: "Usuários" }}
        />

        <Stack.Screen 
          name="CreateUser"
          component={CreateUserScreen}
          options={{ title: "Novo Usuário" }}
        />

        <Stack.Screen 
          name="EditUser"
          component={EditUserScreen}
          options={{ title: "Editar Usuário" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
