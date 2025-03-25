import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Background from "./Background";

export default function OtpVerification({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRoute();
  //const navigation = useNavigation();

  const { email, name } = route.params;

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const dummyOtp = "1234";

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const verifyOtp = () => {
    const otpString = otp.join("");
    if (otpString === dummyOtp) {
      setLoading(true);
      navigation.navigate('LangSport');
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", ""]);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Background>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.description}>
          Please enter the OTP sent to {email}
        </Text>

        \        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder="-"
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              textAlign="center"
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    //fontWeight: "bold",
    color: "#fff",
    marginBottom: 20, fontFamily: 'Kanit_400Regular'
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center", fontFamily: 'Kanit_400Regular'
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 10, fontFamily: 'Kanit_400Regular'
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: 'Kanit_400Regular'
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 20, fontFamily: 'Kanit_400Regular'
  },
  loader: {
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 1,
  },
});
