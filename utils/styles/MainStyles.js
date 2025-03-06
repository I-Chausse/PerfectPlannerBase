import { StyleSheet } from 'react-native';
import Colors from './Colors';

const mainStyles = StyleSheet.create({
    // display
    container: {
        flex: 1,
        backgroundColor: Colors.backGround,
        alignItems: 'center',
      },
      mainCard: {
        backgroundColor: Colors.mainWhite,
        borderRadius: 5,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
      },

      // inputs
      input: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderBottomWidth: 1,
        borderColor: '#c48820',
      },
      inputLabel: {
        color: Colors.mainGray,
        fontSize: 12,
        alignSelf: 'start',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: -10,
      },
      inputLabelContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'start',
      },
      
      //btns
      mainBtn: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        backgroundColor: Colors.accentBlue,
      },
        mainBtnText: {
            color: Colors.mainWhite,
        },
});

export default mainStyles;