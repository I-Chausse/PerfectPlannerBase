import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { users } from "../data/users";
import EditableText from "../components/editableFields/EditableText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../contexts/AuthContext";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";
import { setCallback } from "../utils/CallbackManager";
import Popup from "../components/ConfirmationPopUp";

const AccountScreen = () => {
  const navigation = useNavigation();
  const initialUser = users[0];
  const [editedUser, setEditedUser] = useState(initialUser);
  const [originalUser, setOriginalUser] = useState(initialUser);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    setOriginalUser(initialUser);
    setEditedUser(initialUser);
  }, [users[0]]);

  const cancelChanges = () => {
    setEditedUser(originalUser);
  };

  const saveChanges = () => {
    const success = true;
    if (success) {
      setPopupMessage("Enregistrement réussi !");
      setIsSuccess(true);
    } else {
      setPopupMessage("Échec de l'enregistrement.");
      setIsSuccess(false);
    }
    setPopupVisible(true);
  };

  const openPopup = (message, success) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setPopupVisible(true);
  };

  const handleSave = (field, value) => {
    setEditedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleAvatarSave = (avatar) => {
    handleSave("avatar", avatar);
  };

  const navigateToAvatarSelection = () => {
    const callbackId = "avatarSelect";
    setCallback(callbackId, handleAvatarSave);
    navigation.navigate("AvatarSelectionScreen", {
      avatar: editedUser.avatar,
      callbackId: "avatarSelect",
    });
  };

  const navigateToChangePassword = () => {
    const callbackId = "setPopUp";
    setCallback(callbackId, openPopup);
    navigation.navigate("ChangePasswordScreen", { callbackId });
  };

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
  };

  const { logout } = useAuth();

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <View style={MainStyles.container}>
      <View style={[MainStyles.mainCard, styles.mainCard]}>
        <Popup
          visible={popupVisible}
          message={popupMessage}
          isSuccess={isSuccess}
          onClose={handlePopupClose}
        />
        <View style={styles.topContainer}>
          <Text style={styles.customText}>
            <Text style={MainStyles.bold}>Compte :</Text>{" "}
            {editedUser.nomUtilisateur}{" "}
          </Text>
          <TouchableOpacity
            onPress={navigateToAvatarSelection}
            style={[styles.avatarContainer, MainStyles.selectInput]}
          >
            <Image
              style={styles.avatar}
              source={avatarImages[editedUser.avatar]}
            />
            <Ionicons name="create-outline" size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <EditableText
            value={editedUser.nom}
            onSave={(value) => handleSave("nom", value)}
            label="Nom"
          />
        </View>
        <View style={styles.input}>
          <EditableText
            value={editedUser.prenom}
            onSave={(value) => handleSave("prenom", value)}
            label="Prénom"
          />
        </View>
        <View style={styles.input}>
          <EditableText
            value={editedUser.email}
            onSave={(value) => handleSave("email", value)}
            label="Email"
          />
        </View>
      </View>

      <View style={MainStyles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToChangePassword}
          style={[MainStyles.secBtn, styles.button]}
        >
          <Text style={MainStyles.secBtnText}>Mot de passe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[MainStyles.secBtn, styles.button]}
        >
          <Text style={MainStyles.secBtnText}>Deconnexion</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[MainStyles.buttonContainer, MainStyles.bottomButtonContainer]}
      >
        <TouchableOpacity
          onPress={cancelChanges}
          style={[MainStyles.secBtn, styles.button]}
        >
          <Text style={MainStyles.secBtnText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveChanges}
          style={[MainStyles.mainBtn, styles.button]}
        >
          <Text style={MainStyles.mainBtnText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  mainCard: {
    marginTop: 10,
    width: "90%",
  },
  customText: {
    marginLeft: 5,
    fontSize: 16,
    paddingTop: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  innerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    borderColor: "#c48820",
    borderWidth: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
    marginBottom: 10,
  },

  button: {
    width: "40%",
    padding: 10,
  },

  input: {
    marginBottom: 10,
    borderColor: Colors.mainBlue,
    borderBottomWidth: 1,
  },
};

export default AccountScreen;
