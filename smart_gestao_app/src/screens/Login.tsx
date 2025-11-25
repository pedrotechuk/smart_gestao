import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const BASE_URL = 'http://10.0.0.108:3000';

  const handleLogin = async () => {
    if (!username || !senha) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha usuário e senha.",
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        senha,
      });

      const tokenRecebido = response.data.token;

      // 🔥 Salva token de forma persistente
      await AsyncStorage.setItem("token", tokenRecebido);

      Toast.show({
        type: "success",
        text1: "Login realizado",
        text2: "Bem-vindo ao Smart Gestão 🚀",
      });

      if (typeof window !== "undefined") {
        window.location.reload();
      }


    } catch (err: any) {
      console.log(err.response?.data || err.message);

      Toast.show({
        type: "error",
        text1: "Erro no login",
        text2: err.response?.data?.message || "Usuário ou senha inválidos",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Smart Gestão</Text>

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <Text style={styles.botao} onPress={handleLogin}>
        Entrar
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#003CA2",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#003CA2",
    color: "#fff",
    padding: 16,
    fontSize: 18,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
