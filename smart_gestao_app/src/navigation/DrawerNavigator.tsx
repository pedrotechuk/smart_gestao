import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import AdminHome from "../screens/admin/AdminHome";
import EmpresasScreen from "../screens/admin/EmpresasScreen";
import UsuariosScreen from "../screens/admin/users/UsuariosScreen";

import type { DrawerParamList } from "./types";
import ReportDetail from "../screens/ReportDetail";
import ReportsList from "../screens/ReportsList";
import TicketDetal from "../screens/TicketDetal";
import TicketList from "../screens/TicketList";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator({ route }:any) {
  const { token } = route.params;

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ token }}
      />
      
      <Drawer.Screen
        name="Usuarios"
        component={UsuariosScreen}
        initialParams={{ token }}
      />
      
      <Drawer.Screen
        name="Empresas"
        component={EmpresasScreen}
        initialParams={{ token }}
      />
      
      <Drawer.Screen
        name="Admin"
        component={AdminHome}
        initialParams={{ token }}
      />

      <Drawer.Screen
        name="ReportDetail"
        component={ReportDetail}
        initialParams={{ token }}
      />

      <Drawer.Screen
        name="ReportsList"
        component={ReportsList}
        initialParams={{ token }}
      />

      <Drawer.Screen
        name="TicketDetal"
        component={TicketDetal}
        initialParams={{ token }}
      />

      <Drawer.Screen
        name="TicketList"
        component={TicketList}
        initialParams={{ token }}
      />

    </Drawer.Navigator>
  );
}
