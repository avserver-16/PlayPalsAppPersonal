import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../Background";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleConfirm = async () => {
    if (!selectedRole) {
      Alert.alert("Select Role", "Please select a role to continue.");
      return;
    }

    await AsyncStorage.setItem("userRole", selectedRole);

    if (selectedRole === "admin") {
      navigation.navigate("AdminLogin");
    } else {
      navigation.navigate("Login");
    }
  };


  return (
    <Background>
      <View style={{ width: '100%', height: 280, alignSelf: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            color: "#B8F4AA",
            fontFamily: "KanitLight",
            fontSize: 75,
            zIndex: 1,
            alignSelf: 'center',
            marginTop: 24
          }}
        >
          Play Pals
        </Text>
        <ImageBackground
          source={require('./role.png')}
          style={{
            height: 230,
            width: 180,
            zIndex: 10,
            alignSelf: 'center',
            top: -70
          }}></ImageBackground>
      </View>
      <View
        style={{
          height: height * 0.22,
          width: width * 0.85,
          backgroundColor: "#B8F4AA0f",
          opacity: 1,
          borderRadius: 32,
          padding: 16,
          //justifyContent:'center',
          alignItems: "center",
          paddingHorizontal: 24,
          borderWidth:0.8,
          borderColor:'rgba(184, 244, 170,0.1)',
          top:-39
        }}
      >
        <Text style={styles.title}>Select Your Role</Text>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setSelectedRole("user")}
        >
          <MaterialIcons
            name={
              selectedRole === "user" ? "radio-button-checked" : "radio-button-unchecked"
            }
            size={28}
            color="#66bb6a"
            borderRadius={20}
          />
          <Text style={styles.checkboxLabel}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setSelectedRole("admin")}
        >
          <MaterialIcons
            name={
              selectedRole === "admin" ? "radio-button-checked" : "radio-button-unchecked"
            }
            size={28}
            color="#66bb6a"
          />
          <Text style={styles.checkboxLabel}>Turf Owner</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={{
        backgroundColor: "black",
        width: 320,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        top:140,
         borderWidth:1,
          borderColor:'rgba(184, 244, 170,0.15)',
      }} onPress={handleConfirm}>
        <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 18, color: '#B8F4AA' }}>Confirm </Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    color: "#B8F4AA",
    fontFamily: "KanitLight",
    marginBottom: 20,
    top: 8,
    alignSelf: 'flex-start'
  },
  buttonContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    alignSelf: 'flex-start',

    top: 8
  },
  checkboxLabel: {
    fontSize: 22,
    marginLeft: 10,
    color: 'white',
    fontFamily: "KanitLight",
    width: width * 0.26,
    borderRadius: 10,
    paddingLeft: 5,
    width: 200,
    alignSelf: 'center',
  },
  confirmBtn: {
    marginTop: 80,
    backgroundColor: "#0091ff",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.4
  },
});

export default RoleSelectionScreen;
