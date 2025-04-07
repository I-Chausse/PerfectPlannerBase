import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../utils/styles/Colors";
import TaskLabel from "./TaskLabel";

const ProjectTasksDisplay = ({ task, projet }) => {
  const navigation = useNavigation();
  const navigateToTaskDetails = () => {
    navigation.navigate("TaskDetailNavigator", {
      screen: "TaskDetailScreen",
      params: { task: task, projet: projet },
    });
  };

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
    1: require("../assets/avatar1.png"),
    2: require("../assets/avatar2.png"),
    3: require("../assets/avatar3.png"),
    4: require("../assets/avatar4.png"),
    5: require("../assets/avatar5.png"),
    6: require("../assets/avatar1.png"),
    7: require("../assets/avatar2.png"),
    8: require("../assets/avatar3.png"),
    9: require("../assets/avatar4.png"),
  };

  return (
    <TouchableOpacity style={styles.task} onPress={navigateToTaskDetails}>
      <Text style={styles.cardTitle}>{task.name}</Text>
      <Text numberOfLines={3}>{task.description}</Text>
      <View style={[styles.labelBottomRight, styles.label]}>
        <TaskLabel
          label={task.status.label}
          color={Colors.status[task.status.code]}
        />
      </View>
      {task.remaining_time != null && (
        <View
          style={[styles.labelBottomCenter, styles.label, styles.timeLabel]}
        >
          <Text> {task.remaining_time} </Text>
        </View>
      )}
      {task.flag != null && (
        <View style={[styles.labelBottomLeft, styles.label]}>
          <TaskLabel
            label={task.flag.label}
            color={Colors.flags[task.flag.code]}
          />
        </View>
      )}
      {task.user != null && (
        <View style={[styles.labelTopRight]}>
          <Image
            style={styles.avatar}
            source={
              avatarImages[task.user.avatar_id]
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
    width: "90%",
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
  labelBottomCenter: {
    position: "absolute",
    left: "50%",
    bottom: 10,
  },
  labelBottomLeft: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  labelTopRight: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  label: {
    borderRadius: 5,
    boxShadow: "1px 1px 2px 1px #CCC",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#034d7b",
    borderWidth: 1,
  },
  timeLabel: {
    padding: 2,
    boxShadow: "2px 2px 2px 1px #CCC",
  },
});

export default ProjectTasksDisplay;
