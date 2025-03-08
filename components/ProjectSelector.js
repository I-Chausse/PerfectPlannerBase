import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

import { projets } from "../data/projets";
import Colors from "../utils/styles/Colors";

const ProjectSelector = ({ selectedProject, onProjectChange }) => {
  return (
    <View style={styles.pickerView}>
      <Picker
        selectedValue={selectedProject.nom}
        onValueChange={(itemValue) => {
          const project = projets.find((projet) => projet.nom === itemValue);
          onProjectChange(project);
        }}
      >
        {projets.map((projet) => (
          <Picker.Item key={projet.nom} label={projet.nom} value={projet.nom} />
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

export default ProjectSelector;
