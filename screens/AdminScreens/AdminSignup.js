import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Background from "./../Background";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native"; // Make sure Alert is imported




export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orgName, setOrgName] = useState("");
  const [gender, setGender] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;



  const bFunc = async (name, email, password, dob, gender, city) => {
    try {

      const formattedDob = dob ? new Date(dob).toISOString() : null;

      // Validate before sending request
      if (dob && isNaN(new Date(dob).getTime())) {
        Alert.alert("Error", "Invalid date format. Please select a valid date.");
        return;
      }

      const response = await fetch("https://playpals-l797.onrender.com/turf/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, password, dob: formattedDob, gender, city,
          phoneNumber: '9999999999',
          ownerType: 'INDIVIDUAL',
          turfName: "Default Turf Name",
          turfLocation: "Default Location"
        }),
      });
      const text = await response.text();
      console.log("Raw Response:", text);

      // Parse response safely
      try {
        const data = JSON.parse(text);
        Alert.alert(data.message ? "Success" : "Error", data.message || "Registration failed");
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };





  function handleSubmit() {
    
    if (!name || !email || !password) {
      setFormError("All fields must be filled out.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters and include at least one letter and one number.");
      return;
    } else {
      setPasswordError("");
    }
    setFormError("");
    bFunc(name, email, password, dob, gender, city);
    navigation.navigate("AdminLogin");

  }

  return (
    <Background >
      <ImageBackground source={require('./../asset/Cricket.png')}
        style={{
          flex: 1,
          height: 720,
          width: 720,
          position: 'absolute',
          bottom: 0,
          opacity: 0.05,
          right: -30, zIndex: 0
        }}></ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View
          style={{
            height: 560,
            width: 300,
            position: 'absolute',
            backgroundColor: '#ffffff0a',
            opacity: 1,
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#ffffff80',
            justifyContent: 'center',
            alignItems: 'center',
            top: 100
          }}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail} />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword} />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber} />

          <TextInput
            style={styles.input}
            placeholder="Name of Organization"

            value={orgName}
            onChangeText={setOrgName} />

          {formError ? <Text style={styles.error}>{formError}</Text> : null}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>

  );
}



const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 100,
    width: 300,
    //alignItems: "center",
    //justifyContent:'center'
  },
  title: {
    fontSize: 28,
    //fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
    top: -50,
    fontFamily: 'Kanit_400Regular'
  },
  input: {
    width: 230,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#ffffff67",
    borderRadius: 12,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    fontFamily: 'Kanit_400Regular'
  },

  pickerContainer: {
    width: 230,
    height: 60,
    marginBottom: 20,
    backgroundColor: "#ffffff67",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    fontFamily: 'Kanit_400Regular'
  },
  picker: {
    color: "#fff",
    fontSize: 20, fontFamily: 'Kanit_400Regular'
  },
  dateText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    lineHeight: 50, fontFamily: 'Kanit_400Regular'
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Kanit_400Regular'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
    fontFamily: 'Kanit_400Regular'
  },
  submitButton: {
    backgroundColor: "#0091ff",
    borderRadius: 8,
    width: 300,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    top: 530,
    right: 100
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: 'Kanit_400Regular', fontSize: 24
  },
});