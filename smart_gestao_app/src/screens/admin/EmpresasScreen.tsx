import { View, Text } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "Empresas">;

export default function EmpresasScreen({ route }: Props) {
  const { token } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Cadastro de Empresas
      </Text>

      <Text style={{ marginTop: 10 }}>
        Token recebido: {token.slice(0, 10)}...
      </Text>
    </View>
  );
}
