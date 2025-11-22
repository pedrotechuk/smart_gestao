import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Smart Gestão</Text>

      <Text style={styles.subtitle}>
        Token recebido:
      </Text>

      <Text style={styles.token}>
        {token ? token.slice(0, 20) + "..." : "Nenhum token"}
      </Text>

      <View style={styles.buttonArea}>
        <Button title="Abrir Menu" onPress={() => navigation.openDrawer()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  token: {
    fontSize: 14,
    color: "green",
    marginBottom: 40,
  },
  buttonArea: {
    marginTop: 20,
    width: "60%",
  },
});
