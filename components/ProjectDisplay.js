import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../utils/styles/Colors';


const ProjectDisplay = ({ projet }) => {
  const navigation = useNavigation();

  const navigateToTasks = () => {
    navigation.navigate('TaskNavigator', {screen: 'TasksScreen', params: {projet: projet}});
  };
    return (
      <TouchableOpacity style={styles.projectContainer} onPress={navigateToTasks}>
        <Text style={styles.nom}>{projet.nom}</Text>
        <Text style={styles.nbTaches}>Nombre de tâches : {projet.nbTaches}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    projectContainer: {
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 5,
      backgroundColor: Colors.mainWhite,
      height: 100,
      justifyContent: 'space-around',
      borderColor: Colors.mainBlue,
      borderBottomWidth: 2.5,
    },
    nom: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    nbTaches: {
      fontSize: 14,
      color: Colors.mainGray,
    },
  });

export default ProjectDisplay;