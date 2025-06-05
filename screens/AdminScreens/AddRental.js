import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BG2 from "../BG2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function AddRental() {
  const navigation = useNavigation();

  const [rentalName, setRentalName] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [images, setImages] = useState([]); // not used in request body for now

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets || [result];
      setImages([...images, ...selected]);
    }
  };

  const submitrental = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) {
        console.error("No token found");
        return;
      }

      const payload = {
        name: rentalName,
        category: rentalType,
        description,
        pricePerHour: Number(pricePerHour),
        quantity: parseInt(quantity),
        ownerType: "TURFOWNER",
        // photos: [], // For now skipped. Add after FormData implementation
      };

      const response = await fetch("https://playpals-l797.onrender.com/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);

      if (response.ok) {
        console.log("Success:", data);
        navigation.goBack();
      } else {
        console.error("Server error:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error submitting rental:", error);
    }
  };

  return (
    <BG2>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Rental</Text>

        <View style={styles.formCard}>
          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.label}>Rental Name</Text>
              <TextInput style={styles.input} value={rentalName} onChangeText={setRentalName} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Type</Text>
              <TextInput style={styles.input} value={rentalType} onChangeText={setRentalType} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Price per Hour</Text>
              <TextInput
                style={styles.input}
                value={pricePerHour}
                onChangeText={setPricePerHour}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Photos (preview only)</Text>
              <View style={styles.imageRow}>
                {images.map((photo, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: photo.uri }} style={styles.turfImage} />
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      onPress={() => {
                        const updated = images.filter((_, i) => i !== index);
                        setImages(updated);
                      }}
                    >
                      <Ionicons name="close-circle" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity onPress={pickImages}>
                  <Ionicons name="add-circle-outline" size={40} color="#66bb6a" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 24, marginBottom: 40 }}>
              <TouchableOpacity style={styles.submitButton} onPress={submitrental}>
                <Text style={styles.submitText}>Submit Rental</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </BG2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 45,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  formCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    width: width * 0.9,
  },
  form: {
    paddingBottom: 80,
  },
  formSection: {
    marginBottom: 16,
  },
  label: {
    color: "white",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  turfImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imageWrapper: {
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#66bb6a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
