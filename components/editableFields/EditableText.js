import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditableField = ({ value, onSave, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onSave(localValue);
    setIsEditing(false);
  };

  return (
    <View style={styles.fieldContainer}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={localValue}
          onChangeText={setLocalValue}
        />
      ) : (
        <Text style={styles.text}>{label}: {localValue}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={isEditing ? handleSave : () => setIsEditing(true)}>
        <Ionicons name={isEditing ? "checkmark-circle" : "create-outline"} size={22}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  text: {
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 5,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightblue',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditableField;
