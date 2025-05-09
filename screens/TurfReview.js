import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ReviewList from "./components/ReviewList";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get("window");

export default function TurfReview() {
  const navigation = useNavigation();
  const route=useRoute();
  const { reviewData } = route.params || {};
  console.log(reviewData.id)
  const turfReviews = [
    {
      id: 1,
      name: "Aman",
      text: "Great turf! Well maintained and clean.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya",
      text: "Had a fun time with friends. Lights are good.",
      rating: 4,
    },
    {
      id: 3,
      name: "Rahul",
      text: "Bit crowded in the evenings but worth it.",
      rating: 4,
    },
  ];

  useEffect(() => {
    const fetchReview = async () => {
      console.log("Fetching Reviews...");
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          console.log("No Token Found");
          return;
        }

        const response = await fetch(`https://playpals-l797.onrender.com/review/turf/${reviewData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
          }
        });

        const data = await response.json();
        console.log(data[0].comment)
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, []);




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
            onPress={() => navigation.navigate("PostNewReview")}
          >
            <Text style={styles.buttonText}>New Review</Text>
          </TouchableOpacity>
        </View>

        <ReviewList reviews={turfReviews} />
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
    backgroundColor: "#66bb6a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
