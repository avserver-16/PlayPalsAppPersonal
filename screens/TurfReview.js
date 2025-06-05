import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ReviewList from "./components/ReviewList";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function TurfReview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reviewData } = route.params || {};
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      console.log("Fetching Reviews...");
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          console.log("No Token Found");
          return;
        }
console.log(reviewData.id)
        const response = await fetch(
          `https://playpals-l797.onrender.com/review/turf/${reviewData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        const data = await response.json();
        console.log("Fetched Reviews: ", data);
        setReviews(data.reviews); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
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

 {loading ? (
  <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 100 }} />
) : Array.isArray(reviews) && reviews.length > 0 ? (
  reviews.map((items, index) => (
    <View key={index} style={{
      width: '90%',
      backgroundColor: '#fff',
      alignSelf: 'center',
      padding: 16,
      marginBottom: 20,
      borderRadius: 25,
      top: 120,
    }}>
      <Image
        source={{ uri: items.user.profilePhoto }}
        style={{
          height: 50,
          width: 50,
          position: "absolute",
          top: 20,
          left: 10,
          borderRadius: 50
        }}
      />
      <Text style={{
        color: 'black',
        fontSize: 20,
        fontFamily: 'PL',
        left: 55,
        top: 0
      }}>{items.user.name}</Text>
      <Text style={{
        color: 'black',
        fontSize: 14,
        fontFamily: 'PL',
        left: 55,
        marginTop: 4
      }}>{items.comment}</Text>
    </View>
  ))
) : (
  <Text style={{ color: 'white', textAlign: 'center', top: 120 }}>
    No reviews found.
  </Text>
)}

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
  ReviewbuttonBox: {
    backgroundColor: "rgba(34, 139, 34, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
