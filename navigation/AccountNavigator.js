import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen.js";
import AvatarSelectionScreen from "../screens/AvatarSelectionScreen.js";
import ChangePasswordScreen from "../screens/ChangePasswordScreen.js";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#c48820",
        headerTitleAlign: "center",
        headerStyle: {
          height: 80,
        },
      }}
    >
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: "Mon compte",
        }}
      />
      <Stack.Screen
        name="AvatarSelectionScreen"
        component={AvatarSelectionScreen}
        options={{
          title: "Sélection de l'avatar",
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: "Changer le mot de passe",
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
