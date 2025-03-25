import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Import Drawer Navigator
import { useFonts, Kanit_400Regular } from "@expo-google-fonts/kanit";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import LangSport from "./screens/LangSport";
import Signup from "./screens/Signup";
import OtpVerification from "./screens/OtpVerification";
import Turf1 from "./screens/Turf1";
import Help from "./screens/Help";
import Homescreen from "./screens/Homescreen";
import Notifications from "./screens/Notifications";
import Rentals from "./screens/Rentals";
import Rewards from "./screens/Rewards";
import Settings from "./screens/Settings";
import UserAccount from "./screens/UserAccount";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Homescreen" 
    screenOptions={{
      drawerStyle: {
        backgroundColor: "rgba(15, 15, 15, 0.9)", // Black with 80% opacity
        width: 250,
      },
      drawerLabelStyle: { color: "white" },
      headerStyle: { backgroundColor: "#000" },
      headerTintColor: "white",
    }}>
      <Drawer.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }}/>
      <Drawer.Screen name="Turfs" component={Turf1} options={{ headerShown: false }}/>
      <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}/>
      <Drawer.Screen name="Rentals" component={Rentals} options={{ headerShown: false }}/>
      <Drawer.Screen name="Rewards" component={Rewards} options={{ headerShown: false }}/>
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      <Drawer.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="LangSport" component={LangSport} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
        <Stack.Screen name="Turf1" component={Turf1} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
        <Stack.Screen name="Homescreen" component={DrawerNavigator} options={{ headerShown: false }} />
 
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="Rentals" component={Rentals} options={{ headerShown: false }} />
        <Stack.Screen name="Rewards" component={Rewards} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
