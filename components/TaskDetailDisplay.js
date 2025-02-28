import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TaskDetailDisplay = ({ task }) => {
    return (
      <View style={styles.task}>
        <Text style={styles.cardTitle}>Titre: {task.nom}</Text>
        <Text>Description: {task.description}</Text>
        <View style={[styles.labelBottomRight, styles.label]}>
            <Text>{task.etat.label}</Text>
        </View>
        <View style={[styles.labelTopRight]}>
            <Image
                style={styles.avatar}
                source={require('../assets/avatar.png')}
            />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    task: {

    }
});

export default TaskDetailDisplay;