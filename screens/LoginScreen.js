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
import MainStyles from "../utils/styles/MainStyles";
import Popup from "../components/ConfirmationPopUp";

const LoginScreen = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const validateAndLogin = () => {
    if (userName === "" || userPass === "") {
      setPopupMessage("Veuillez remplir tous les champs");
      setIsSuccess(false);
      setPopupVisible(true);
    } else {
      login("mock-jwt-token", userName === "admin");
    }
  };

  return (
    <View style={MainStyles.container}>
      <Logo></Logo>
      <Popup visible={popupVisible} isSuccess={isSuccess} message={popupMessage} onClose={setPopupVisible}/>
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
