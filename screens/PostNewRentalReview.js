import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewForm from "./components/ReviewForm";

export default function PostNewRentalReview() {
  const navigation = useNavigation();

  const handleReviewSubmit = (reviewData) => {
    console.log("Submitted Review:", reviewData);

    // TODO: Save to API or state

    // Go back or show success message
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ReviewForm title="Post a Rental Review" onSubmit={handleReviewSubmit} />
    </View>
  );
}
