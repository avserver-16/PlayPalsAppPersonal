import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Background from "./Background";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

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

            <View style={{
                height: 200,
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
            </View>

            <TouchableOpacity
                onPress={handleResetPassword}
                style={{
                    backgroundColor: '#0091ff',
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
                <Text style={{ fontFamily: 'Kanit_400Regular', color: '#ffffff80', fontSize: 20 }}>Back to Login</Text>
            </TouchableOpacity>
        </Background>
    );
};

export default ForgotPassword;
