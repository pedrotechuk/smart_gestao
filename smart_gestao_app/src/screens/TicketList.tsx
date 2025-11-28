import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";

type Props = DrawerScreenProps<DrawerParamList, "TicketList">;

export default function TicketList({ navigation, route }: Props) {
  const { token } = route.params;

  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subCategoria, setSubCategoria] = useState("");
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Meus Chamados</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home", { token })}>
          <Ionicons name="home-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* BOTÃO NOVO CHAMADO */}
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate("TicketDetal", { token })}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.newButtonText}>Novo Chamado</Text>
      </TouchableOpacity>

      {/* FORMULÁRIO */}
      <View style={styles.form}>
        <Text style={styles.label}>Empresa *</Text>
        <TextInput
          style={styles.input}
          value={empresa}
          onChangeText={setEmpresa}
          placeholder="Digite a empresa"
        />

        <Text style={styles.label}>Tipo *</Text>
        <TextInput
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
          placeholder="Digite o tipo"
        />

        <Text style={styles.label}>Categoria *</Text>
        <TextInput
          style={styles.input}
          value={categoria}
          onChangeText={setCategoria}
          placeholder="Digite a categoria"
        />

        <Text style={styles.label}>Sub-Categoria *</Text>
        <TextInput
          style={styles.input}
          value={subCategoria}
          onChangeText={setSubCategoria}
          placeholder="Digite a sub-categoria"
        />

        <Text style={styles.label}>Assunto *</Text>
        <TextInput
          style={styles.input}
          value={assunto}
          onChangeText={setAssunto}
          placeholder="Digite o assunto"
        />

        <Text style={styles.label}>Descrição da solicitação *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição"
          multiline
        />

        {/* BOTÕES DE IMAGEM/VIDEO */}
        <View style={styles.mediaButtonsRow}>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="camera-outline" size={20} color="#6a4cff" />
            <Text style={styles.mediaButtonText}>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="images-outline" size={20} color="#6a4cff" />
            <Text style={styles.mediaButtonText}>Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="videocam-outline" size={20} color="#6a4cff" />
            <Text style={styles.mediaButtonText}>Vídeo</Text>
          </TouchableOpacity>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.actionText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
            <Text style={styles.actionText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    backgroundColor: "#6a4cff",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  newButton: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#6a4cff",
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  form: {
    marginHorizontal: 16,
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    color: "#4b3db2",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d6ceff",
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  mediaButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#6a4cff",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  mediaButtonText: {
    color: "#6a4cff",
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#aaa",
  },
  saveButton: {
    backgroundColor: "#6a4cff",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});
