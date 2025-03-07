import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import UserTasksDisplay from "../components/UserTasksDisplay";
import UserSelector from "../components/UserSelector";
import { useAuth } from "../contexts/AuthContext";
import { users } from "../data/users";

import MainStyles from "../utils/styles/MainStyles";

const TasksScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialUser = users[0];
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const { admin } = useAuth();

  return (
    <View style={[MainStyles.container, styles.container]}>
      {admin ? (
        <UserSelector
          selectedUser={selectedUser}
          onUserChange={setSelectedUser}
        ></UserSelector>
      ) : null}
      <UserTasksDisplay user={selectedUser}></UserTasksDisplay>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TasksScreen;
