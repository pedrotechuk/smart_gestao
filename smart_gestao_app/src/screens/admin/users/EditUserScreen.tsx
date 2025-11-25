import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { saveLastRoute } from "../../../utils/navigationState";

type Props = NativeStackScreenProps<RootStackParamList, "EditUser">;

export default function EditUserScreen({ navigation, route }: Props) {
  const { token, userId } = route.params;

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [perfilId, setPerfilId] = useState("");

  const BASE_URL = "http://10.0.0.108:3000";

  // Buscar dados do usuário
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const u = response.data;
        setUsername(u.username);
        setSenha(u.senha);
        setEmpresaId(String(u.empresa_id));
        setPerfilId(String(u.perfil_id));
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Erro", "Não foi possível carregar o usuário");
      });
      saveLastRoute("Usuarios", { token, userId });
  }, []);

  const salvar = async () => {
    try {
      await axios.put(
        `${BASE_URL}/users/${userId}`,
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

      Alert.alert("Sucesso", "Usuário atualizado!", [
        {
          text: "OK",
          onPress: () => {
            const drawerNav = navigation.getParent();
            drawerNav?.navigate("Usuarios", { token });
          },
        },
      ]);
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert("Erro", err.response?.data?.message || "Falha ao atualizar usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>

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

      <Button title="Salvar Alterações" onPress={salvar} />
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
