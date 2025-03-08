import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Popup from "../components/ConfirmationPopUp";
import MainStyles from "../utils/styles/MainStyles";
import { getCallback } from "../utils/CallbackManager";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { callbackId } = route.params;

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPopupMessage("Les mots de passe ne correspondent pas.");
      setIsSuccess(false);
      setPopupVisible(true);
      return;
    } else {
      const callback = getCallback(callbackId);
      if (callback) {
        callback("Mot de passe changé !", true);
      }
      navigation.goBack();
    }
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <View style={[MainStyles.container, styles.container]}>
      <Popup
        visible={popupVisible}
        message={popupMessage}
        isSuccess={isSuccess}
        onClose={handlePopupClose}
      />
      <View style={MainStyles.mainCard}>
        <Text style={styles.label}>Mot de passe actuel</Text>
        <TextInput
          style={MainStyles.input}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <Text style={styles.label}>Nouveau mot de passe</Text>
        <TextInput
          style={MainStyles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <TextInput
          style={MainStyles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={MainStyles.buttonContainer}>
          <TouchableOpacity
            onPress={handleChangePassword}
            style={[MainStyles.mainBtn, styles.button]}
          >
            <Text style={MainStyles.mainBtnText}>Changer le mot de passe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  label: {
    marginLeft: 10,
    marginTop: 10,
    color: "#333",
  },
  button: {
    width: "80%",
    padding: 10,
  },
});

export default ChangePasswordScreen;
