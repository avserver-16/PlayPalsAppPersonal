import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ReviewList = ({ reviews }) => {
  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <ScrollView style={styles.reviewsContainer} contentContainerStyle={{ paddingBottom: 20 }}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
          <Text style={styles.reviewStars}>{renderStars(review.rating)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    marginTop: 120,
    paddingHorizontal: 20,
    backgroundColor:'rgba(0,0,0,0.4)'
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  reviewStars: {
    color: '#FFD700',
    fontSize: 16,
  },
});

export default ReviewList;
