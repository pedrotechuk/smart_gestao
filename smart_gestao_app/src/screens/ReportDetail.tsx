import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";

type Props = DrawerScreenProps<DrawerParamList, "ReportDetail">;

export default function HomeScreen({ navigation, route }: Props) {
  const { token } = route.params;

  return (
    <View></View>
  );
};
