import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import axios from 'axios';



export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');

  // Altere para o IP do seu PC
  // IP da sua máquina na rede Wi-Fi
const BASE_URL = 'http://192.168.5.32:3000';


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

      setToken(response.data.token);
      console.log('TOKEN JWT:', response.data.token);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');

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
