import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts, Kanit_400Regular } from "@expo-google-fonts/kanit";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


SplashScreen.preventAutoHideAsync();

import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import LangSport from "./screens/LangSport";
import Signup from "./screens/Signup";
import OtpVerification from "./screens/OtpVerification";
import HomeScreen from "./screens/Homescreen";
import TurfsMain from "./screens/TurfsMain";
import Rentals from "./screens/Rentals";
import Notifications from "./screens/Notifications";
import Settings from "./screens/Settings";
import Rewards from "./screens/Rewards";
import Help from "./screens/Help";
import UserAccount from "./screens/UserAccount";
import CustomDrawerContent from "./screens/components/customDrawerComponent";
import RentalsBooking from "./screens/RentalsBooking";
import ForgotPassword from "./screens/ForgotPassword";

SplashScreen.preventAutoHideAsync();
import Turf1 from "./screens/Turf1";
import RoleSelectionScreen from "./screens/AdminScreens/RoleSelectionScreen";
import AdminHomeScreen from "./screens/AdminScreens/AdminHomeScreen";
import AdminTurf from "./screens/AdminScreens/AdminTurf";
import AdminRental from "./screens/AdminScreens/AdminRental";
import AdminLogin from "./screens/AdminScreens/AdminLogin"
import AdminSignup from "./screens/AdminScreens/AdminSignup";
import AddTurf from "./screens/AdminScreens/AddTurf";
import TurfInfo from "./screens/AdminScreens/TurfInfo"
import RentalInfo from "./screens/AdminScreens/RentalInfo";
import AddRental from "./screens/AdminScreens/AddRental";
import AdminProfile from "./screens/AdminScreens/AdminProfile";
import TurfReview from "./screens/TurfReview";
import PostNewReview from "./screens/PostNewReview";
import RentalReview from "./screens/RentalReview";
import PostNewRentalReview from "./screens/PostNewRentalReview";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
function DrawerNavigator() {
  const [role, setRole] = useState(null); // ⬅️ Add state for role

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchRole();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerStyle: { backgroundColor: "#000" },
        drawerLabelStyle: { color: "white" },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "gray",
        drawerIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home" || route.name === "AdminHome") {
            iconName = "home-outline";
          } else if (route.name === "Turfs" || route.name === "AdminTurfs") {
            iconName = "football-outline";
          } else if (route.name === "Rentals" || route.name === "AdminRentals") {
            iconName = "cart-outline";
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          } else if (route.name === "Rewards") {
            iconName = "gift-outline";
          } else if (route.name === "Help") {
            iconName = "help-circle-outline";
          } else if (route.name === "UserAccount") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* {role === "admin" ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="AdminTurfs" component={AdminTurf} />
          <Drawer.Screen name="AdminRentals" component={AdminRental} />
        </>
      ) : (
        <> */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Turfs" component={Turf1} />
      <Drawer.Screen name="Rentals" component={Rentals} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Rewards" component={Rewards} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="UserAccount" component={UserAccount} />
      {/* </>
      )} */}
    </Drawer.Navigator>
  );
}



export default function App() {
  const [fontsLoaded] = useFonts({ Kanit_400Regular });

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
        <Stack.Screen name="Homescreen" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Turf1" component={Turf1} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="Rentals" component={Rentals} options={{ headerShown: false }} />
        <Stack.Screen name="Rewards" component={Rewards} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }} />
        <Stack.Screen name="TurfsMain" component={TurfsMain} options={{ headerShown: false }} />
        <Stack.Screen name="RentalsBooking" component={RentalsBooking} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminSignup" component={AdminSignup} options={{ headerShown: false }} />
        <Stack.Screen name="AdminTurf" component={AdminTurf} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminRental" component={AdminRental} options={{ headerShown: false }}/>
        <Stack.Screen name="AddTurf" component={AddTurf} options={{headerShown:false}}/>
        <Stack.Screen name="TurfInfo" component={TurfInfo} options={{headerShown:false}}/>
        <Stack.Screen name="AddRental" component={AddRental} options={{headerShown:false}}/>
        <Stack.Screen name="RentalInfo" component={RentalInfo} options={{headerShown:false}}/>
        <Stack.Screen name="AdminProfile" component={AdminProfile} options={{headerShown:false}}/>
        <Stack.Screen name="TurfReview" component={TurfReview} options={{headerShown:false}}/>
        <Stack.Screen name="PostNewReview" component={PostNewReview} options={{headerShown:false}}/>
        <Stack.Screen name="RentalReview" component={RentalReview} options={{headerShown:false}}/>
        <Stack.Screen name="PostNewRentalReview" component={PostNewRentalReview} options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
