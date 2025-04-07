import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import EditableText from "../components/editableFields/EditableText";
import EditableNumber from "../components/editableFields/EditableNumber";
import ItemSelector from "../components/ItemSelector";
import Popup from "../components/ConfirmationPopUp";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";
import { setCallback } from "../utils/CallbackManager";
import { apiHost, apiPort } from "../utils/hosts";
import { useAuth } from "../contexts/AuthContext";

const TaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialTask = route.params?.task;
  const projet = route.params?.projet;
  const { token } = useAuth();
  const [editedTask, setEditedTask] = useState(initialTask);
  const [originalTask, setOriginalTask] = useState(initialTask);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [status, setStatus] = useState([]);
  const [flags, setFlags] = useState([]);
  const [users, setUsers] = useState([]);

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
    1: require("../assets/avatar1.png"),
    2: require("../assets/avatar2.png"),
    3: require("../assets/avatar3.png"),
    4: require("../assets/avatar4.png"),
    5: require("../assets/avatar5.png"),
    6: require("../assets/avatar1.png"),
    7: require("../assets/avatar2.png"),
    8: require("../assets/avatar3.png"),
    9: require("../assets/avatar4.png"),
    "avatarUndefined": require("../assets/avatarUndefined.png"),
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/get-items/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setStatus(data.data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    const fetchFlags = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/get-items/flags`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setFlags(data.data);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/projects/${projet.id}/assignables`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchStatus();
    fetchFlags();
    fetchUsers();
  }, [route.params.task]);

  const handleSave = (field, value) => {
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const handleUserSave = (user) => {
    handleSave("user", user);
    setPopupMessage("Utilisateur changé");
    setIsSuccess(true);
    setPopupVisible(true);
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
    const callbackId = "userSelect";
    setCallback(callbackId, handleUserSave);
    navigation.navigate("UserSelectionScreen", {
      users: users,
      task: editedTask,
      callbackId: callbackId,
    });
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
      <View style={[MainStyles.mainCard, styles.mainCard]}>
        <View style={styles.propertyItem}>
          <EditableText
            value={editedTask.name}
            onSave={(value) => handleSave("name", value)}
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
            <View style={styles.avatarSecondContainer}>
              <Image
                style={MainStyles.avatar}
                source={
                  avatarImages[
                    editedTask.user?.avatar_id ?? "avatarUndefined"
                  ]
                }
              />
              {editedTask.user && (
                <Text style={MainStyles.mx10}>
                  {editedTask.user.first_name.charAt(0) + "."}{" "}
                  {editedTask.user.name}
                </Text>
              )}
              <Ionicons name="create-outline" size={22} />
            </View>
          </TouchableOpacity>
          <View style={{ width: "50%" }}>
            <ItemSelector
              label={"Statut"}
              selectedItem={editedTask.status?.code ?? null}
              onItemChange={(value) => handleSave("status", value)}
              items={status}
            />
          </View>
        </View>
        <View style={styles.propertyItem}>
          <EditableNumber
            value={editedTask.remaining_time ?? null}
            onSave={(value) => handleSave("remaining_time", value)}
            label="Restant"
          />
        </View>
        <ItemSelector
          label={"Importance"}
          selectedItem={editedTask.flag?.code ?? null}
          onItemChange={(value) => handleSave("flag", value)}
          items={flags}
        />
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
    maxWidth: "50%",
  },
});

export default TaskDetailScreen;
