import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../navigation/types";
import React from "react";

type Props = DrawerScreenProps<DrawerParamList, "Admin">;

export default function AdminHome({ navigation, route }: Props) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área Administrativa</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Empresas", { token })}
      >
        <Text style={styles.buttonText}>Gerenciar Empresas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Usuarios", { token })}
      >
        <Text style={styles.buttonText}>Gerenciar Usuários</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#773be6ff", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },

  button: {
    width: "50%",
    backgroundColor: "#ffffffff",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
