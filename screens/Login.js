import { TouchableOpacity, Text, View, TextInput, ImageBackground, Alert } from "react-native";
import { useState } from "react";
import Background from "./Background";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');  // Username state
    const [pass, setPass] = useState('');  // Password state
    const [seeCheck, setSeeCheck] = useState(true);  // Password visibility toggle

    const handlePass = (text) => {
        setPass(text);
    };

    const handleUsername = (text) => {
        setUsername(text);
    };

    const togglePasswordVisibility = () => {
        setSeeCheck((prevState) => !prevState);
    };

    const handleLogin = () => {
        // Check if both fields are filled
        if (!username || !pass) {
            Alert.alert("Error", "Please fill in both fields.");
            return; // Prevent navigation if fields are empty
        }
        
        // If fields are filled, proceed to Homescreen
        navigation.navigate('Homescreen');
    };

    return (
        <Background style={{ zIndex: -2 }}>
            <Text style={{
                color: "#ffffff0a",
                fontFamily: 'Kanit_400Regular',
                fontSize: 75,
                position: 'absolute',
                left: 20,
                top: 50,
                zIndex: 1
            }}>PlayPals</Text>

            <ImageBackground source={require('./asset/Cricket.png')}
                style={{
                    flex: 1,
                    height: 720,
                    width: 720,
                    position: 'absolute',
                    bottom: 0,
                    opacity: 0.08,
                    right: -30,
                    zIndex: 0
                }} />

            <View style={{
                height: 275,  // Adjusted height to fit Forgot Password button
                width: 350,
                position: 'absolute',
                backgroundColor: '#ffffff0a',
                borderRadius: 20,
                borderWidth: 5,
                borderColor: '#ffffff80',
                bottom: 200,
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        top: 25,
                        borderRadius: 10,
                        backgroundColor: '#ffffff80',
                        height: 60,
                        width: 300,
                        position: 'absolute',
                        paddingLeft: 20,
                        fontFamily: 'Kanit_400Regular',
                        fontSize: 24
                    }}
                    placeholder="Username"
                    placeholderTextColor={'#0000004d'}
                    value={username}
                    onChangeText={handleUsername}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 125,
                    width: 300,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: '#ffffff80',
                    paddingLeft: 20,
                    paddingRight: 15  // Added space on the right side
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            fontFamily: 'Kanit_400Regular',
                        fontSize: 24
                    }}
                        placeholder="Password"
                        placeholderTextColor={'#0000004d'}
                        onChangeText={handlePass}
                        value={pass}
                        secureTextEntry={seeCheck}
                    />

                    {/* Eye Icon with extra right spacing */}
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ paddingLeft: 10 }}>
                        <Feather name={seeCheck ? 'eye-off' : 'eye'} color={'black'} size={30} />
                    </TouchableOpacity>
                </View>

                {/* Forgot Password Button */}
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 20 }}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={{ fontFamily: 'Kanit_400Regular', color: '#0091ff', fontSize: 18 }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleLogin}  // Call handleLogin to check if fields are filled
                style={{
                    backgroundColor: '#0091ff',
                    width: 300,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: 100
                }}>
                <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 24 }}>Login</Text>
            </TouchableOpacity>

            <Text
                style={{
                    fontFamily: 'Kanit_400Regular',
                    color: '#ffffff80',
                    fontSize: 24,
                    position: 'absolute',
                    bottom: 10
                }}
                onPress={() => navigation.navigate('Signup')}
            >
                Register<Text style={{ color: '#0000007d', fontSize: 20 }}> yourself !!!</Text>
            </Text>
        </Background>
    );
};

export default Login;
