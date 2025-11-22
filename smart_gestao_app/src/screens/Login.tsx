import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');

  const BASE_URL = 'http://10.3.80.23:3000';

  const handleLogin = async () => {
    if (!username || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        senha,
      });

      const tokenRecebido = response.data.token;
      setToken(tokenRecebido);

      console.log('TOKEN JWT:', tokenRecebido);

      // 👉 REDIRECIONA PRO DRAWER COM O TOKEN
      navigation.navigate("Home", { token: tokenRecebido });

    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert('Erro', err.response?.data?.message || 'Falha no login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Smart Gestão</Text>

      <TextInput
        placeholder="Username"
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

      <Button title="Entrar" onPress={handleLogin} />

      {token ? (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenTitle}>Token JWT:</Text>
          <Text selectable style={styles.tokenText}>{token}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  tokenContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#e0ffe0',
    borderRadius: 8,
  },
  tokenTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tokenText: {
    color: 'green',
  },
});
