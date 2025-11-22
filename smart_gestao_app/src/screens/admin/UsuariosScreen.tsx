import { View, Text } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "Usuarios">;

export default function UsuariosScreen({ route }: Props) {
  const { token } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Cadastro de Usuários
      </Text>

      <Text style={{ marginTop: 10 }}>
        Token recebido: {token.slice(0, 10)}...
      </Text>
    </View>
  );
}
