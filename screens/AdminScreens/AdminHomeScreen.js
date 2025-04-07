import react from "react";
import { View,Text ,StyleSheet,Dimensions,ImageBackground} from "react-native";

const { width, height } = Dimensions.get("window");


export default function AdminHomeScreen(){
    return(
        <View style={styles.backgroundWrapper}>
          <ImageBackground
            source={require("./../asset/homescreenBG.png")}
            style={styles.background}
          >
            <ImageBackground
              source={require("./../asset/bgGradientHomescreen.png")}
              style={styles.gradient}
            />
            <ImageBackground
              source={require("./../asset/player.png")}
              style={styles.player}
            />
          </ImageBackground>
        </View>
    )
}

const styles= StyleSheet.create({
    backgroundWrapper: {
    width: "100%",
    height: height, // Ensures full-screen background
  },

  background: {
    width: "100%",
    height: "104%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "104%",
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
})