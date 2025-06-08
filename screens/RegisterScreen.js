import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/Logo";
import MainStyles from "../utils/styles/MainStyles";
import { apiHost, apiPort } from "../utils/hosts";

const RegisterScreen = () => {
  const { register } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useAuth();

  const validateAndRegister = async () => {
    if (
      userName === "" ||
      userPass === "" ||
      validationCode === "" ||
      firstName === "" ||
      name === "" ||
      email === ""
    ) {
      Alert.alert("Veuillez remplir tous les champs");
    } else {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              user_name: userName,
              password: userPass,
              password_confirmation: userPass,
              token: validationCode,
              first_name: firstName,
              name: name,
              email: email,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          const errorMsg =
            data.message || data.detail || "Erreur lors de l'inscription.";
          Alert.alert(errorMsg);
          return;
        }
        const loginResponse = await fetch(
          `https://${apiHost}:${apiPort}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: userPass,
            }),
          }
        );

        if (!loginResponse.ok) {
          const data = await loginResponse.json().catch(() => ({}));
          const errorMsg =
            data.message || data.detail || "Erreur lors de la connexion.";
          Alert.alert(errorMsg);
          return;
        }

        const loginData = await loginResponse.json();
        await login(loginData.token, loginData.user);
      } catch (error) {
        Alert.alert("Erreur réseau ou serveur.");
        console.error(error);
      }
    }
  };

  return (
    <View style={[MainStyles.container, {paddingBottom: 20}]}>
      <Logo />
      <ScrollView
        contentContainerStyle={[styles.mainCard, MainStyles.mainCard, {flexGrow: 1, paddingBottom: 20, marginBottom: 0,marginTop: 20}]}
      >
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Nom d'utilisateur</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Prénom</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Nom</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Email</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            secureTextEntry={true}
            value={userPass}
            onChangeText={setUserPass}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Code de validation</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={validationCode}
            onChangeText={setValidationCode}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          onPress={validateAndRegister}
          style={MainStyles.mainBtn}
        >
          <Text style={MainStyles.mainBtnText}>Créer un compte</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "start",
    paddingStart: 20,
  },
});

export default RegisterScreen;
