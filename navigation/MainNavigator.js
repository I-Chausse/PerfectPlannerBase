import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen.js';
import TaskNavigator from './TaskNavigator.js';
import AccountNavigator from './AccountNavigator.js';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: '#c48820',
          tabBarActiveTintColor: '#c48820',
          tabBarInactiveTintColor: '#949494',
          tabBarStyle: {
            borderTopWidth: 1,
            borderColor: '#949494',
            height: 60,
          },
          headerStyle: { 
            height: 80,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Projets',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="apps-outline" size={size} color={color} />
            ),
            title: 'Projets',
          }}
        />
        <Tab.Screen
          name="TaskNavigator"
          component={TaskNavigator}
          options={{
            tabBarLabel: 'Tâches',
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
            tabBarLabel: 'Mon compte',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default MainNavigator;