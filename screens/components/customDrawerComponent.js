import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <Text style={styles.logoText}>PlayPals</Text>
      <View style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
  logoText: { fontSize: 18, fontWeight: "bold", color: "white", marginVertical: 20 },
  menuContainer: { flex: 1, marginVertical: 20 },
  signOutButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  signOutText: { fontSize: 16, fontWeight: "bold", color: "#000" },
});

export default CustomDrawerContent;
