import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MainStyles from '../utils/styles/MainStyles';

const AvatarSelectionScreen = ({ route }) => {
    const { handleSave } = route.params;

    const avatarImages = {
        "avatar1.png": require('../assets/avatar1.png'),
        "avatar2.png": require('../assets/avatar2.png'),
        "avatar3.png": require('../assets/avatar3.png'),
        "avatar4.png": require('../assets/avatar4.png'),
        "avatar5.png": require('../assets/avatar5.png'),
    };

    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        handleSave('avatar', avatar);
    };


    return (
        <View style={MainStyles.container}>
            <View style={[MainStyles.mainCard, MainStyles.flatContainer]}>
                <FlatList
                    data={Object.keys(avatarImages)}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
                            <Image source={avatarImages[item]} style={styles.avatar} />
                            {selectedAvatar === item && <Text style={styles.selected}>Selected</Text>}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={3}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#034d7b',
        padding: 10,

    },
    avatar: {
        width: 80,
        height: 80,
        margin: 10,
        borderWidth: 1,
        borderRadius: 50,
    },
    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
    }
});

export default AvatarSelectionScreen;