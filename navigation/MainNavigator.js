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
                    name="AccountScreen" 
                    component={AccountScreen}
                    options={{
                        tabBarLabel: 'Mon compte',
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="person-circle-outline" size={size} color={color} />
                        ),
                        title: 'Mon compte',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default MainNavigator;