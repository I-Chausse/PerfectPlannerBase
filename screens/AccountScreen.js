import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { users } from '../data/users';
import EditableText from '../components/editableFields/EditableText';
import { useNavigation } from '@react-navigation/native';

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
    <View>
      <Text>Nom du compte : {editedUser.nomUtilisateur} </Text>

      <TouchableOpacity onPress={navigateToAvatarSelection} style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={avatarImages[editedUser.avatar]}
        />
        <Text style={styles.selectUserText}>Sélectionner un avatar</Text>
      </TouchableOpacity>

      <EditableText value={editedUser.nom} onSave={(value) => handleSave('nom', value)} label="Prénom"></EditableText>
      <EditableText value={editedUser.prenom} onSave={(value) => handleSave('prenom', value)} label="Nom"></EditableText>
      <EditableText value={editedUser.email} onSave={(value) => handleSave('email', value)} label="Email"></EditableText>
    </View>
  );
};

const styles = {
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
},
};

export default AccountScreen;