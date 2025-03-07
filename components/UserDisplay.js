import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  useNavigation,
  StackActions,
  NavigationActions,
} from "@react-navigation/native";

import Colors from "../utils/styles/Colors";

const UserDisplay = ({ user }) => {
  const navigation = useNavigation();

  const navigateToTasks = () => {
    navigation.navigate("TaskNavigator", {
      screen: "TasksScreen",
      params: { reset: true, projet: projet },
    });
  };

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
  };
  return (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserSelect(item)}
    >
      <Image style={styles.avatar} source={avatarImages[user.avatar]} />
      <Text>
        {user.prenom} {user.nom}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nbTaches: {
    fontSize: 14,
    color: Colors.mainGray,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: Colors.mainBlue,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  activeIcon: {
    position: "absolute",
    right: 10,
  },
});

export default UserDisplay;
