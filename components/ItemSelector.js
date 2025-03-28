import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

import MainStyles from "../utils/styles/MainStyles";

const ItemSelector = ({ label, selectedItem, onItemChange, items }) => {
  return (
    <View style={[MainStyles.inputContainer, MainStyles.selectInput]}>
      <Text style={MainStyles.inputLabel}>{label}</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => {
          const item = items.find((item) => item.id === itemValue);
          onItemChange(item);
        }}
      >
        {items.map((item) => (
          <Picker.Item key={item.code} label={item.label} value={item.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemSelector;
