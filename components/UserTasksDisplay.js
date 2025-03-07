import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TaskDisplay from "./TaskDisplay";
import { taches } from "../data/taches";
import { useAuth } from "../contexts/AuthContext";

const UserTasksDisplay = ({ user }) => {
  const userTasks = taches.filter((tache) => tache.userId === user.id);
  const { admin } = useAuth();
  return (
    <View
      style={[
        styles.taskContainer,
        !admin ? { paddingBottom: 0, paddingTop: 20 } : null,
      ]}
    >
      <FlatList
        data={userTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskDisplay task={item} link={false}></TaskDisplay>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: "90%",
    paddingBottom: 100,
  },
});

export default UserTasksDisplay;
