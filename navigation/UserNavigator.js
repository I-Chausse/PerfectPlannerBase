import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "../screens/UserScreen.js";
import TaskDetailNavigator from "./TaskDetailNavigator.js";

const Stack = createStackNavigator();

const UserNavigator = () => {
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
          headerShown: false,
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
