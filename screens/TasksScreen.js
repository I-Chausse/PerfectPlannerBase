import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ProjectTasksDisplay from "../components/ProjectTasksDisplay";
import ProjectSelector from "../components/ProjectSelector";
import MainStyles from "../utils/styles/MainStyles";
import { apiHost, apiPort } from "../utils/hosts";
import { useAuth } from "../contexts/AuthContext";

const TasksScreen = () => {
  const { token } = useAuth();
  const navigation = useNavigation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/my-projects`,
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
        setProjects(data.data);
        setSelectedProject(data.data[0]); // Sélectionner le premier projet par défaut
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const navigateToNewTask = () => {
    navigation.navigate("TaskDetailNavigator", {
      screen: "TaskDetailScreen",
      params: {
        task: {
        },
        projet: {
          id: selectedProject.id,
        },
        creatingTask: true,
      },
    });
  };

  if (loading) {
    return (
      <View style={[MainStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={MainStyles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={MainStyles.container}>
      <ProjectSelector
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        projects={projects}
      />
      <ProjectTasksDisplay projet={selectedProject} />
      <TouchableOpacity style={[MainStyles.mainBtn, styles.button]} onPress={navigateToNewTask}>
        <Ionicons name="add-outline" size={22} style={styles.activeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 10,
    borderRadius: 25,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TasksScreen;
