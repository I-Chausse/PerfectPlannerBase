import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ProjectDisplay = ({ projet }) => {
  const navigation = useNavigation();

  const navigateToTasks = () => {
    navigation.navigate('Tasks', { projet: projet });
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
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
      height: 100,
    },
    nom: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    nbTaches: {
      fontSize: 14,
      color: 'gray',
    },
  });

export default ProjectDisplay;