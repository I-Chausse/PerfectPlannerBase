import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectTasksDisplay = ({ task }) => {
    const navigation = useNavigation();
    const navigateToTaskDetails = () => {
        navigation.navigate('TaskDetails', { task });
    };

    return (
    <TouchableOpacity style={styles.task} onPress={navigateToTaskDetails}>
        <Text style={styles.cardTitle}>{task.nom}</Text>
        <Text>{task.description}</Text>
        <View style={[styles.labelBottomRight, styles.label]}>
        <Text>{task.etat.label}</Text>
        </View>
        <View style={[styles.labelTopRight]}>
        <Image
            style={styles.avatar}
            source={require('../assets/avatar.png')}
        />
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    task: {
        fontSize: 14,
        color: 'gray',
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        height: 100,
    },
    labelBottomRight: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    labelTopRight: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    label: {
        backgroundColor: '#eee',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default ProjectTasksDisplay;