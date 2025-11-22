import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega o token salvo quando o app inicia
  useEffect(() => {
    const loadToken = async () => {
      const saved = await AsyncStorage.getItem("token");
      setToken(saved);
      setLoading(false);
    };

    loadToken();
  }, []);

  if (loading) return null; // Evita piscar tela errada

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* 🔥 Se não tem token → mostra Login */}
          {token == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            // 🔥 Se tem token → mostra Drawer com Home
            <Stack.Screen
              name="Home"
              component={DrawerNavigator}
              initialParams={{ token }}
            />
          )}

          {/* Rotas complementares do Stack */}
          <Stack.Screen
            name="Usuarios"
            component={UsuarioScreen}
            options={{ headerShown: true, title: "Usuários" }}
          />

          <Stack.Screen
            name="CreateUser"
            component={CreateUserScreen}
            options={{ headerShown: true, title: "Novo Usuário" }}
          />

          <Stack.Screen
            name="EditUser"
            component={EditUserScreen}
            options={{ headerShown: true, title: "Editar Usuário" }}
          />

        </Stack.Navigator>
      </NavigationContainer>

      {/* Toast global */}
      <Toast />
    </>
  );
}
