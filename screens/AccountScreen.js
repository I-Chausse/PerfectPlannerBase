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

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
  };

  const { logout } = useAuth();

  return (
    <View style={MainStyles.container}>
      <View style={[MainStyles.mainCard, styles.mainCard]}>
        <View style={styles.topContainer}>
          <Text style={styles.customText}>
            <Text style={MainStyles.bold}>Compte :</Text>{" "}
            {editedUser.nomUtilisateur}{" "}
          </Text>
          <TouchableOpacity
            onPress={navigateToAvatarSelection}
            style={styles.avatarContainer}
          >
            <Image
              style={styles.avatar}
              source={avatarImages[editedUser.avatar]}
            />
            <Ionicons name="create-outline" size={22} />
          </TouchableOpacity>
        </View>

        <EditableText
          value={editedUser.nom}
          onSave={(value) => handleSave("nom", value)}
          label="Nom"
        />
        <EditableText
          value={editedUser.prenom}
          onSave={(value) => handleSave("prenom", value)}
          label="Prénom"
        />
        <EditableText
          value={editedUser.email}
          onSave={(value) => handleSave("email", value)}
          label="Email"
        />
      </View>
      <View>
        <TouchableOpacity onPress={logout} style={MainStyles.secBtn}>
          <Text style={MainStyles.secBtnText}>Deconnexion</Text>
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
    marginEnd: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default AccountScreen;
