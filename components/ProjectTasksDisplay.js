import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";

import TaskDisplay from "../components/TaskDisplay";
import { apiHost, apiPort } from "../utils/hosts";
import { useAuth } from "../contexts/AuthContext";

const ProjectTasksDisplay = ({ projet }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/projects/${projet.id}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projet.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.taskContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskDisplay task={item} projet={projet} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: "90%",
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectTasksDisplay;
