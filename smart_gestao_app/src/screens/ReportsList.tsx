import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "ReportsList">;

export default function ReportListScreen({ navigation, route }: Props) {
  const { token } = route.params;

  const [unidade, setUnidade] = useState("");
  const [local, setLocal] = useState("");
  const [motivo, setMotivo] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Relatar ocorrência</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Unidade</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Digite a unidade"
          placeholderTextColor="#777"
          value={unidade}
          onChangeText={setUnidade}
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Digite o local"
          placeholderTextColor="#777"
          value={local}
          onChangeText={setLocal}
        />

        <Text style={styles.label}>Motivo</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Digite o motivo"
          placeholderTextColor="#777"
          value={motivo}
          onChangeText={setMotivo}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.bigInputBox}
          placeholder="Descreva o ocorrido"
          placeholderTextColor="#777"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>
          Adicionar imagens ou vídeos?
        </Text>

        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="camera-outline" size={20} color="#8a4fff" />
            <Text style={styles.mediaText}>Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="images-outline" size={20} color="#8a4fff" />
            <Text style={styles.mediaText}>Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="videocam-outline" size={20} color="#8a4fff" />
            <Text style={styles.mediaText}>Vídeo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.limitText}>
          Você pode anexar até 5 mídias (restam 5). Vídeos até 20s e imagens até
          10MB.
        </Text>

        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.newReportButton}
          onPress={() => navigation.navigate("ReportDetail", { token })}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.newReportText}>Novo Relato</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    width: "100%",
    height: 60,
    backgroundColor: "#6a4cff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingTop: 10,
  },

  topBarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  content: {
    padding: 16,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    fontWeight: "500",
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "#b09cff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },

  bigInputBox: {
    borderWidth: 1,
    borderColor: "#b09cff",
    padding: 12,
    borderRadius: 8,
    height: 110,
    marginBottom: 10,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#000",
  },

  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  mediaButton: {
    width: "32%",
    borderWidth: 1,
    borderColor: "#b09cff",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  mediaText: {
    color: "#8a4fff",
    fontWeight: "500",
  },

  limitText: {
    color: "#666",
    fontSize: 12,
    marginTop: 8,
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  cancelButton: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b09cff",
    alignItems: "center",
  },

  cancelText: { color: "#8a4fff", fontWeight: "500" },

  sendButton: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
  },

  sendText: { color: "#fff", fontWeight: "600" },

  newReportButton: {
    marginTop: 25,
    backgroundColor: "#6a4cff",
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    gap: 8,
  },

  newReportText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
