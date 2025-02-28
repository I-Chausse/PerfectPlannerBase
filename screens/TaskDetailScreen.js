import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

const TaskDetailDisplay = ({ route }) => {
    const task = route.params.task;
    return (
        <View style={styles.task}>
            <TextInput style={styles.cardTitle}>Titre: {task.nom}</TextInput>
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