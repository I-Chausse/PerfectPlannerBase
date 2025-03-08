import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getCallback } from "../utils/CallbackManager";
import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";

const AvatarSelectionScreen = ({ route }) => {
  const { avatar, callbackId } = route.params;
  const navigation = useNavigation();

  const avatarImages = {
    "avatar1.png": require("../assets/avatar1.png"),
    "avatar2.png": require("../assets/avatar2.png"),
    "avatar3.png": require("../assets/avatar3.png"),
    "avatar4.png": require("../assets/avatar4.png"),
    "avatar5.png": require("../assets/avatar5.png"),
  };

  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    const callback = getCallback(callbackId);
    if (callback) {
      callback(avatar);
    }
    navigation.goBack();
  };

  return (
    <View style={MainStyles.container}>
      <View style={[MainStyles.mainCard, MainStyles.flatContainer]}>
        <FlatList
          data={Object.keys(avatarImages)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
              <Image
                source={avatarImages[item]}
                style={[
                  styles.avatar,
                  selectedAvatar === item
                    ? { borderColor: Colors.accentOrange, borderWidth: 2 }
                    : null,
                ]}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
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
