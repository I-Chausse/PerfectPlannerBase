import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import Colors from '../utils/styles/Colors';
import MainStyles from '../utils/styles/MainStyles';

const RegisterScreen = () => {
  const { register } = useAuth();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [validationCode, setValidationCode] = useState('');

  const { login } = useAuth();

  const validateAndRegister = () => {
    if (userName === '' || userPass === '' || validationCode === '') {
      Alert.alert('Veuillez remplir tous les champs');
    } else {
      if (validationCode === '1234') { // Remplacez par la logique de validation réelle
        login('mock-jwt-token');
        Alert.alert('Compte créé avec succès !');
      } else {
        Alert.alert('Code de validation incorrect');
      }
    }
  };

  return (
    <View style={MainStyles.container}>
      <Logo></Logo>
      <View style={[styles.mainCard, MainStyles.mainCard]}>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={ MainStyles.inputLabel }>Nom d'utilisateur</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={ MainStyles.inputLabel }>Mot de passe</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            secureTextEntry={true}
            value={userPass}
            onChangeText={setUserPass}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={ MainStyles.inputLabel }>Code de validation</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={validationCode}
            onChangeText={setValidationCode}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={validateAndRegister} style={MainStyles.mainBtn}>
          <Text style={ MainStyles.mainBtnText }>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    marginTop: 50,
  },
  input: {
    width: 200,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'start',
    paddingStart: 20,
    paddingEnd: 20,
  },
});

export default RegisterScreen;
