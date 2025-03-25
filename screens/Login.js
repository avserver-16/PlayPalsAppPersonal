import { TouchableOpacity, Text, View, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import Background from "./Background";
import React from "react";
import { Feather } from "@expo/vector-icons"



const Login = ({ navigation }) => {

    const [pass, setPass] = useState('');
    const [seeCheck, setSeeCheck] = useState(true);
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
                placeholder="Username"
                placeholderTextColor={'#0000004d'}
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
                value={pass}
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
            onPress={() => { navigation.navigate('Homescreen') }}
            style={{ backgroundColor: '#0091ff', width: 300, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', bottom: 100 }}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 24 }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Kanit_400Regular', color: '#ffffff80', fontSize: 24, position: 'absolute', bottom: 10 }} onPress={() => { navigation.navigate('Signup') }} >Register<Text style={{ color: '#0000007d', position: 'absolute', fontSize: 20 }}> yourself !!!</Text></Text>
    </Background>);
}
export default Login;