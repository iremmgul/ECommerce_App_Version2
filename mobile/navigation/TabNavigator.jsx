import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { tabNavigatorStyles, tabColors } from '../assets/styles/tabNavigatorStyles';
import SafeScreen from '../components/SafeScreen';

import Market from '../app/product/';
import Favorites from '../app/user/favorites';
import Card from '../app/user/card';
import Profile from '../app/user/';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <SafeScreen >
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          let iconName;

          switch (route.name) {
            case 'Market':
              iconName = 'storefront';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Cart':
              iconName = 'cart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return (
           
            <View style={focused ? tabNavigatorStyles.activeTabContainer : tabNavigatorStyles.inactiveTabContainer}>
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: tabColors.active,
        tabBarInactiveTintColor: tabColors.inactive,
        headerShown: false,
        tabBarStyle: tabNavigatorStyles.tabBarStyle,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="Market" 
        component={Market}
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites}
      />
      <Tab.Screen 
        name="Cart" 
        component={Card}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
      />
    </Tab.Navigator>
    </SafeScreen>
  );
}