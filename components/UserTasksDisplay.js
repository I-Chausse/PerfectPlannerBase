import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TaskDisplay from "./TaskDisplay";
import UserTaskStats from "./UserTaskStats";
import { taches } from "../data/taches";
import { useAuth } from "../contexts/AuthContext";

const UserTasksDisplay = ({ user }) => {
  const userTasks = taches.filter((tache) => tache.userId === user.id);
  const { admin } = useAuth();

  return (
    <View style={styles.container}>
      <UserTaskStats tasks={userTasks} />
      <FlatList
        data={userTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskDisplay task={ item}></TaskDisplay>}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingBottom: 180,
  },
});

export default UserTasksDisplay;
