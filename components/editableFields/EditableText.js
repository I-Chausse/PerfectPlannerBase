import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainStyles from "../../utils/styles/MainStyles";
import Colors from "../../utils/styles/Colors";

const EditableField = ({ value, onSave, label, multiLine }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onSave(localValue);
    setIsEditing(false);
  };

  return (
    <View style={styles.fieldContainer}>
      {isEditing ? (
        <View style={[MainStyles.inputLabelContainer, { width: "90%" }]}>
          <Text style={MainStyles.inputLabel}>{label}</Text>
          <TextInput
            style={[MainStyles.input, styles.input]}
            value={localValue}
            onChangeText={setLocalValue}
            multiline={multiLine}
          />
        </View>
      ) : (
        <Text style={styles.text}>
          <Text style={MainStyles.bold}>{label}</Text>: {localValue}
        </Text>
      )}
      <TouchableOpacity
        style={styles.switchButton}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      >
        <Ionicons
          name={isEditing ? "checkmark-circle" : "create-outline"}
          size={22}
          style={isEditing ? { color: Colors.mainBlue } : {}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },
  input: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  switchButton: {
    padding: 5,
    marginBottom: 5,
    alignSelf: "flex-end",
  },
});

export default EditableField;
