import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';



import ProjectTasksDisplay from '../components/ProjectTasksDisplay';
import ProjectSelector from '../components/ProjectSelector';
import { projets } from '../data/projets';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import MainStyles from '../utils/styles/MainStyles';

const TasksScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialProject = route.params?.projet ? route.params.projet : projets[0];
  const [selectedProject, setSelectedProject] = useState(initialProject);
  useEffect(() => {
    if (route.params?.projet) {
      setSelectedProject(route.params.projet);
    }
  }, [route.params?.projet]);

  const navigateToNewTask = () => {
    navigation.navigate('TaskDetailNavigator', {screen : 'TaskDetailScreen', params : { 'task': {nom: '', label: '', etat: {code: 'A_FAIRE', label: 'A Faire'}} },});
  };

  return (
    <View style={MainStyles.container}>
      <ProjectSelector selectedProject={selectedProject} onProjectChange={setSelectedProject}></ProjectSelector>
      <ProjectTasksDisplay projet={selectedProject}></ProjectTasksDisplay>
      <TouchableOpacity style={[MainStyles.mainBtn, styles.button]}>
        <Ionicons name="add-outline" onPress={ navigateToNewTask } size={22} style={styles.activeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderRadius: 25,
  }
});


export default TasksScreen;