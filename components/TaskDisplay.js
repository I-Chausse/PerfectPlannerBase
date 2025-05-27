import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../utils/styles/Colors";
import TaskLabel from "./TaskLabel";
import { apiHost, apiPort } from "../utils/hosts";
import buildAvatarUrl from "../utils/avatarUrlBuilder";

const ProjectTasksDisplay = ({ task, projet, onUpdate }) => {
  const navigation = useNavigation();
  const navigateToTaskDetails = () => {
    navigation.navigate("TaskDetailNavigator", {
      screen: "TaskDetailScreen",
      params: { task: task, projet: projet, onUpdate: onUpdate },
    });
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
            source={{uri: buildAvatarUrl(task.user)}}
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
