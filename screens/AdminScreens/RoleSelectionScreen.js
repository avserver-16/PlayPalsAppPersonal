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
      <Text
        style={{
          color: "#B8F4AA",
          fontFamily: "KanitLight",
          fontSize: 75,
          position: "absolute",
          //left: 20,
          top: 150,
          zIndex: 1,
          alignSelf:'center'
        }}
      >
        Play  Pals
      </Text>
      <ImageBackground
              source={require('./role.png')}
              style={{
                height: 230,
                width: 180,
                zIndex: 10,
                top: 170,
                position: 'absolute'
              }}></ImageBackground>

      <View
        style={{
          height: height * 0.3,
          width: width * 0.85,
          position: "absolute",
          backgroundColor: "#B8F4AA0f",
          opacity: 1,
          borderRadius: 50,
      padding:16,
          bottom: 220,
          //justifyContent:'center',
          alignItems: "center",
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
            color="#0091ff"
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
        <TouchableOpacity style={{backgroundColor: "black",
            width: 200,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            position: "absolute",
            top: 290}} onPress={handleConfirm}>
          <Text style={{fontFamily: "Kanit_400Regular", fontSize: 24, color: '#B8F4AA' }}>Confirm →</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30,
    textAlign: "center",
    color: "white",
    fontFamily: "KanitLight",
    marginBottom:20,
    top:20
  },
  buttonContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    alignSelf:'center',
    left:45,
    top:20
  },
  checkboxLabel: {
    fontSize: 22,
    marginLeft: 10,
    color:'white',
    fontFamily:"KanitLight",
    width:width*0.26,
    borderRadius:10,
    paddingLeft:5,
    width:200,
    alignSelf:'center',
  },
  confirmBtn: {
    marginTop: 80,
    backgroundColor: "#0091ff",
    paddingVertical:8,
    borderRadius: 10,
    alignItems: "center",
    width:width*0.4
  },
});

export default RoleSelectionScreen;
