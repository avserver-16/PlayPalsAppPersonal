import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import Background from "./../Background";
import React from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [seeCheck, setSeeCheck] = useState(true);

  //backend connection
  const adminLogin = async () => {
    const response = await fetch(
      "https://playpals-l797.onrender.com/owner/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    //const checVal=await response.text();
    // console.log(checVal);
    const data = await response.json();
    console.log(data);
    console.log(data.message);

    const token = data?.data?.token;
    console.log(token);
    if (token) {
      console.log("Entered true");
      await AsyncStorage.setItem("token", token);
      const storedToken = await AsyncStorage.getItem("token");
      console.log(storedToken);
      //   Alert.alert("Success", "Logged in successfully");
      //   navigation.navigate("Homescreen");
      Alert.alert("Success", "Logged in successfully");

      // Get role from AsyncStorage
      // const role = await AsyncStorage.getItem("userRole");

      // Navigate to respective home screen
    //   if (role === "admin") {
    //     navigation.navigate("AdminHomeScreen");
    //   } else {
    //     navigation.navigate("Homescreen");
    //   }
    navigation.navigate("AdminHomeScreen")

    } else {
      if (data.message === "Invalid credentials") {
        Alert.alert("Error", "Invalid Credentials");
      }
    }
  };

  const handlePass = (text) => {
    setPass(text);
  };

  const check = () => {
    if (seeCheck === true) {
      setSeeCheck(false);
    } else {
      setSeeCheck(true);
    }
    console.log("Eye pressed");
  };

  return (
    <Background style={{ zIndex: -2 }}>
      <Text
        style={{
          color: "#fff",
          fontFamily: "KanitLight",
          fontSize: 75,
          position: "absolute",
          top: 180,
          zIndex: 1,
          alignSelf:'center'
        }}
      >
        Play Pals
      </Text>
      <ImageBackground
        source={require("./../asset/Cricket.png")}
        style={{
          flex: 1,
          height: 200,
          width: 200,
          position: "absolute",
          top:200,
          opacity: 1,
          alignSelf:'center',
          right:110,
          zIndex:20
        }}
      ></ImageBackground>
      <View
        style={{
             height: 500,
          width: '100%',
          position: "absolute",
          backgroundColor: "#ffffff0a",
          opacity: 1,
          borderRadius: 50,
          top: 400,
          //borderWidth: 5,
          //borderColor: "#B8F4AA",
          //justifyContent:'center',
          alignItems: "center"
        }}
      ><Text
        style={{
          color: "#B8F4AA",
          fontFamily: "KanitLight",
          fontSize: 55,
          position: "absolute",
          zIndex: 1,
          alignSelf:'center'
        }}
      >
        Turf Owner
      </Text>
        <TextInput
          style={{
            top: 100,
            borderRadius: 50,
            backgroundColor: "#B8F4AA",
            height: 50,
            width: 300,
            position: "absolute",
            paddingLeft: 20,
            fontFamily: "KanitLight",
            fontSize: 20,
          }}
          placeholder="Email"
          placeholderTextColor={"#0000004d"}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <TextInput
          style={{
            top: 180,
            borderRadius: 50,
            backgroundColor: "#B8F4AA",
            height: 50,
            width: 300,
            position: "absolute",
            paddingLeft: 20,
            fontFamily: "KanitLight",
            fontSize: 20,
          }}
          placeholder="Password"
          placeholderTextColor={"#0000004d"}
          onChangeText={handlePass}
          value={password}
          secureTextEntry={seeCheck}
        ></TextInput>
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            height: 30,
            width: 30,
            color: "grey",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right:70,
            top:190
            
          }}
          onPress={check}
        >
          <Feather name="eye" color={"grey"} size={30}></Feather>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{
            height: 35,
            width: 300,
            top: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#B8F4AA",
              fontFamily: "KanitLight",
              fontSize: 16,
              top: 50,
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={adminLogin}
        style={{
         backgroundColor: "black",
            width: 200,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            position: "absolute",
            top: 730
        }}

      >
        <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 24, color: '#B8F4AA' }}>
          Login
        </Text>
      </TouchableOpacity>
      <Text
        style={{
           fontFamily: "KanitLight",
            color: "#ffffff90",
            fontSize: 20,
            top: 405
        }}
        onPress={() => {
          navigation.navigate("AdminSignup");
        }}
      >
        Register
        <Text
          style={{ color: "#0000007d", position: "absolute", fontSize: 20 }}
        >
          {" "}
          yourself !!!
        </Text>
      </Text>
    </Background>
  );
};
export default AdminLogin;

// import react from "react";
// import { View,Text } from "react-native";

// export default function AdminLogin(){
//     return(
//         <View style={{top:100}}>
//             <Text>Admin Rental</Text>
//         </View>
//     )
// }