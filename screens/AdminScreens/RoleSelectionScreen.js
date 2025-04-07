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
          color: "#ffffff0a",
          fontFamily: "Kanit_400Regular",
          fontSize: 75,
          position: "absolute",
          left: 20,
          top: 50,
          zIndex: 1,
        }}
      >
        PlayPals
      </Text>
      <ImageBackground
        source={require("./../asset/Cricket.png")}
        style={{
          flex: 1,
          height: 720,
          width: 720,
          position: "absolute",
          bottom: 0,
          opacity: 0.08,
          right: -30,
          zIndex: 0,
        }}
      ></ImageBackground>

      <View
        style={{
          height: height * 0.3,
          width: width * 0.9,
          position: "absolute",
          backgroundColor: "#ffffff0a",
          opacity: 1,
          borderRadius: 20,
          borderWidth: 5,
          borderColor: "#ffffff80",
          bottom: 200,
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
              selectedRole === "user" ? "check-box" : "check-box-outline-blank"
            }
            size={28}
            color="#0091ff"
          />
          <Text style={styles.checkboxLabel}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setSelectedRole("admin")}
        >
          <MaterialIcons
            name={
              selectedRole === "admin" ? "check-box" : "check-box-outline-blank"
            }
            size={28}
            color="#0091ff"
          />
          <Text style={styles.checkboxLabel}>Turf Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={{fontFamily:'Kanit_400Regular',color:'white',fontSize:20}}>Confirm →</Text>
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
    fontSize: 28,
    textAlign: "center",
    color: "white",
    fontFamily: "Kanit_400Regular",
    marginBottom:40
  },
  buttonContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkboxLabel: {
    fontSize: 22,
    marginLeft: 10,
    color:'white',
    fontFamily:"Kanit_400Regular",
    width:width*0.26,
    borderRadius:10,
    paddingLeft:5
  },
  confirmBtn: {
    marginTop: 40,
    backgroundColor: "#0091ff",
    paddingVertical:8,
    borderRadius: 10,
    alignItems: "center",
    width:width*0.4
  },
});

export default RoleSelectionScreen;
