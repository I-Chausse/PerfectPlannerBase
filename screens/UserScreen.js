import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import UserTasksDisplay from "../components/UserTasksDisplay";
import UserSelector from "../components/UserSelector";
import { useAuth } from "../contexts/AuthContext";
import { users } from "../data/users";
import { taches } from "../data/taches";

import MainStyles from "../utils/styles/MainStyles";

const UserScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialUser = users[0];
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const { admin } = useAuth();

  const userTasks = taches.filter((tache) => tache.userId === selectedUser.id);

  return (
    <View style={[MainStyles.container, styles.container]}>
      {admin ? (
        <UserSelector
          selectedUser={selectedUser}
          onUserChange={setSelectedUser}
        />
      ) : null}
      <UserTasksDisplay user={selectedUser} tasks={userTasks} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
