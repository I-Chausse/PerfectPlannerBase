import React, { useState, useEffect, createContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import EditableText from "../components/editableFields/EditableText";
import EditableNumber from "../components/editableFields/EditableNumber";
import ItemSelector from "../components/ItemSelector";
import { users } from "../data/users";
import { flags } from "../data/flags";
import Popup from "../components/ConfirmationPopUp";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";

const TaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialTask = route.params?.task;
  const [editedTask, setEditedTask] = useState(initialTask);
  const [originalTask, setOriginalTask] = useState(initialTask);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
  };

  useEffect(() => {
    setOriginalTask(initialTask);
    setEditedTask(initialTask);
  }, [route.params.task]);

  const handleSave = (field, value) => {
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
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

  const cancelChanges = () => {
    setEditedTask(originalTask);
  };

  const navigateToUserSelection = () => {
    navigation.navigate("UserSelectionScreen", {
      users: users,
      task: editedTask,
      handleSave: handleSave,
      onGoBack: () => {
        setPopupMessage("Utilisateur modifié.");
        setIsSuccess(true);
        setPopupVisible(true);
      },
    });
  };

  const navigateToStatusSelection = () => {
    navigation.navigate("StatusSelectionScreen", {
      task: editedTask,
      handleSave: handleSave,
      onGoBack: () => {
        setPopupMessage("Statut modifié.");
        setIsSuccess(true);
        setPopupVisible(true);
      },
    });
  };

  return (
    <View style={[MainStyles.container, styles.container]}>
      <Popup
        visible={popupVisible}
        message={popupMessage}
        isSuccess={isSuccess}
      />
      <View style={[MainStyles.mainCard, styles.mainCard]}>
        <View style={styles.propertyItem}>
          <EditableText
            value={editedTask.nom}
            onSave={(value) => handleSave("nom", value)}
            label="Titre"
          />
        </View>
        <View style={styles.propertyItem}>
          <EditableText
            value={editedTask.description}
            onSave={(value) => handleSave("description", value)}
            label="Description"
            multiLine={true}
          />
        </View>
        <View style={styles.customSelectContainer}>
          <TouchableOpacity
            onPress={navigateToUserSelection}
            style={styles.customNavigator}
          >
            {editedTask.userId && (
              <View style={styles.avatarSecondContainer}>
                <Image
                  style={MainStyles.avatar}
                  source={
                    avatarImages[
                      users.find((user) => user.id === editedTask.userId).avatar
                    ]
                  }
                />
                <Text style={MainStyles.mx10}>
                  {users
                    .find((user) => user.id === editedTask.userId)
                    .prenom.charAt(0) + "."}{" "}
                  {users.find((user) => user.id === editedTask.userId).nom}
                </Text>
                <Ionicons name="create-outline" size={22} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToStatusSelection}
            style={styles.customNavigator}
          >
            <Text style={MainStyles.bold}>Statut: </Text>
            <Text style={MainStyles.mx10}>{editedTask.etat.label}</Text>
            <Ionicons name="create-outline" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.propertyItem}>
            <EditableNumber
              value={editedTask.remainingTime ?? null}
              onSave={(value) => handleSave("remainingTime", value)}
              label="Restant"
            />
        </View>
        <ItemSelector
          label={"Importance"}
          selectedItem={editedTask.importance ?? null}
          onItemChange={(value) => handleSave("importance", value)}
          items={flags}
        />
      </View>
      <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mainCard: {
    width: "90%",
  },

  propertyItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainBlue,
    marginBottom: 15,
  },

  button: {
    width: "40%",
    padding: 10,
  },

  customNavigator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Colors.mainBlue,
  },
  customSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    marginBottom: 15,
  },
  avatarSecondContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});

export default TaskDetailScreen;