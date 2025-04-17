import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewList from "./components/ReviewList";

export default function RentalReview() {
  const navigation = useNavigation();

  const rentalReviews = [
    { id: 1, name: "Nisha", text: "Clean and spacious rental area.", rating: 5 },
    { id: 2, name: "Karan", text: "Affordable and well-managed.", rating: 4 },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./asset/turfBG.png")}
        style={styles.background}
      />

      <View style={styles.overlay}>
      <View style={styles.topButtons}>
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.buttonBox}
  >
    <Text style={styles.buttonText}>← Back</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.ReviewbuttonBox}
    onPress={() => navigation.navigate("PostNewRentalReview")}
  >
    <Text style={styles.buttonText}>New Review</Text>
  </TouchableOpacity>
</View>


        <ReviewList reviews={rentalReviews} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: { flex: 1 },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
  },
  topButtons: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  buttonBox: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  ReviewbuttonBox: {
    backgroundColor: "rgba(34, 139, 34, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
