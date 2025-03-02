import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditableText from '../components/editableFields/EditableText';
import { users } from '../data/users';
import { taches } from '../data/taches';

const TaskDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    console.log('## params ##');
    console.log(route);
    const initialTask = route.params?.task
    const [editedTask, setEditedTask] = useState(initialTask);
    const [originalTask, setOriginalTask] = useState(initialTask);


    const avatarImages = {
        "avatar1.png": require('../assets/avatar1.png'),
        "avatar2.png": require('../assets/avatar2.png'),
        "avatar3.png": require('../assets/avatar3.png'),
        "avatar4.png": require('../assets/avatar4.png'),
        "avatar5.png": require('../assets/avatar5.png'),
    };

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

    const navigateToUserSelection = () => {
        navigation.navigate('UserSelectionScreen', { users: users, handleSave: handleSave });
    };

    return (
        <View style={styles.task}>
            <View style={styles.taskCard}>
                <EditableText value={editedTask.nom} onSave={(value) => handleSave('nom', value)} label="Titre" />
                <EditableText value={editedTask.description} onSave={(value) => handleSave('description', value)} label="Description" />
                <View style={[styles.labelBottomRight, styles.label]}>
                    <Text>{editedTask.etat.label}</Text>
                </View>
                <TouchableOpacity onPress={navigateToUserSelection} style={styles.avatarContainer} onSave={(value) => handleSave('userId', value)}>
                    {editedTask.userId && (
                        <Image
                            style={styles.avatar}
                            source={avatarImages[users.find((user) => user.id === editedTask.userId).avatar]}
                        />
                    )}
                    <Text style={styles.selectUserText}>Sélectionner un utilisateur</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={cancelChanges} style={styles.button}>
                    <Text>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveChanges} style={styles.button}>
                    <Text>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskCard: {
        paddingBottom: 50,
    },
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
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    selectUserText: {
        marginLeft: 10,
        color: 'blue',
    },
    label: {
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
});

export default TaskDetailScreen;
