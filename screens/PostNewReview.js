import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewForm from "./components/ReviewForm";

export default function PostNewReview() {
  const navigation = useNavigation();

  const handleReviewSubmit = async(reviewData) => {
  
      const response = await fetch("https://playpals-l797.onrender.com/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review,ratings}),
      });
  
      const text = await response.text();
      console.log("Raw Response:", text);
  
  
      try {
        const data = JSON.parse(text);
        Alert.alert(data.message ? "Success" : "Error", data.message || "Registration failed");
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        Alert.alert("Error", "Invalid response from server.");
      }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ReviewForm title="Post a Turf Review" onSubmit={handleReviewSubmit(revies)} />
    </View>
  );
}
