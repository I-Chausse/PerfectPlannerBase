import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProjectDisplay from '../components/ProjectDisplay';

const projets = [
  { nom: 'Développement Site E-commerce', nbTaches: 19 },
  { nom: 'Application Mobile de Fitness', nbTaches: 15 },
  { nom: 'Refonte du Site Web', nbTaches: 6 },
  { nom: 'Intégration API Paiement', nbTaches: 9 },
  { nom: 'Optimisation SEO', nbTaches: 20 },
  { nom: 'Développement CRM', nbTaches: 2 },
  { nom: 'Application de Gestion de Projet', nbTaches: 4 },
  { nom: 'Site Vitrine pour Entreprise', nbTaches: 7 },
  { nom: 'Développement de Jeu Mobile', nbTaches: 11 },
  { nom: 'Application de Réalité Augmentée', nbTaches: 16 },
  { nom: 'Développement de Chatbot', nbTaches: 1 },
  { nom: 'Application de Suivi de Santé', nbTaches: 8 },
];

const HomeScreen = () => {
  return (
    <View>
      <FlatList
        numColumns={2}
        data={projets}
        keyExtractor={(item) => item.nom}
        renderItem={({ item }) => <ProjectDisplay projet={item}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default HomeScreen;