import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,ImageBackground,ScrollView } from "react-native";
import Background from "./Background";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmNewPassword,setConfirmNewPassword] =useState("");

    const handleResetPassword = () => {
        // Check if the email is empty
        if (!email) {
            Alert.alert("Error", "Please enter your email address.");
            return; // Prevent navigation if email is empty
        }

        // Placeholder for password reset functionality
        console.log("Password reset link sent to:", email);
        
        // Navigate to OTPVerification page and pass email as a parameter
        navigation.navigate('OtpVerification', { email });
    };

    return (
        <Background>
            <Text style={{
                color: "#ffffff0a",
                fontFamily: 'Kanit_400Regular',
                fontSize: 60,
                position: 'absolute',
                left: 20,
                top: 50
            }}>PlayPals</Text>
            <ImageBackground
        source={require("./asset/Cricket.png")}
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

            <View style={{
                height: 300,
                width: 350,
                backgroundColor: '#ffffff0a',
                borderRadius: 20,
                borderWidth: 5,
                borderColor: '#ffffff80',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 250
            }}>
                <TextInput
                    style={{
                        backgroundColor: '#ffffff80',
                        height: 60,
                        width: 300,
                        borderRadius: 10,
                        paddingLeft: 20,
                        fontFamily: 'Kanit_400Regular',
                        fontSize: 24
                    }}
                    placeholder="Enter your Email"
                    placeholderTextColor={'#0000004d'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"  // This sets the keyboard type for email input
                    autoCapitalize="none"         // Prevents auto-capitalization
                />
                <TextInput
                    style={{
                        backgroundColor: '#ffffff80',
                        height: 60,
                        width: 300,
                        borderRadius: 10,
                        paddingLeft: 20,
                        fontFamily: 'Kanit_400Regular',
                        fontSize: 24,
                        marginTop:25
                    }}
                    placeholder="New Password"
                    placeholderTextColor={'#0000004d'}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    keyboardType="password"  
                    autoCapitalize="none"         // Prevents auto-capitalization
                />
                <TextInput
                    style={{
                        backgroundColor: '#ffffff80',
                        height: 60,
                        width: 300,
                        borderRadius: 10,
                        paddingLeft: 20,
                        fontFamily: 'Kanit_400Regular',
                        fontSize: 24,
                        marginTop:25
                    }}
                    placeholder="Confirm New Password"
                    placeholderTextColor={'#0000004d'}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    keyboardType="password"  
                    autoCapitalize="none"         // Prevents auto-capitalization
                />
            </View>

            <TouchableOpacity
                onPress={handleResetPassword}
                style={{
                    backgroundColor: '#66bb6a',
                    width: 300,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: 150
                }}>
                <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 24 }}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: 'absolute',
                    bottom: 80
                }}>
                <Text style={{ fontFamily: 'Kanit_400Regular', color: 'white', fontSize: 20 }}>Back to Login</Text>
            </TouchableOpacity>
        </Background>
    );
};

export default ForgotPassword;
