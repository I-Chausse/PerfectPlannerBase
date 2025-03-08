import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { status } from "../data/status";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";

const StatusSelectionScreen = ({ route, navigation }) => {
  const { task, handleSave } = route.params;

  const handleStatusSelect = (status) => {
    handleSave("etat", { code: status.code, label: status.label });
    navigation.goBack();
  };
  const renderStatusItem = ({ item }) => (
    <TouchableOpacity
      style={styles.statusItem}
      onPress={() => handleStatusSelect(item)}
    >
      <Text>{item.label}</Text>
      {item.code === task.etat.code && (
        <Ionicons
          name="checkmark-circle-outline"
          size={22}
          style={styles.activeIcon}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[MainStyles.container]}>
      <FlatList
        data={status}
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.code}
        style={[MainStyles.flatContainer]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: Colors.mainBlue,
    backgroundColor: Colors.mainWhite,
    marginBottom: 5,
    width: "100%",
    borderRadius: 5,
  },
  activeIcon: {
    position: "absolute",
    right: 10,
  },
});

export default StatusSelectionScreen;
