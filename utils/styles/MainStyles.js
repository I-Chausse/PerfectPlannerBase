import { StyleSheet } from "react-native";
import Colors from "./Colors";

const MainStyles = StyleSheet.create({
  // display
  container: {
    flex: 1,
    backgroundColor: Colors.backGround,
    alignItems: "center",
  },
  mainCard: {
    backgroundColor: Colors.mainWhite,
    borderRadius: 5,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  flatContainer: {
    width: "90%",
    marginTop: 10,
  },

  // inputs
  input: {
    backgroundColor: Colors.mainWhite,
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: Colors.mainOrange,
  },
  inputLabel: {
    color: Colors.mainGray,
    fontSize: 12,
    alignSelf: "start",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -10,
  },
  inputLabelContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "start",
  },
  selectInput: {
    borderBottomWidth: 1,
    borderColor: Colors.mainBlue,
  },

  //btns
  mainBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: Colors.accentBlue,
  },
  mainBtnText: {
    color: Colors.mainWhite,
  },
  secBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: Colors.secondaryBlue,
    borderWidth: 0.5,
    borderColor: Colors.mainBlue,
  },
  secBtnText: {
    color: Colors.mainBlack,
  },

  // avatars
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  //text
  bold: {
    fontWeight: "bold",
  },

  // margins
  mx10: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default MainStyles;
