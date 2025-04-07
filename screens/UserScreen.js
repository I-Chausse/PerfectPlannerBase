import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import UserTasksDisplay from "../components/UserTasksDisplay";
import UserSelector from "../components/UserSelector";
import { useAuth } from "../contexts/AuthContext";
import { users } from "../data/users";
import { apiHost, apiPort } from "../utils/hosts";

import MainStyles from "../utils/styles/MainStyles";

const UserScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { admin, token } = useAuth();
  const initialUser = admin ? users[2] : users[0];
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://${apiHost}:${apiPort}/api/my-tasks/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          console.error(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserTasks(data.data);
      } catch (error) {
        console.error("Failed to fetch user tasks:", error);
      }
    };

    fetchUserTasks();
  }, [token]);

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
