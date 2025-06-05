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
import { buildAvatarUrl } from "../utils/avatarUrlBuilder";

const UserSelectionScreen = ({ route }) => {
  const { users, task, callbackId } = route.params;
  const navigation = useNavigation();

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
      <Image style={styles.avatar} source={{uri: buildAvatarUrl(item)}} />
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
