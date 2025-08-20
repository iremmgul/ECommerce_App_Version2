import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import Market from '../app/product/';
import Favorites from '../app/user/favorites';
import Card from '../app/user/card';
import Profile from '../app/user/';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Market':
                iconName = 'storefront';
                break;
              case 'Favorites':
                iconName = 'heart';
                break;
              case 'Cart':
                iconName = 'cart-outline';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              default:
                iconName = 'ellipse';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F57C00', 
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Market" component={Market} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Cart" component={Card} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    
  );
}
