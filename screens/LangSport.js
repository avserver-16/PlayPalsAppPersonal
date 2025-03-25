import React, { useState } from "react";
import Background from "./Background";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";

const LangSport = ({ navigation }) => {
  const [selectedSports, setSelectedSports] = useState([]);

  const handlePress = (sport) => {
    setSelectedSports((prevSports) => {
      if (prevSports.includes(sport)) {

        return prevSports.filter((item) => item !== sport);
      } else {

        return [...prevSports, sport];
      }
    });
  };

  return (
    <Background>
      {/* Background Image */}
      <ImageBackground
        source={require("./asset/Volleyball.png")}
        style={{
          flex: 1,
          height: 400,
          width: 400,
          position: "absolute",
          bottom: 0,
          opacity: 0.08,
          right: 0,
          zIndex: 0,
        }}
      />

      {/* Title */}
      <Text
        style={{
          color: "white",
          fontFamily: "Kanit_400Regular",
          left: 20,
          marginTop: 150,
          fontSize: 36,
          opacity: 0.85,
          left: -25
        }}
      >
        Select your Sport
      </Text>

      {/* Sport Selection Buttons */}
      <View
        style={{
          flex: 1,
          left: -50,
          padding: 20
          //justifyContent: "center",
          //alignItems: "center",
        }}
      >
        {/* Cricket */}
        <TouchableOpacity onPress={() => handlePress("Cricket")} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: selectedSports.includes("Cricket") ? "#00000090" : "#ffffff2a",
              width: 200,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 5,
              borderColor: "#ffffff90",
              borderRadius: 40,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 36, color: "white" }}>
              +Cricket
            </Text>
          </View>
        </TouchableOpacity>

        {/* Football */}
        <TouchableOpacity onPress={() => handlePress("Football")} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: selectedSports.includes("Football") ? "#00000090" : "#ffffff2a",
              width: 210,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 5,
              borderColor: "#ffffff80",
              borderRadius: 40,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 36, color: "white" }}>
              +Football
            </Text>
          </View>
        </TouchableOpacity>

        {/* Badminton */}
        <TouchableOpacity onPress={() => handlePress("Badminton")} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: selectedSports.includes("Badminton") ? "#0000009 0" : "#ffffff2a",
              width: 250,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 5,
              borderColor: "#ffffff80",
              borderRadius: 40,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 36, color: "white" }}>
              +Badminton
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          backgroundColor: "#0091ff",
          width: 300,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          position: "absolute",
          bottom: 100,
        }}
      >
        <Text style={{ fontFamily: "Kanit_400Regular", fontSize: 24 }}>Next</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default LangSport;
