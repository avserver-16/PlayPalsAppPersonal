
import React, { useState, useEffect } from "react";
//import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [adminName,setAdminName] = useState("");
  const [email,setEmail] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [token, setToken] = useState("");

  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          console.error("No token found");
          return;
        }

        setToken(storedToken);
        console.log("Retrieved token:", storedToken);

        const response = await fetch("https://playpals-l797.onrender.com/owner/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data,"NAME:",data.owner.phoneNumber);
          setAdminName(data.owner.name)
          setEmail(data.owner.email)
          setContactNumber(data.owner.phoneNumber)
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../asset/cricketBat.png")}
        style={styles.cricketBat}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminHomeScreen")}>
          <Ionicons name="home-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.welcomeText}>Welcome {adminName}</Text>
          <TouchableOpacity style={styles.profileIcon} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="camera-outline" size={48} color="white" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.readOnlyText}>{adminName}</Text>
            <Text style={styles.readOnlyText}>{email}</Text>
            <Text style={styles.readOnlyText}>{contactNumber}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  cricketBat: {
    position: "absolute",
    top: "20%",
    left: "-10",
    width: 500,
    height: 600,
    opacity: 0.4,
    transform: [{ rotate: "-15deg" }],
    zIndex: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 70,

    paddingBottom: 15,
    paddingBottom:15

  },
  readOnlyText:{fontFamily:'PL',fontSize:16,backgroundColor:'white',padding:10,width:200,borderRadius:18},
  scrollContainer: { paddingBottom: 40 },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontFamily:'PL',
    color: "white",
  },
  profileIcon: {
    backgroundColor: "rgba(0, 50, 0, 0.8)",
    borderRadius: 50,
    padding: 10,
    width: 105,
    height: 105,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 50, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
   fontFamily:'PL',
    color: "white",
    marginBottom: 10,
  },
  inputGroup: {
    gap: 10,
    fontFamily:'PL'
  },
 
    formSection: {
      paddingHorizontal: 25,
      paddingTop: 30, fontFamily:'PL'
    },
    label: {
      fontSize: 14,
      color: "#334155",
      marginBottom: 4,
      fontWeight: "600",
    },
    input: {
      backgroundColor: "#e2e8f0",
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
      fontSize: 16,
      color: "#0f172a",
    },


  saveButton: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },}
  );
