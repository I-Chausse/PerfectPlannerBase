import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../utils/styles/Colors";

const Popup = ({ visible, message, isSuccess, onClose }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start(() => {
          if (onClose) {
            onClose();
          }
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.popup,
        { opacity: fadeAnim },
        isSuccess ? styles.success : styles.error,
      ]}
    >
      <View style={styles.msgContainer}>
        <Ionicons
          name={isSuccess ? "checkmark-circle" : "close-circle"}
          color={Colors.mainWhite}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.popupText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    top: 50,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    zIndex: 1,
  },
  popupText: {
    color: Colors.mainWhite,
    fontSize: 16,
  },
  success: {
    backgroundColor: Colors.succesGreen,
  },
  error: {
    backgroundColor: Colors.errorRed,
  },
  msgContainer: { flexDirection: "row", alignItems: "center", columnGap: 10 },
});

export default Popup;
