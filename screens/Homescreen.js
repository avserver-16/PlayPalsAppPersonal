import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const sports = [
  { id: "1", name: "Cricket", image: require("./asset/Cricket.png") },
  { id: "2", name: "Football", image: require("./asset/Football.png") },
  { id: "3", name: "Badminton", image: require("./asset/Badminton.png") },
];

const gears = [
  { id: "4", name: "Badminton Racket", image: require("./asset/Badminton.png") },
  { id: "5", name: "Cricket Bat", image: require("./asset/Cricket.png") },
  { id: "6", name: "Football Gloves", image: require("./asset/Football.png") },
];

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Bar with Menu & Account Icon */}
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.menuRow}>
          {/* Drawer Menu Icon */}
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>

          {/* Account Icon */}
          <TouchableOpacity
            style={styles.accountIcon}
            onPress={() => navigation.navigate("UserAccount")} // Replace with navigation to Profile screen
          >
            <Ionicons name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Background Images */}
        <View style={styles.backgroundWrapper}>
          <ImageBackground source={require("./asset/image.png")} style={styles.background}>
            <ImageBackground source={require("./asset/bgGradientHomescreen.png")} style={styles.gradient} />
            <ImageBackground source={require("./asset/player.png")} style={styles.player} />
          </ImageBackground>
        </View>

        {/* Sports Text Positioned Separately */}
        <View style={styles.sportsTextContainer}>
          <Text style={styles.sportsText}>Sports</Text>
        </View>

        {/* Sports Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.carouselContainer}>
            <View style={styles.pickPlayRepeatCard}>
              <Text style={styles.pickPlayRepeatText}>PICK</Text>
              <Text style={styles.pickPlayRepeatText}>PLAY</Text>
              <Text style={styles.pickPlayRepeatText}>REPEAT</Text>
            </View>
            <Carousel
              loop
              width={width * 0.7}
              height={200}
              autoPlay={false}
              data={sports}
              scrollAnimationDuration={800}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <ImageBackground source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardText}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>

        {/* Gear Section */}
        <View style={[styles.sectionContainer, styles.lastSection]}>
          <View style={[styles.sectionTitleContainer, { alignSelf: "flex-end" }]}>
            <Text style={styles.sectionTitle}>Gear</Text>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width * 0.6}
              height={200}
              autoPlay={false}
              data={gears}
              scrollAnimationDuration={800}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <ImageBackground source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardText}>{item.name}</Text>
                </View>
              )}
            />
            <View style={styles.pickPlayRepeatCard}>
              <Text style={styles.pickPlayRepeatText}>PICK</Text>
              <Text style={styles.pickPlayRepeatText}>PLAY</Text>
              <Text style={styles.pickPlayRepeatText}>REPEAT</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Prevents extra white space
  },

  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 20,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  menuIcon: {},

  accountIcon: {},

  backgroundWrapper: {
    width: "100%",
    height: height, // Ensures full-screen background
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

  sportsTextContainer: {
    position: "relative",
    marginTop: -15, // Moves text slightly up
    backgroundColor: "white",
    paddingVertical: 10,
    paddingRight: 10,
    borderTopRightRadius: 15,
    alignSelf: "flex-start",
    zIndex: 4,
    paddingLeft: 10,
  },
  sportsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  sectionContainer: {
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 0,
  },

  lastSection: {
    paddingBottom: 0,
  },

  sectionTitleContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },

  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  pickPlayRepeatCard: {
    backgroundColor: "#111",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    height: 200,
    justifyContent: "center",
    marginRight: 10,
  },
  pickPlayRepeatText: { fontSize: 18, fontWeight: "bold", color: "white" },

  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: width * 0.4,
    height: 200,
  },
  cardImage: { width: 100, height: 100, resizeMode: "contain" },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
