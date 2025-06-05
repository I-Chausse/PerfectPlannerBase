import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getCallback } from "../utils/CallbackManager";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";
import { apiHost, apiPort } from "../utils/hosts";
import { useAuth } from "../contexts/AuthContext";
import { buildAvatarUrlFromList } from "../utils/avatarUrlBuilder";

const AvatarSelectionScreen = ({ route }) => {
  const { avatar, callbackId } = route.params;
  const navigation = useNavigation();
  const { token } = useAuth();

  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(
          `https://${apiHost}:${apiPort}/api/get-avatars`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setAvatars(data.data); // Assure-toi que data.data est un tableau d'objets {name, url}
      } catch (error) {
        console.error("Erreur lors du chargement des avatars :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    const callback = getCallback(callbackId);
    if (callback) {
      callback(avatar);
    }
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={MainStyles.container}>
        <ActivityIndicator size="large" color={Colors.accentOrange} />
      </View>
    );
  }

  return (
    <View style={MainStyles.container}>
      <View style={[MainStyles.mainCard, MainStyles.flatContainer]}>
        <FlatList
          data={avatars}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
              <Image
                source={{ uri: buildAvatarUrlFromList(item) }}
                style={[
                  styles.avatar,
                  selectedAvatar === item.name
                    ? { borderColor: Colors.accentOrange, borderWidth: 2 }
                    : null,
                ]}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#034d7b",
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    margin: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
  },
});

export default AvatarSelectionScreen;
