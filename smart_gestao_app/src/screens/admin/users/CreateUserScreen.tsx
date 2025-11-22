import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { saveLastRoute } from "../../../utils/navigationState";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUser">;

export default function CreateUserScreen({ navigation, route }: Props) {
  const { token } = route.params;

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [perfilId, setPerfilId] = useState("");

  useEffect(() => {
    setUsername("");
    setSenha("");
    setEmpresaId("");
    setPerfilId("");
    saveLastRoute("Usuarios", { token });
  }, []);

  const BASE_URL = "http://192.168.5.22:3000";

  const salvar = async () => {
    if (!username || !senha || !empresaId || !perfilId) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/users`,
        {
          username,
          senha,
          empresa_id: Number(empresaId),
          perfil_id: Number(perfilId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Toast.show({
        type: "success",
        text1: "Usuário criado!",
        text2: "O usuário foi salvo com sucesso.",
      });

      navigation.navigate("Usuarios", { token });
    } catch (err: any) {
      console.log(err.response?.data, err.message);
      Alert.alert("Erro", err.response?.data?.message || "Falha ao criar usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Usuário</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="Empresa ID"
        style={styles.input}
        value={empresaId}
        onChangeText={setEmpresaId}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Perfil ID"
        style={styles.input}
        value={perfilId}
        onChangeText={setPerfilId}
        keyboardType="numeric"
      />

      <Button title="Salvar Usuário" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
