import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { status } from '../data/status';

const StatusSelectionScreen = ({ route, navigation }) => {
  const { handleSave } = route.params;

  const handleStatusSelect = (status) => {
    handleSave('etat', {code: status.code, label: status.label});
  };

  const renderStatusItem = ({ item }) => (
    <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusSelect(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  console.log('## status ##');
  console.log(status);

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
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default StatusSelectionScreen;
