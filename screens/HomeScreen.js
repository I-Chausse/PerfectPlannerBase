import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProjectDisplay from '../components/ProjectDisplay';
import { projets } from '../data/projets';

const HomeScreen = () => {
  return (
    <View>
      <FlatList
        numColumns={2}
        data={projets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProjectDisplay projet={item}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default HomeScreen;