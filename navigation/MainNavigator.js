import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import UserNavigator from "./UserNavigator.js";
import TaskNavigator from "./TaskNavigator.js";
import AccountNavigator from "./AccountNavigator.js";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";

import { useAuth } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { signedIn, admin } = useAuth();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "#c48820",
          tabBarActiveTintColor: "#c48820",
          tabBarInactiveTintColor: "#949494",
          tabBarStyle: {
            borderTopWidth: 1,
            borderColor: "#949494",
            height: 60,
          },
          headerStyle: {
            height: 80,
          },
          headerTitleAlign: "center",
        }}
      >
        {signedIn ? (
          <>
            <Tab.Screen
              name="UserNavigator"
              component={UserNavigator}
              options={{
                tabBarLabel: admin ? "Utilisateurs" : "Mes tâches",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="apps-outline" size={size} color={color} />
                ),
                title: admin ? "Utilisateurs" : "Mes tâches",
              }}
            />
            <Tab.Screen
              name="TaskNavigator"
              component={TaskNavigator}
              options={{
                tabBarLabel: "Tâches",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list-outline" size={size} color={color} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="AccountNavigator"
              component={AccountNavigator}
              options={{
                tabBarLabel: "Mon compte",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="person-circle-outline"
                    size={size}
                    color={color}
                  />
                ),
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                tabBarLabel: "Connexion",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="apps-outline" size={size} color={color} />
                ),
                title: "Perfect Planner",
              }}
            />
            <Tab.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                tabBarLabel: "Créer un compte",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="apps-outline" size={size} color={color} />
                ),
                title: "Perfect Planner",
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
