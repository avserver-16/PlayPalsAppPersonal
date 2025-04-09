import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BG2 from "../BG2";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = 120;

export default function AdminRentalScreen() {
  const navigation = useNavigation();

  const [rentals, setRentals] = useState([
    {
      id: "1",
      name: "Cricket Bat (English Willow)",
      location: "Ernakulam",
      price: 300,
      image: require("../asset/cKit.png"),
    },
    {
      id: "2",
      name: "Football - Adidas Tango",
      location: "Thrissur",
      price: 150,
      image: require("../asset/FBgloves.png"),
    },
    {
      id: "3",
      name: "Badminton Racket (Yonex)",
      location: "Kozhikode",
      price: 120,
      image: require("../asset/badmintonRacket.png"),
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RentalInfo", { rental: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.price}>💸 ₹{item.price}/day</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BG2>
      <View style={styles.container}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginBottom:5,marginTop:30}}>
      <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
        <Text style={styles.title}>My Rentals</Text>

        {rentals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No rentals added yet.</Text>
            <Text style={styles.emptyText}>Tap + to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={rentals}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddRental")}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </BG2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    marginTop:10
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    alignSelf: "stretch", // this ensures full width inside FlatList
    width:width*0.85,
    height:140
  },
  image: {
    width: CARD_HEIGHT,
    height: CARD_HEIGHT,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: "#1e90ff",
    marginTop: 6,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    marginVertical: 4,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
