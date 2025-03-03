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
        <Text style={styles.text}>
          <Text style={styles.textBold}>{label}</Text>
          : {localValue}
        </Text>
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
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  text: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default EditableField;
