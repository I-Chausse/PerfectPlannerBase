import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

import { users } from "../data/users";
import Colors from "../utils/styles/Colors";

const UserSelector = ({ selectedUser, onUserChange }) => {
  return (
    <View style={styles.pickerView}>
      <Picker
        selectedValue={selectedUser.id}
        onValueChange={(itemValue) => {
          const user = users.find((user) => user.id === itemValue);
          onUserChange(user);
        }}
      >
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.nom} value={user.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    borderWidth: 2,
    borderColor: Colors.mainOrange,
    backgroundColor: Colors.mainWhite,
    margin: 10,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
  },
});

export default UserSelector;
