import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TaskDisplay from "./TaskDisplay";
import UserTaskStats from "./UserTaskStats";
import { taches } from "../data/taches";
import { useAuth } from "../contexts/AuthContext";

const UserTasksDisplay = ({ tasks }) => {
  const userTasks = tasks;
  const { admin } = useAuth();

  return (
    <View
      style={[
        styles.container,
        !admin ? { paddingTop: 20, paddingBottom: 110 } : null,
      ]}
    >
      <UserTaskStats tasks={userTasks} />
      <FlatList
        data={userTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskDisplay task={item} projet={{id: item.project_id}}></TaskDisplay>}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingBottom: 200,
  },
});

export default UserTasksDisplay;
