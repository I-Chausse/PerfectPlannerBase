import { StyleSheet, Image, View } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo_no_bg.png")}
        style={styles.logo}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 100,
    borderColor: "#c48820",
    borderWidth: 5,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Logo;
