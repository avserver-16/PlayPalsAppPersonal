import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function AdminHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.backgroundWrapper}>
      <ImageBackground
        source={require("./../asset/homescreenBG.png")}
        style={styles.background}
      >
        <ImageBackground
          source={require("./../asset/bgGradientHomescreen.png")}
          style={styles.gradient}
          resizeMode="cover"
        />
        <ImageBackground
          source={require("./../asset/player.png")}
          style={styles.player}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row-reverse" }}>
          <TouchableOpacity
            style={styles.accountIcon}
            onPress={() => navigation.navigate("AdminProfile")}
          >
            <Ionicons name="person-circle-outline" size={35} color="white" />
          </TouchableOpacity>
        </View>
        {/* Bottom Gradient Cards */}
        <View style={styles.bottomCards}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdminTurf")}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.cardText}>Turfs</Text>
              <ImageBackground
                source={require("./../asset/Cricket.png")}
                style={styles.cardImage}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AdminRental")}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.cardText}>Rentals</Text>
              <ImageBackground
                source={require("./../asset/FBgloves.png")}
                style={styles.cardImage}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const CARD_WIDTH = width * 0.4;
const CARD_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
  backgroundWrapper: {
    width: "100%",
    height: height,
  },
  background: {
    width: "100%",
    height: "104%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "104%",
    zIndex: 2,
  },
  player: {
    position: "absolute",
    width: width * 0.8,
    height: height * 0.5,
    alignSelf: "center",
    top: "20%",
    zIndex: 3,
  },
  bottomCards: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    zIndex: 4,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 1.3,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", 
    backgroundColor: "#fff",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Kanit_400Regular",
  },
  cardImage: { width: 100, height: 100, resizeMode: "contain" },
  accountIcon: {
    color: "white",
    marginTop: 50,
    zIndex: 2,
    marginRight: 20,
  },
});
