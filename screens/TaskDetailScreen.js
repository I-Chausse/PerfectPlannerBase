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
import { buildAvatarUrl } from "../utils/avatarUrlBuilder";
import { getCallback } from "../utils/CallbackManager";

const TaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const initialTask = route.params?.task;
  const projet = route.params?.projet;
  const creatingTask = route.params?.creatingTask || false;
  const { token } = useAuth();
  const [editedTask, setEditedTask] = useState(initialTask);
  const [originalTask, setOriginalTask] = useState(initialTask);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [status, setStatus] = useState([]);
  const [flags, setFlags] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/get-items/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setStatus(data.data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    const fetchFlags = async () => {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/get-items/flags`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setFlags(data.data);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/projects/${projet.id}/assignables`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchStatus();
    fetchFlags();
    fetchUsers();
  }, [route.params.task]);

  useEffect(() => {
  if (creatingTask && status.length > 0 && flags.length > 0) {
    setEditedTask({
      ...initialTask,
      name: "",
      description: "",
      remaining_time: null,
      status: status.find((s) => s.code === "FAIRE"),
      flag: flags.find((f) => f.code === "IMP"),
    });
  }
}, [creatingTask, status, flags]);

  const handleSave = (field, value) => {
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const handleUserSave = (user) => {
    handleSave("user", user);
    setPopupMessage("Utilisateur changé");
    setIsSuccess(true);
    setPopupVisible(true);
  };

  const saveChanges = async () => {
    const onUpdate = getCallback(route.params?.onUpdate);
    let success = true;
    let errorMsg = "";
    try {
      let response;
      if (creatingTask) {
        response = await fetch(`https://${apiHost}/api/tasks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: editedTask.name,
            description: editedTask.description,
            remaining_time: editedTask.remaining_time,
            project_id: projet.id,
            domain_item_status_id: editedTask.status.id,
            domain_item_flag_id: editedTask.flag.id,
            user_id: editedTask?.user?.id
          }),
        });
      } else {
        let tempTask = { ...editedTask };
        if (editedTask.status.id) {
          tempTask.domain_item_status_id = editedTask.status.id;
        }
        if (editedTask.flag.id) {
          tempTask.domain_item_flag_id = editedTask.flag.id;
        }
        tempTask.user_id = tempTask?.user?.id;
        console.log(tempTask);
        response = await fetch(`https://${apiHost}/api/tasks/${editedTask.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempTask),
        });
      }
      if (!response.ok) {
        let data = await response.json().catch(() => ({}));
        errorMsg = data.message || data.detail || "Erreur inconnue du serveur.";
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      success = false;
      errorMsg = errorMsg || error.message;
    }

    if (success) {
      setPopupMessage("Enregistrement réussi !");
      setIsSuccess(true);
      onUpdate();
    } else {
      setPopupMessage("Échec de l'enregistrement : " + errorMsg);
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
                source={{uri: buildAvatarUrl(editedTask.user)}}
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
              selectedItem={editedTask.status?.code ?? "FAIRE"}
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
          selectedItem={editedTask.flag?.code ?? "IMP"}
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
