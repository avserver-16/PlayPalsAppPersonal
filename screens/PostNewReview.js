import React from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewForm from "./components/ReviewForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostNewReview() {
  const navigation = useNavigation();

  const handleReviewSubmit = async (reviewData) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert("Error", "User not authenticated. Token missing.");
        return;
      }

      const response = await fetch("https://playpals-l797.onrender.com/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // ✅ Include the token here
        },
        body: JSON.stringify({
          review: reviewData.text,
          ratings: reviewData.rating,
        }),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);
      Alert.alert(data.message ? "Success" : "Error", data.message || "Review submission failed");

      navigation.goBack();
    } catch (error) {
      console.error("Submission Error:", error);
      Alert.alert("Error", "Something went wrong while submitting your review.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ReviewForm title="Post a Turf Review" onSubmit={handleReviewSubmit} />
    </View>
  );
}
