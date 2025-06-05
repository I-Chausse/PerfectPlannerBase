import React, { useEffect, useRef, useState } from 'react';
import { getCallback, printCallbacks } from '../utils/CallbackManager';
import { StyleSheet, TextInput, View } from 'react-native';
import MainStyles from '../utils/styles/MainStyles';

const SearchBar = ({ callbackId }) => {
    const [value, setValue] = useState('');
    const callbackRef = useRef(null);
    const callbackRefreshRef = useRef(null);

    useEffect(() => {
        printCallbacks();
        callbackRef.current = getCallback(callbackId);
    }, [callbackId]);

    const handleChangeText = (text) => {
        setValue(text);
        if (callbackRef.current) {
            callbackRef.current(text);
        }
    };

    const styles = StyleSheet.create({
        fullWidth: {
            width: "90%",
            marginBottom: 10
        },
    });

    return (
        <View style={[MainStyles.input, styles.fullWidth]}>
            <TextInput
                placeholder="Rechercher..."
                value={value}
                onChangeText={handleChangeText}
                style={{ padding: 8, width: '100%' }}
            />
        </View>
    );
};

export default SearchBar;