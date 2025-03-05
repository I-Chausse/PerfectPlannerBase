import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');

  const validateAndLogin = () => {
    if (userName === '' || userPass === '') {
      alert('Veuillez remplir tous les champs');
    } else {
      login('mock-jwt-token');
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
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text>Mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={userPass}
          onChangeText={setUserPass}
        />
      </View>
      <TouchableOpacity onPress={validateAndLogin} style={styles.loginBtn}>
        <Text>Se connecter</Text>
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
  loginBtn: {
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

export default LoginScreen;
