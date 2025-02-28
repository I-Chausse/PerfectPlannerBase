import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import EditableText from '../components/editableFields/EditableText';

const TaskDetailDisplay = ({ route }) => {
    const initialTask = route.params.task;
    const [editedTask, setEditedTask] = useState(initialTask);
    const [originalTask, setOriginalTask] = useState(initialTask);

    useEffect(() => {
        setOriginalTask(initialTask);
        setEditedTask(initialTask);
    }, [route.params.task]);

    const handleSave = (field, value) => {
        setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
    };

    const saveChanges = () => {
        console.log("Changes saved:", editedTask);
    };

    const cancelChanges = () => {
        setEditedTask(originalTask);
    };

    return (
        <View style={styles.task}>
            <EditableText value={editedTask.nom} onSave={(value) => handleSave('nom', value)} label="Titre" />
            <EditableText value={editedTask.description} onSave={(value) => handleSave('description', value)} label="Description" />
            <View style={[styles.labelBottomRight, styles.label]}>
                <Text>{editedTask.etat.label}</Text>
            </View>
            <View style={[styles.labelTopRight]}>
                <Image
                    style={styles.avatar}
                    source={require('../assets/avatar.png')}
                />
            </View>
            <TouchableOpacity onPress={saveChanges}>
                <Text>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelChanges}>
                <Text>Annuler</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    task: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        position: 'relative',
    },
    labelBottomRight: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    labelTopRight: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    label: {
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 5,
    },
});

export default TaskDetailDisplay;
