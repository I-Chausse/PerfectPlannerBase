import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

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
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text>Nom d'utilisateur</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nom d'utilisateur"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text>Mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={userPass}
          onChangeText={setUserPass}
          placeholder="Mot de passe"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text>Code de validation</Text>
        <TextInput
          style={styles.input}
          value={validationCode}
          onChangeText={setValidationCode}
          placeholder="Code de validation"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={validateAndRegister} style={styles.registerBtn}>
        <Text>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 5,
    borderColor: '#949494',
    flex: 1,
    backgroundColor: '#034d7b',
    alignItems: 'center',
  },
  registerBtn: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#c48820',
    shadowColor: '#fff',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: 200,
    margin: 10,
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
