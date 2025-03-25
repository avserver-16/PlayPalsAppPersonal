import React, { useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet, Dimensions } from "react-native";
import Background from "./Background";

const { width, height } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Background>
      <View style={styles.centeredText}>
        <Text style={styles.title}>PlayPals</Text>
      </View>

      <View style={styles.backgroundWrapper}>
        <ImageBackground source={require("./asset/image.png")} style={styles.background}>
          <ImageBackground source={require("./asset/bgGradientHomescreen.png")} style={styles.gradient} />
          <ImageBackground source={require("./asset/player.png")} style={styles.player} />
        </ImageBackground>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontFamily: "Kanit_400Regular",
    fontWeight: "600",
    fontSize: 70,
  },
  backgroundWrapper: {
    width: "100%",
    height: height, 
  },
  background: {
    width: "100%",
    height: "104.7%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 2,
  },
  player: {
    position: "absolute",
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: "contain",
    alignSelf: "center",
    top: "25%",
    zIndex: 3,
  },
});

export default Welcome;
