import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProjectDisplay from '../components/ProjectDisplay';
import { projets } from '../data/projets';
import MainStyles from '../utils/styles/MainStyles';

const HomeScreen = () => {
  return (
    <View style={[MainStyles.container, styles.container]}>
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
  container: {
    flex: 1,
    alignItems: 'between',
  },
});

export default HomeScreen;