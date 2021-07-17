import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Summary } from '../screens/Summary';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          paddingLeft: 10,
        },
      }}
    >
      <Screen 
        name="Listagem" 
        component={Dashboard} 
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )),
        }}
      />

      <Screen 
        name="Cadastrar" 
        component={Register} 
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="dollar-sign"
              size={size}
              color={color}
            />
          )),
        }}
      />

      <Screen 
        name="Resumo" 
        component={Summary} 
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="pie-chart"
              size={size}
              color={color}
            />
          )),
        }}
      />
    </Navigator>
  );
}
