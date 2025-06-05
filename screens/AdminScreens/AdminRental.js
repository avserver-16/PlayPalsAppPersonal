import React, { useState,useEffect } from "react";
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
import { useNavigation ,useRoute} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BG2 from "../BG2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const CARD_HEIGHT = 120;

export default function AdminRentalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { rentalsData } = route.params || {};
  const [rentals, setRentals] = useState([]);
useEffect(() => {
    const fetchRentals = async () => {
      console.log("Fetching Rentals...");
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token:", storedToken)
        if (!storedToken) {
          console.log("No Token Found");
          return;
        }
        console.log("ID:",rentalsData)

        const response = await fetch("https://playpals-l797.onrender.com/rentals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
          }
        });

        const data = await response.json();
        console.log("Data:", JSON.stringify(data, null, 2))
      
          setRentals(data);
          console.log(data[1].photos[0])
        
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);
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
      <Image source={{uri:item.photos[0]}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>💸 ₹{item.pricePerHour}/hr</Text>
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
    alignSelf: "stretch", 
    width:width*0.85,
    height:140
  },
  image: {
    width: CARD_HEIGHT,
    height: CARD_HEIGHT,
    resizeMode: "contain",
    left:20,
    borderRadius:15,
    marginRight:20
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
 fontFamily:'PL',
    color: "#333",
   
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 17,
    color: "#66bb6a",
    marginTop: 6,
    fontWeight: "500", fontFamily:'PL',
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
    width: 76,
    height: 76,
    borderRadius: 28,
    backgroundColor: "#66bb6a",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
