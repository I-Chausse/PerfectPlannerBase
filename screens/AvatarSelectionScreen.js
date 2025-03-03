import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Avatar</Text>
            <FlatList
                data={Object.keys(avatarImages)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
                        <Image source={avatarImages[item]} style={styles.avatar} />
                        {selectedAvatar === item && <Text style={styles.selected}>Selected</Text>}
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                horizontal
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AvatarSelectionScreen;