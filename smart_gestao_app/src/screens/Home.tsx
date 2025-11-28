import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleBtnText}>Google</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Cód. empresa"
          placeholderTextColor="#777"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Text style={styles.menuButtonText}>Abrir Menu</Text>
      </TouchableOpacity>

      {token && (
        <Text style={styles.tokenText}>
          Token: {token.slice(0, 20)}...
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#773be6ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  /* LOGO */
  logoContainer: {
    alignItems: "center",
    marginBottom: 45,
  },

  logo: {
    width: 180,
    height: 180,
  },

  /* FORM */
  form: {
    width: "50%",
    gap: 18,
  },

  input: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center", 
  },

  googleBtn: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  googleBtnText: {
    fontSize: 16,
    color: "#444",
  },

  /* BOTÃO MENU */
  menuButton: {
    marginTop: 40,
    backgroundColor: "white",
    padding: 14,
    width: "20%",
    borderRadius: 12,
    alignItems: "center",
  },

  menuButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  tokenText: {
    marginTop: 10,
    color: "white",
    fontSize: 12,
  },
});
