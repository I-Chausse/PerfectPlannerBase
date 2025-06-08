import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TaskDisplay from "../components/TaskDisplay";
import { apiHost, apiPort } from "../utils/hosts";
import { useAuth } from "../contexts/AuthContext";
import { setCallback } from "../utils/CallbackManager";

const ProjectTasksDisplay = ({ projet, search }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey(refreshKey + 1);
  };
  const callbackId = "refreshTasks";

  useEffect(() => {
    if (!projet?.id) {
      setError("Aucun projet sélectionné");
      setLoading(false);
      return;
    }
    setCallback(callbackId, refreshTasks);
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/projects/${projet.id}/tasks${
            search ? "?search=" + search : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
  }, [projet?.id, refreshKey, search]);

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
        <Ionicons
          name="warning-outline"
          size={40}
          color="#ff9800"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.errorText}>Attention : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.taskContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskDisplay task={item} projet={projet} onUpdate={callbackId} />
        )}
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
    marginTop: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    borderColor: "#FFB300",
    borderWidth: 1,
    borderRadius: 16,
    margin: 20,
    padding: 24,
  },
  errorText: {
    color: "#FF9800",
    textAlign: "center",
  },
});

export default ProjectTasksDisplay;
