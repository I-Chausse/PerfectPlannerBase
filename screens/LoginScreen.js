import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

import Logo from "../components/Logo";
import Colors from "../utils/styles/Colors";
import MainStyles from "../utils/styles/MainStyles";

const LoginScreen = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const validateAndLogin = () => {
    if (userName === "" || userPass === "") {
      alert("Veuillez remplir tous les champs");
    } else {
      login("mock-jwt-token", userName === "admin");
    }
  };

  return (
    <View style={MainStyles.container}>
      <Logo></Logo>
      <View style={[styles.mainCard, MainStyles.mainCard]}>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Nom d'utilisateur</Text>
          <TextInput
            style={[styles.input, MainStyles.input]}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={MainStyles.inputLabelContainer}>
          <Text style={MainStyles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={[styles.input, MainStyles.input]}
            secureTextEntry={true}
            value={userPass}
            onChangeText={setUserPass}
          />
        </View>
        <TouchableOpacity onPress={validateAndLogin} style={MainStyles.mainBtn}>
          <Text style={MainStyles.mainBtnText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
  },
  mainCard: {
    marginTop: 50,
  },
});

export default LoginScreen;
