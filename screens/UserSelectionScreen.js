import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserSelectionScreen = ({ route, navigation }) => {
  const { users, handleSave } = route.params;

  const avatarImages = {
    "avatar1.png": require('../assets/avatar1.png'),
    "avatar2.png": require('../assets/avatar2.png'),
    "avatar3.png": require('../assets/avatar3.png'),
    "avatar4.png": require('../assets/avatar4.png'),
    "avatar5.png": require('../assets/avatar5.png'),
};

  const handleUserSelect = (user) => {
    handleSave('userId', user.id);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserSelect(item)}>
      <Image style={styles.avatar} source={avatarImages[item.avatar]} />
      <Text>{item.nom} {item.prenom}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default UserSelectionScreen;
