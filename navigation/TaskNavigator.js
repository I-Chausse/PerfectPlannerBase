import { createStackNavigator } from '@react-navigation/stack';

import TasksScreen from '../screens/TasksScreen.js';
import TaskDetailScreen from '../screens/TaskDetailScreen.js';

const Stack = createStackNavigator();

const TasksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
};

export default TasksStack;