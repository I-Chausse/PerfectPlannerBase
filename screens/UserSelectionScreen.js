import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import MainStyles from "../utils/styles/MainStyles";
import Colors from "../utils/styles/Colors";
import { getCallback } from "../utils/CallbackManager";

const UserSelectionScreen = ({ route }) => {
  const { users, task, callbackId } = route.params;
  const navigation = useNavigation();

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

  const handleUserSelect = (userId) => {
    const callback = getCallback(callbackId);
    if (callback) {
      callback(userId);
    }
    navigation.goBack();
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserSelect(item)}
    >
      <Image style={styles.avatar} source={avatarImages[item.avatar_id]} />
      <Text>
        {item.first_name} {item.name}
      </Text>
      {item.id === task.user?.id && (
        <Ionicons
          name="checkmark-circle-outline"
          size={22}
          style={styles.activeIcon}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[MainStyles.container, styles.container]}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        style={MainStyles.flatContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: Colors.mainBlue,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  activeIcon: {
    position: "absolute",
    right: 10,
  },
});

export default UserSelectionScreen;
