import { createStackNavigator } from "@react-navigation/stack";

import TasksScreen from "../screens/TasksScreen.js";
import TaskDetailNavigator from "./TaskDetailNavigator.js";

const Stack = createStackNavigator();

const TasksNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#c48820",
        headerStyle: {
          height: 80,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="TaskScreen"
        component={TasksScreen}
        options={{
          title: "Tâches",
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

export default TasksNavigator;
