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

export default function AdminTurfScreen() {
  const navigation = useNavigation();
  const [turfs, setTurfs] = useState([
    {
      id: "1",
      name: "Green Turf",
      location: "Kochi",
      price: 150,
      image: require("./../asset/Sachin.png"),
    },
    {
      id: "2",
      name: "Elite Arena",
      location: "Bangalore",
      price: 200,
      image: require("./../asset/Sachin.png"),
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch data here
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TurfInfo", { turfId: item.id })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.turfName}>{item.name}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.price}>💸 ₹{item.price}/person</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BG2>
      <View style={styles.container}>
      <TouchableOpacity onPress={()=> navigation.navigate("AdminHomeScreen")} style={{marginTop:25,marginLeft:12}}>
      <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
        <Text style={styles.title}>My Turfs</Text>

        {turfs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No turfs added yet.</Text>
            <Text style={styles.emptyText}>Tap + to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={turfs}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        {/* Floating Add Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddTurf")}
        >
        {/* <Text style={{fontSize:13,color:'white'}}>Add new</Text>
        <Text style={{fontSize:13,color:'white'}}>Turf</Text> */}
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </BG2>
  );
}

const CARD_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    left:width*0.32,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    width: width - 32, 
    alignSelf: "center", 
    height:150
  },
  image: {
    width: CARD_HEIGHT,
    height: CARD_HEIGHT,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  turfName: {
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
