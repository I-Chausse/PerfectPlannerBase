import { createStackNavigator } from "@react-navigation/stack";

import TaskDetailScreen from "../screens/TaskDetailScreen.js";
import UserSelectionScreen from "../screens/UserSelectionScreen.js";
import StatusSelectionScreen from "../screens/StatusSelectionScreen.js";

const Stack = createStackNavigator();

const TaskDetailNavigator = () => {
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
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{
          title: "Détail de la tâche",
        }}
      />
      <Stack.Screen
        name="UserSelectionScreen"
        component={UserSelectionScreen}
        options={{
          title: "Sélection du responsable",
        }}
      />
      <Stack.Screen
        name="StatusSelectionScreen"
        component={StatusSelectionScreen}
        options={{
          title: "Sélection du statut",
        }}
      />
    </Stack.Navigator>
  );
};

export default TaskDetailNavigator;
