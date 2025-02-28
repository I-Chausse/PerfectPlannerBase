import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ProjectDisplay = ({ projet }) => {
    return (
      <View style={styles.projectContainer}>
        <Text style={styles.nom}>{projet.nom}</Text>
        <Text style={styles.nbTaches}>Nombre de tâches : {projet.nbTaches}</Text>
      </View>
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