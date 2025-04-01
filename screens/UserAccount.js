import React, { useState,useEffect } from "react";
import {
  View,
  Text,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const UserAccount = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [dob, setDob] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);
  const [token, setToken] = useState(null);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [city,setCity]=useState("");
  
  const capitalizeWords = (sentence) => {
    if (!sentence) return "";
    return sentence
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          console.error("No token found");
          return;
        }

        setToken(token);
        console.log("Retrieved token:", storedToken);

        const response = await fetch("https://playpals-l797.onrender.com/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`, // ✅ Use the correct token
          },
        });

        const data = await response.json();
        if (response.ok) {
          const formatDOB = (dob) => {
            return new Date(dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            });
          }
          console.log(data.user)
          data.user.profilePhoto=profileImage;
          setName(data.user.name);
          setEmail(data.user.email);
          setGender(data.user.gender)
          setDob(formatDOB(data.user.dob))
          setCity(data.user.city)
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);





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
      <Image
        source={require("./asset/cricketBat.png")} // Update the path if needed
        style={styles.cricketBat}
      />
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
          <Text style={styles.welcomeText}>Welcome {name}</Text>
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
            <Text
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="black"
            >{name}</Text>
            <Text
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="black"
            >{email}</Text>

            <View style={styles.row}>
              <View style={styles.dropdownContainer}>
                <Text style={{left:10}}>{capitalizeWords(gender)}</Text>
              </View>

              <TouchableOpacity
                style={[styles.input, styles.dateInput]}
                onPress={showDatePicker}
              >
                <Text style={{ color: dob ? "black" : "gray" }}>
                  {dob}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={styles.input}
              placeholder="City"
              placeholderTextColor="black"
            >{city}</Text>

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
  cricketBat: {
    position: "absolute",
    top: "20%", // Adjust to position it correctly
    left: "-10%", // Center it
    width: 500, // Adjust size as needed
    height: 600, // Adjust size as needed
    opacity: 0.4, // Lower opacity for subtle effect
    transform: [{ rotate: "-15deg" }], // Rotate ONLY the bat
    zIndex: 0, // Send it behind all other UI elements
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
  input: { backgroundColor: "white", padding: 12, borderRadius: 8 ,textAlign:'left'},
  row: { flexDirection: "row", justifyContent: "space-between" },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    justifyContent:'center'
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
    marginTop: 15,
  },
  showMoreText: { textAlign: "center", color: "white", marginTop: 10 },
  tokenText: { color: "black", fontSize: 14, fontWeight: "bold" },
  tokenContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
});

export default UserAccount;
