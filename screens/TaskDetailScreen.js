import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditableText from '../components/editableFields/EditableText';
import { users } from '../data/users';
import { taches } from '../data/taches';
import { Ionicons } from '@expo/vector-icons';

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
        navigation.navigate('UserSelectionScreen', { users: users, task: editedTask, handleSave: handleSave });
    };
    const navigateToStatusSelection = () => {
        navigation.navigate('StatusSelectionScreen', { task: editedTask, handleSave: handleSave });
    };

    return (
        <View style={styles.task}>
            <View style={styles.taskCard}>
                <View style={styles.title}>
                    <EditableText value={editedTask.nom} onSave={(value) => handleSave('nom', value)} label="Titre"/>
                </View>
                <View style={styles.description}>
                    <EditableText value={editedTask.description} onSave={(value) => handleSave('description', value)} label="Description" />
                </View>
                <View style={styles.customSelectContainer}>
                    <TouchableOpacity onPress={navigateToUserSelection} style={styles.avatarContainer}>
                        {editedTask.userId && (
                            <View style={styles.avatarSecondContainer}>
                                <Image
                                style={styles.avatar}
                                source={avatarImages[users.find((user) => user.id === editedTask.userId).avatar]}
                                />
                                <Text style={styles.userName}>{users.find((user) => user.id === editedTask.userId).prenom.charAt(0) + '.'} {users.find((user) => user.id === editedTask.userId).nom}</Text>
                                <Ionicons name="create-outline" size={22}/>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToStatusSelection} style={styles.statusContainer}>
                        <Text style={styles.statusText}>Statut: </Text>
                        <Text style={styles.statusLabel}>{editedTask.etat.label}</Text>
                        <Ionicons name="create-outline" size={22}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
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
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    task: {
        padding: 10,
        borderTopWidth: 5,
        borderTopColor: '#949494',
        position: 'relative',
        flex: 1,
        backgroundColor: '#034d7b',
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    label: {
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#c48820',
        boxShadow: '3px 3px 2px 1px rgba(255, 255, 255, 0.2)',
    },
    title: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,

    },
    customSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        rowGap: 10,
    },
    avatarSecondContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    userName: {
        marginLeft: 10,
        marginRight: 10,
    },
    statusText: {
        fontWeight: 'bold',
    },
    statusLabel: {
        marginLeft: 10,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        position: 'absolute', 
        bottom: 20, width: 
        '100%'
    },
    
});

export default TaskDetailScreen;
