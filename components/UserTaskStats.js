import React from "react";
import { View, Text, StyleSheet } from "react-native";

import TaskLabel from "./TaskLabel";
import Colors from "../utils/styles/Colors";
import { flags } from "../data/flags";

const UserTaskStats = ({ tasks }) => {
  const totalRemainingTime = tasks.reduce(
    (acc, task) => acc + (task.remainingTime ?? 0),
    0,
  );
  const tasksWithoutNull = tasks.filter((task) => task.remainingTime != null);
  const averageRemainingTime =
    tasksWithoutNull.length > 0
      ? totalRemainingTime / tasksWithoutNull.length
      : 0;

  const importanceLabels = tasks.reduce((acc, task) => {
    const code = task.importance;
    if (code) {
      const label = flags.find((flag) => flag.code === code)?.label || code;
      acc[code] = { label, count: (acc[code]?.count || 0) + 1 };
    }
    return acc;
  }, {});

  const statusLabels = tasks.reduce((acc, task) => {
    const code = task.etat?.code;
    if (code) {
      const label = task.etat.label;
      acc[code] = { label, count: (acc[code]?.count || 0) + 1 };
    }
    return acc;
  }, {});

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>Total restant: {totalRemainingTime}</Text>
      <Text style={styles.statsText}>
        Durée moyenne: {averageRemainingTime.toFixed(2)}
      </Text>
      <View style={styles.labelsContainer}>
        <View style={styles.labelsContainer}>
          {Object.entries(importanceLabels).map(([code, { label, count }]) => (
            <TaskLabel
              key={code}
              label={`${label}: ${count}`}
              color={Colors.flags[code]}
            />
          ))}
        </View>
        <View style={styles.labelsContainer}>
          {Object.entries(statusLabels).map(([code, { label, count }]) => (
            <TaskLabel
              key={code}
              label={`${label}: ${count}`}
              color={Colors.status[code]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginBottom: 10,
    borderColor: Colors.accentBlue,
    borderBottomWidth: 2,
    padding: 10,
    backgroundColor: Colors.mainWhite,
    borderRadius: 15,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 5,
  },
});

export default UserTaskStats;
