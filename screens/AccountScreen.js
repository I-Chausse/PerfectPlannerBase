import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { users } from '../data/users';
import EditableText from '../components/editableFields/EditableText';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
  const navigation = useNavigation();
  const initialUser = users[0];
  const [editedUser, setEditedUser] = useState(initialUser);
  const [originalUser, setOriginalUser] = useState(initialUser);
  useEffect(() => {
    setOriginalUser(initialUser);
    setEditedUser(initialUser);
  }, [users[0]]);

  const handleSave = (field, value) => {
    setEditedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const navigateToAvatarSelection = () => {
    navigation.navigate('AvatarSelectionScreen', { handleSave: handleSave });
  };

  const avatarImages = {
    "avatar1.png": require('../assets/avatar1.png'),
    "avatar2.png": require('../assets/avatar2.png'),
    "avatar3.png": require('../assets/avatar3.png'),
    "avatar4.png": require('../assets/avatar4.png'),
    "avatar5.png": require('../assets/avatar5.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <View style={styles.topContainer}>
          <Text>Nom du compte : {editedUser.nomUtilisateur} </Text>
          <TouchableOpacity onPress={navigateToAvatarSelection} style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={avatarImages[editedUser.avatar]}
            />
            <Ionicons name="create-outline" size={22}/>
          </TouchableOpacity>
        </View>

        <EditableText value={editedUser.nom} onSave={(value) => handleSave('nom', value)} label="Nom"></EditableText>
        <EditableText value={editedUser.prenom} onSave={(value) => handleSave('prenom', value)} label="Prénom"></EditableText>
        <EditableText value={editedUser.email} onSave={(value) => handleSave('email', value)} label="Email"></EditableText>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    borderTopWidth: 5,
    borderColor: '#949494',
    backgroundColor: '#034d7b',
    padding: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  innerCard: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    borderColor: '#c48820',
    borderWidth: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row'
  }
};

export default AccountScreen;