import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../utils/styles/Colors";

const TaskLabel = ({ label, color }) => {
  return (
    <View style={[styles.label, { backgroundColor: color }]}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    borderRadius: 5,
    padding: 4,
  },
  labelText: {
    color: Colors.mainBlack,
    fontSize: 12,
  },
});

export default TaskLabel;
