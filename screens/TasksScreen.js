import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import ProjectTasksDisplay from '../components/ProjectTasksDisplay';
import ProjectSelector from '../components/ProjectSelector';
import { projets } from '../data/projets';
import MainStyles from '../utils/styles/MainStyles';

const TasksScreen = ({route}) => {
  const initialProject = route.params?.projet ? route.params.projet : projets[0];
  const [selectedProject, setSelectedProject] = useState(initialProject);
  useEffect(() => {
    if (route.params?.projet) {
      setSelectedProject(route.params.projet);
    }
  }, [route.params?.projet]);
  return (
    <View style={MainStyles.container}>
      <ProjectSelector selectedProject={selectedProject} onProjectChange={setSelectedProject}></ProjectSelector>
      <ProjectTasksDisplay projet={selectedProject}></ProjectTasksDisplay>
    </View>
  );
};


export default TasksScreen;