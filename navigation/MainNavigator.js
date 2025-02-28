import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen.js';
import TaskNavigator from './TaskNavigator.js';
import AccountScreen from '../screens/AccountScreen.js';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarLabel: 'Projets',
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="apps-outline" size={size} color={color} />
                        ),
                      }}
                />
                <Tab.Screen
                    name="Tasks" 
                    component={TaskNavigator}
                    options={{
                        tabBarLabel: 'Tâches',
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="list-outline" size={size} color={color} />
                        ),
                      }}
                />
                <Tab.Screen 
                    name="Account" 
                    component={AccountScreen}
                    options={{
                        tabBarLabel: 'Mon compte',
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="person-circle-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default MainNavigator;