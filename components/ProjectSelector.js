import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import { projets } from '../data/projets';

const ProjectSelector = ({ selectedProject, onProjectChange }) => {
    return (
        <View style={styles.pickerView}>
            <Picker 
            selectedValue = {selectedProject.nom}
            onValueChange={(itemValue) => {
                const project = projets.find(projet => projet.nom === itemValue);
                onProjectChange(project);
              }}
            >
            {projets.map((projet) => (
                <Picker.Item key={projet.nom} label={projet.nom} value={projet.nom} />
            ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
  pickerView: {
    borderWidth: 2,
    borderColor: '#c48820',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
  }
});

export default ProjectSelector;