import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import TaskDisplay from "../components/TaskDisplay";
import { taches } from "../data/taches";

const ProjectTasksDisplay = ({ projet }) => {
  const projectTasks = taches.filter((tache) => tache.projetId === projet.id);
  return (
    <View style={styles.taskContainer}>
      <FlatList
        data={projectTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskDisplay task={item}></TaskDisplay>}
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

export default ProjectTasksDisplay;
