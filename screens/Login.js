import { TouchableOpacity, Text, View, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import Background from "./Background";
import React from "react";
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";



const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [seeCheck, setSeeCheck] = useState(true);


    //backend connection 
    const userLogin = async () => {
        const response = await fetch("https://playpals-l797.onrender.com/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        //const checVal=await response.text();
        // console.log(checVal);
        const data = await response.json();
        console.log(data);
        console.log(data.message);
        console.log(data.data.token);
const token=data?.data?.token;
        if (token) {
            console.log("Entered true");
            await AsyncStorage.setItem("token", data.data.token);
            const storedToken = await AsyncStorage.getItem("token");
            Alert.alert("Success", "Logged in successfully");
            navigation.navigate("Homescreen",{email,password})
        } else {
            Alert.alert("Error", data.message || "Login failed");
        }
    }


    const handlePass = (text) => {
        setPass(text);
    }

    const check = () => {
        if (seeCheck === true) { setSeeCheck(false); }
        else { setSeeCheck(true); }
        console.log("Eye pressed");
    }

    return (<Background style={{ zIndex: -2 }}>
        <Text style={{ color: "#ffffff0a", fontFamily: 'Kanit_400Regular', fontSize: 75, position: 'absolute', left: 20, top: 50, zIndex: 1 }}>PlayPals</Text>
        <ImageBackground source={require('./asset/Cricket.png')}
            style={{
                flex: 1,
                height: 720,
                width: 720,
                position: 'absolute',
                bottom: 0,
                opacity: 0.08,
                right: -30, zIndex: 0
            }}></ImageBackground>
        <View
            style={{
                height: 225,
                width: 350,
                position: 'absolute',
                backgroundColor: '#ffffff0a',
                opacity: 1,
                borderRadius: 20,
                borderWidth: 5,
                borderColor: '#ffffff80',
                bottom: 200,
                //justifyContent:'center',
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
                placeholder="Email"
                placeholderTextColor={'#0000004d'}
                onChangeText={setEmail}
                value={email}
            ></TextInput>
            <TextInput
                style={{
                    top: 125,
                    borderRadius: 10,
                    backgroundColor: '#ffffff80',
                    height: 60,
                    width: 300,
                    position: 'absolute',
                    paddingLeft: 20,
                    fontFamily: 'Kanit_400Regular',
                    fontSize: 24
                }}
                placeholder="Password"
                placeholderTextColor={'#0000004d'}
                onChangeText={handlePass}
                value={password}
                secureTextEntry={seeCheck}
            ></TextInput>
            <TouchableOpacity
                style={{
                    backgroundColor: 'transparent', height: 30, width: 30
                    , color: 'grey', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 30, bottom: 45
                }} onPress={check}>
                <Feather name='eye' color={'grey'} size={30}>
                </Feather>
            </TouchableOpacity>

        </View>
        <TouchableOpacity
            onPress={userLogin}
            style={{ backgroundColor: '#0091ff', width: 300, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', bottom: 100 }}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 24 }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Kanit_400Regular', color: '#ffffff80', fontSize: 24, position: 'absolute', bottom: 10 }} onPress={() => { navigation.navigate('Signup') }} >Register<Text style={{ color: '#0000007d', position: 'absolute', fontSize: 20 }}> yourself !!!</Text></Text>
    </Background>);
}
export default Login;