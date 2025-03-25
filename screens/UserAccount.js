import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const { width } = Dimensions.get("window");

const UserAccount = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedGames, setSelectedGames] = useState([]); 

  const bookings = [
    { id: 1, name: "Turf A", type: "Turfs", date: "01/03/2025", seats: 5 },
    {
      id: 2,
      name: "Football Rental",
      type: "Items",
      date: "15/02/2025",
      number: 2,
    },
    { id: 3, name: "Turf B", type: "Turfs", date: "20/02/2025", seats: 3 },
    {
      id: 4,
      name: "Badminton Racket",
      type: "Items",
      date: "10/02/2025",
      number: 1,
    },
  ];

  const filteredBookings = bookings.filter((booking) =>
    selectedFilter === "All" ? true : booking.type === selectedFilter
  );

  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // supposed to use MediaTypeOptions.Images but this is not working
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(moment(date).format("DD/MM/YYYY"));
    hideDatePicker();
  };

  const toggleGameSelection = (game) => {
    setSelectedGames((prevGames) =>
      prevGames.includes(game)
        ? prevGames.filter((g) => g !== game)
        : [...prevGames, game]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home-outline" size={32} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.welcomeText}>Welcome User</Text>
          <TouchableOpacity style={styles.profileIcon} onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Ionicons name="camera-outline" size={48} color="white" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="black"
            />

            <View style={styles.row}>
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              <TouchableOpacity
                style={[styles.input, styles.dateInput]}
                onPress={showDatePicker}
              >
                <Text style={{ color: dob ? "black" : "gray" }}>
                  {dob ? dob : "Date of Birth"}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
            />

            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="black"
            />

            <Text style={styles.sectionTitle}>Game Preferences</Text>
            {["Cricket", "Football", "Badminton"].map((game) => (
              <TouchableOpacity
                key={game}
                style={styles.checkboxContainer}
                onPress={() => toggleGameSelection(game)}
              >
                <Ionicons
                  name={
                    selectedGames.includes(game) ? "checkbox" : "square-outline"
                  }
                  size={24}
                  color="white"
                />
                <Text style={styles.checkboxText}>{game}</Text>
              </TouchableOpacity>
            ))}

            {selectedGames.length > 0 && (
              <Text style={styles.selectedGamesText}>
                Selected: {selectedGames.join(", ")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.bookingsContainer}>
          <Text style={styles.sectionTitle}>Previous Bookings</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedFilter}
              onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Turfs" value="Turfs" />
              <Picker.Item label="Items" value="Items" />
            </Picker>
          </View>

          {filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>{booking.name}</Text>
              <Text style={styles.bookingSubText}>
                Date: {booking.date}{" "}
                {booking.type === "Turfs"
                  ? `Seats booked: ${booking.seats}`
                  : `Number: ${booking.number}`}
              </Text>
            </View>
          ))}

          <TouchableOpacity>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  scrollContainer: { paddingBottom: 40 },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "white" },
  profileIcon: {
    backgroundColor: "#222",
    borderRadius: 50,
    padding: 10,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: { width: 70, height: 70, borderRadius: 50 },
  detailsContainer: {
    backgroundColor: "rgba(0, 50, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  inputGroup: { gap: 10 },
  input: { backgroundColor: "white", padding: 12, borderRadius: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  dateInput: { flex: 1, justifyContent: "center", paddingLeft: 12 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  checkboxText: { color: "white", marginLeft: 10, fontSize: 16 },
  selectedGamesText: { color: "white", marginTop: 10 },
  bookingsContainer: {
    backgroundColor: "rgba(0, 50, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  bookingItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop:15
  },
  showMoreText: { textAlign: "center", color: "white", marginTop: 10 },
});

export default UserAccount;
