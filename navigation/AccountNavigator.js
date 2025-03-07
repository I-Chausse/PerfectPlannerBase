import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen.js";
import AvatarSelectionScreen from "../screens/AvatarSelectionScreen.js";

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
    </Stack.Navigator>
  );
};

export default AccountNavigator;
