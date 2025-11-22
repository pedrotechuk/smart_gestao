import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../../navigation/types";
import axios from "axios";

type Props = DrawerScreenProps<DrawerParamList, "Usuarios">;

interface Usuario {
  id: number;
  username: string;
  empresa_id: number;
  perfil_id: number;
}

export default function UsuariosScreen({ navigation, route }: Props) {
  const { token } = route.params;

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.5.22:3000";

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Usuario[]>(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.log("ERRO AO BUSCAR USUÁRIOS:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const confirmarExclusao = (id: number) => {
    Alert.alert(
      "Excluir Usuário",
      "Tem certeza que deseja excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => excluirUsuario(id) },
      ]
    );
  };

  const excluirUsuario = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Pronto", "Usuário excluído com sucesso!");
      carregarUsuarios();
    } catch (error: any) {
      console.log("ERRO AO EXCLUIR:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  const renderItem = ({ item }: { item: Usuario }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.info}>Empresa: {item.empresa_id}</Text>
      <Text style={styles.info}>Perfil: {item.perfil_id}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => navigation.navigate("EditUser", { token, userId: item.id })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDelete} onPress={() => excluirUsuario(item.id)}>
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <TouchableOpacity
        style={styles.btnCriar}
        onPress={() => navigation.navigate("CreateUser", { token })}
      >
        <Text style={styles.btnCriarText}>+ Novo Usuário</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  btnEdit: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
  },
  btnDelete: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnCriar: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  btnCriarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
