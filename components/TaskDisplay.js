import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { users } from "../data/users";
import Colors from "../utils/styles/Colors";

const ProjectTasksDisplay = ({ task }) => {
  const navigation = useNavigation();
  const navigateToTaskDetails = () => {
    navigation.navigate("TaskDetailNavigator", {
      screen: "TaskDetailScreen",
      params: { task: task },
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
    <TouchableOpacity style={styles.task} onPress={navigateToTaskDetails}>
      <Text style={styles.cardTitle}>{task.nom}</Text>
      <Text numberOfLines={3}>{task.description}</Text>
      <View
        style={[
          styles.labelBottomRight,
          styles.label,
          {
            backgroundColor: Colors.status[task.etat.code],
            borderColor:
              task.etat.code === "A_FAIRE" ? Colors.mainBlue : Colors.mainWhite,
          },
        ]}
      >
        <Text>{task.etat.label}</Text>
      </View>
      {task.userId && (
        <View style={[styles.labelTopRight]}>
          <Image
            style={styles.avatar}
            source={
              avatarImages[users.find((user) => user.id === task.userId).avatar]
            }
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  task: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: Colors.mainWhite,
    height: 150,
    borderBottomWidth: 2.5,
    borderColor: Colors.mainBlue,
  },
  labelBottomRight: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  labelTopRight: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  label: {
    backgroundColor: "#eee",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#034d7b",
    padding: 3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#034d7b",
    borderWidth: 1,
  },
});

export default ProjectTasksDisplay;
