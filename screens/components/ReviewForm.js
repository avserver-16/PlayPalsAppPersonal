import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReviewForm = ({ title = "Post a Review", onSubmit }) => {

    const navigation = useNavigation();

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!name || !review || rating === 0) {
      Alert.alert("Please fill out all fields and select a rating.");
      return;
    }

    const newReview = {
      name,
      text: review,
      rating,
    };

    onSubmit(newReview);

    // Reset form
    setName("");
    setReview("");
    setRating(0);
  };

  return (
    <View style={styles.container}>
    <ImageBackground
        source={require("./../asset/turfBG.png")}
        style={styles.background}
      />
      <View style={styles.overlay}>
      <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonBox}
          >
            <Text style={styles.buttonText}>← Back</Text>
          </TouchableOpacity>
      <Text style={styles.heading}>{title}</Text>
      <View style={{padding:20}}>
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="black"
      />

      <TextInput
        placeholder="Write your review..."
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
        placeholderTextColor="black"
      />

      <View style={styles.input}>
      <Text style={styles.label}>Rating:</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Text style={[styles.star, rating >= num && styles.starSelected]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  buttonBox: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "white",
    marginTop:50
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: "#ccc",
    marginRight: 10,
  },
  starSelected: {
    color: "#FFD700", // gold
  },
  submitBtn: {
    backgroundColor: "rgba(34, 139, 34, 0.8)", // green
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReviewForm;
