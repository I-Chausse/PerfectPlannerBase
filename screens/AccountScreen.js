import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import EditableText from "../components/editableFields/EditableText";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../contexts/AuthContext";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";
import { setCallback } from "../utils/CallbackManager";
import Popup from "../components/ConfirmationPopUp";
import { apiHost, apiPort } from "../utils/hosts";
import { buildAvatarUrl } from "../utils/avatarUrlBuilder";

const AccountScreen = () => {
  const navigation = useNavigation();
  const { admin, token } = useAuth();
  const initialUser = {};
  const [editedUser, setEditedUser] = useState(initialUser);
  const [originalUser, setOriginalUser] = useState(initialUser);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://${apiHost}:${apiPort}/api/me/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      if (!response.ok) {
        console.error(response);
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      setOriginalUser(data.data[0]);
      setEditedUser(data.data[0]);
      console.log(data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const cancelChanges = () => {
    setEditedUser(originalUser);
  };

  const saveChanges = async () => {
    let success = true;
    let response;
    let errorMsg;
    console.log("ici");
    if (editedUser.name == "") {
      success = false;
      errorMsg = "Le nom est requis"
    }
    else if (editedUser.first_name == "") {
      success = false;
      errorMsg = "Le prénom est requis";
    }
    else if (editedUser.email == "") {
      success = false;
      errorMsg = "L'email est requis";
    }
    if (!success) {
      setPopupMessage(errorMsg);
      setIsSuccess(false);
      setPopupVisible(true);
    }
    else {
    let tempUser = { ...editedUser };
    if (editedUser?.avatar?.id && (!originalUser?.avatar?.id || editedUser.avatar.id !== originalUser.avatar.id)) {
      tempUser.avatar_id = editedUser.avatar.id;
    }
    try {
      response = await fetch(`https://${apiHost}/api/update-me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(tempUser),
      });
      if (!response.ok) {
        let data = await response.json().catch(() => ({}));
        errorMsg = data.message || data.detail || "Erreur inconnue du serveur.";
        throw new Error(errorMsg);
      }
      fetchUser();
    }
    catch (error) {
      console.error("Error saving task:", error);
      success = false;
      errorMsg = errorMsg || error.message;
    }
    if (success) {
      setPopupMessage("Enregistrement réussi !");
      setIsSuccess(true);
    } else {
      setPopupMessage("Échec de l'enregistrement : " + errorMsg);
      setIsSuccess(false);
    }
    setPopupVisible(true);
    }
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

  const handleLogout = async () => {
    let response;
    try {
      response = await fetch(`https://${apiHost}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        let data = await response.json().catch(() => ({}));
        errorMsg = data.message || data.detail || "Erreur inconnue du serveur.";
        throw new Error(errorMsg);
      }
      logout();
      
    }
    catch (error) {
       console.error("Error saving task:", error);
    }
  }

  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  if (loading) {
    return (
      <View style={[MainStyles.container, styles.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
            {editedUser.user_name}{" "}
          </Text>
          <TouchableOpacity
            onPress={navigateToAvatarSelection}
            style={[styles.avatarContainer, MainStyles.selectInput]}
          >
            <Image
              style={styles.avatar}
              source={{uri: buildAvatarUrl(editedUser)}}
            />
            <Ionicons name="create-outline" size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <EditableText
            value={editedUser.name}
            onSave={(value) => handleSave("name", value)}
            label="Nom"
          />
        </View>
        <View style={styles.input}>
          <EditableText
            value={editedUser.first_name}
            onSave={(value) => handleSave("first_name", value)}
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
          onPress={handleLogout}
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
