import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { status } from '../data/status';
import { Ionicons } from '@expo/vector-icons';

const StatusSelectionScreen = ({ route, navigation }) => {
  const { task, handleSave } = route.params;

  const handleStatusSelect = (status) => {
    handleSave('etat', {code: status.code, label: status.label});
    navigation.goBack();
  };
  console.log('## task ##');
  console.log(task);
  console.log('## status ##');
  console.log(status);
  const renderStatusItem = ({ item }) => (
    <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusSelect(item)}>
      <Text>{item.label}</Text>
      {item.code === task.etat.code && 
        <Ionicons name="checkmark-circle-outline" size={22} style={styles.activeIcon}/>
      }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={status}
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#034d7b',
    borderColor: '#949494',
    borderTopWidth: 5,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#c48820',
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
  },
  activeIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default StatusSelectionScreen;
