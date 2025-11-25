import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../../navigation/types";
import axios from "axios";
import { saveLastRoute } from "../../../utils/navigationState";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

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

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const BASE_URL = "http://10.0.0.108:3000";

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
    saveLastRoute("Usuarios", { token });
  }, []);

  // Abrir modal
  const confirmarExclusao = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModalVisible(true);
  };

  // Excluir usuário
  const excluirUsuario = async () => {
    if (!usuarioSelecionado) return;

    try {
      await axios.delete(`${BASE_URL}/users/${usuarioSelecionado.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Toast.show({
        type: "success",
        text1: "Usuário excluído",
        text2: `${usuarioSelecionado.username} foi removido.`,
      });

      carregarUsuarios();

    } catch (error: any) {
      console.log("ERRO AO EXCLUIR:", error.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Erro ao excluir",
        text2: "Tente novamente mais tarde.",
      });
    }

    setModalVisible(false);
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

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => confirmarExclusao(item)}
        >
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

      {/* Modal de exclusão */}
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Excluir Usuário?</Text>

          <Text style={styles.modalMessage}>
            Tem certeza que deseja excluir{" "}
            <Text style={{ fontWeight: "bold" }}>
              {usuarioSelecionado?.username}
            </Text>
            ?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalDelete]}
              onPress={excluirUsuario}
            >
              <Text style={styles.modalButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

  // Modal
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancel: {
    backgroundColor: "#ccc",
  },
  modalDelete: {
    backgroundColor: "#dc3545",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
