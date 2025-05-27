import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import UserTasksDisplay from "../components/UserTasksDisplay";
import UserSelector from "../components/UserSelector";
import { useAuth } from "../contexts/AuthContext";
import { apiHost, apiPort } from "../utils/hosts";

import MainStyles from "../utils/styles/MainStyles";
import { setCallback } from "../utils/CallbackManager";

const UserScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { admin, token } = useAuth();
  const [selectedUser, setSelectedUser] = useState();
  const [userTasks, setUserTasks] = useState();
  const [assignees, setAssignees] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const refreshTasks = () => {
    setRefreshKey(refreshKey + 1)
  };
  const callbackId = "refreshTasksUser";


  const fetchUser = async () => {
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
      setSelectedUser(data.data[0]);
      console.log(selectedUser);
      setAssignees(Array.prototype.concat(data.data[0]?.assignees, data.data[0]));
    } catch (error) {
      console.error("Failed to fetch user tasks:", error);
    }
  };

  const fetchUserTasks = async () => {
      setLoading(true);
      try {
        let response;
        if (admin && selectedUser?.id != null) {
          response = await fetch(
            `https://${apiHost}:${apiPort}/api/user/${selectedUser.id}/tasks`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            },
        );
        }
        else {
          response = await fetch(
            `https://${apiHost}:${apiPort}/api/my-tasks/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            },
        );
        }
        if (!response.ok) {
          console.error(response);
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        setUserTasks(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user tasks:", error);
      }
      finally {
        
      }
    };

  useEffect(() => {    
    fetchUser();
  }, []);

  useEffect(() => {
    setCallback(callbackId, refreshTasks);
    fetchUserTasks();
  }, [selectedUser, refreshKey])

  if (loading) {
    return (
      <View style={[MainStyles.container, styles.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={[MainStyles.container, styles.container]}>
      {admin ? (
        <UserSelector
          selectedUser={selectedUser}
          onUserChange={setSelectedUser}
          users={assignees}
        />
      ) : null}
      <UserTasksDisplay user={selectedUser} tasks={userTasks} onUpdate={callbackId} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
