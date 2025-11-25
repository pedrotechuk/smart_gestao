import { View, Text, Button } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../navigation/types";
import React from "react";

type Props = DrawerScreenProps<DrawerParamList, "Admin">;

export default function AdminHome({ navigation, route }: Props) {
  const { token } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Área Administrativa
      </Text>

      <Button
        title="Gerenciar Empresas"
        onPress={() => navigation.navigate("Empresas", { token })}
      />

      <Button
        title="Gerenciar Usuários"
        onPress={() => navigation.navigate("Usuarios", { token })}
      />
    </View>
  );
}
