import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "../screens/UserScreen.js";
import TaskDetailNavigator from "./TaskDetailNavigator.js";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();

const UserNavigator = () => {
  const { admin } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#c48820",
        headerTitleAlign: "center",
        headerStyle: {
          height: 80,
        },
      }}
      initialRouteName="UserScreen"
    >
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          title: admin ? "Utilisateurs" : "Mes tâches",
        }}
      />
      <Stack.Screen
        name="TaskDetailNavigator"
        component={TaskDetailNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
