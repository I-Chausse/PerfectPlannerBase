import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Colors from "../utils/styles/Colors";
import { buildAvatarUrl } from "../utils/avatarUrlBuilder";

const UserDisplay = ({ user }) => {
  return (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserSelect(item)}
    >
      <Image style={styles.avatar} source={{uri: buildAvatarUrl(user)}} />
      <Text>
        {user.prenom} {user.nom}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nbTaches: {
    fontSize: 14,
    color: Colors.mainGray,
  },
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

export default UserDisplay;
