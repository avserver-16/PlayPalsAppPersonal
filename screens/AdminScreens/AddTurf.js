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
import BG2 from "../BG2";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function AddTurf() {
  const [turfName, setTurfName] = useState("");
  const [turfLocation, setTurfLocation] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [turfDescription, setTurfDescription] = useState("");
  const [turfSize, setTurfSize] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [turfGames, setTurfGames] = useState("");
  const [amenities, setAmenities] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [turfPhotos, setTurfPhotos] = useState([]);
  const navigation = useNavigation();

  const pickTurfPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true, // ✅ Add base64
    });

    if (!result.canceled) {
      const selected = result.assets || [result];
      const formattedPhotos = selected.map((asset) => ({
        uri: asset.uri,
        base64: asset.base64,
      }));
      setTurfPhotos([...turfPhotos, ...formattedPhotos]);
    }
  };

  const submitTurf = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) {
        console.error("No token found");
        return;
      }

      const response = await fetch("https://playpals-l797.onrender.com/turf/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          turfName,
          turfLocation,
          registrationNumber,
          contactPersonName,
          contactPersonPhone,
          turfDescription,
          turfSize,
          totalSeats,
          turfGames,
          amenities,
          pricePerPerson,
          turfPhotos: turfPhotos.map((photo) => photo.base64), 
        }),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);

      if (response.ok) {
        console.log("Success:", data);
        navigation.goBack();
      } else {
        console.error("Server error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting turf:", error);
    }
  };

  return (
    <BG2>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Turf</Text>

        <View style={styles.formCard}>
          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
            {/* All input fields */}
            <View style={styles.formSection}>
              <Text style={styles.label}>Turf Name</Text>
              <TextInput style={styles.input} value={turfName} onChangeText={setTurfName} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Location</Text>
              <TextInput style={styles.input} value={turfLocation} onChangeText={setTurfLocation} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Registration Number</Text>
              <TextInput style={styles.input} value={registrationNumber} onChangeText={setRegistrationNumber} />
            </View>

            <View style={styles.formRow}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Turf Size</Text>
                <TextInput style={styles.input} value={turfSize} onChangeText={setTurfSize} />
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Total Seats</Text>
                <TextInput style={styles.input} value={totalSeats} onChangeText={setTotalSeats} />
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Games</Text>
              <TextInput style={styles.input} value={turfGames} onChangeText={setTurfGames} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Amenities</Text>
              <TextInput style={styles.input} value={amenities} onChangeText={setAmenities} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Price per Person</Text>
              <TextInput
                style={styles.input}
                value={pricePerPerson}
                onChangeText={setPricePerPerson}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Contact Person Name</Text>
              <TextInput style={styles.input} value={contactPersonName} onChangeText={setContactPersonName} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Contact Person Phone</Text>
              <TextInput
                style={styles.input}
                value={contactPersonPhone}
                onChangeText={setContactPersonPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                value={turfDescription}
                onChangeText={setTurfDescription}
                multiline
              />
            </View>

            {/* Turf Photos Section */}
            <View style={styles.formSection}>
              <Text style={styles.label}>Turf Photos</Text>
              <View style={styles.imageRow}>
                {turfPhotos.map((photo, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: photo.uri }} style={styles.turfImage} />
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      onPress={() => {
                        const updated = turfPhotos.filter((_, i) => i !== index);
                        setTurfPhotos(updated);
                      }}
                    >
                      <Ionicons name="close-circle" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity onPress={pickTurfPhotos}>
                  <Ionicons name="add-circle-outline" size={40} color="#66bb6a" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 24, marginBottom: 40 }}>
              <TouchableOpacity style={styles.submitButton} onPress={submitTurf}>
                <Text style={styles.submitText}>Submit Turf</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </BG2>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 45 },
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
  form: { paddingBottom: 80 },
  formSection: { marginBottom: 16 },
  label: { color: "white", marginBottom: 6, fontSize: 16 },
  input: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
  },
  formRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  rowItem: { flex: 1 },
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
