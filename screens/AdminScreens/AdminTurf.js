import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BG2 from "../BG2";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get("window");


export default function AdminTurfScreen() {
  const [turfs, setTurfs] = useState([])
  useEffect(() => {
    const fetchTurf = async () => {
      console.log("Fetching Rentals...");
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token:", storedToken)
        if (!storedToken) {
          console.log("No Token Found");
          return;
        }

        const response = await fetch("https://playpals-l797.onrender.com/turf/my-turfs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
          }
        });

        const data = await response.json();
        console.log("Data:", JSON.stringify(data, null, 2))
      
          setTurfs(data.turfs);
          console.log(turfs.length)
        
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, []);
  const navigation = useNavigation();


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
        <TouchableOpacity onPress={() => navigation.navigate("AdminHomeScreen")} style={{ marginTop: 40,left:-30 }}>
          <Ionicons name="arrow-back" size={28} color="white" />
       
        <Text style={styles.title}>My Turfs</Text>
 </TouchableOpacity>
       {turfs.length === 0 ? (
  <View style={styles.emptyState}>
    <Text style={styles.emptyText}>No turfs added yet.</Text>
    <Text style={styles.emptyText}>Tap + to get started!</Text>
  </View>
) : (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 100,
    }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    {turfs.map((item, index) => (
      <View
        key={index}
        style={{
          height: 250,
          width: 308,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderColor: '#FFFFFF',
          marginBottom: 0,
          justifyContent: 'center',
        }}
      >
        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
          <Image
            source={{ uri: (item.turfPhoto?.[0])?item.turfPhoto?.[0]:'https://dhhu8n9celg6x.cloudfront.net/system/assets/files/24323/large/1.PNG?1551448036' }}
            style={{
              flex: 1,
              height: 100,
              width: 130,
              position: 'absolute',
              bottom: 0,
              opacity: 1,
              left: 0,
              top: 0,
              borderRadius:18
            }}
          />
          
        </View>
        <View style={{ left: 150, top: 0, backgroundColor: 'transparent', width: 180 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 5, fontFamily: 'PB' }}>
            {item.turfName || 'Turf'}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF', fontFamily: 'PL' }}>
            📍{(item.turfLocation || 'Location')}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF', fontFamily: 'PL' }}>
            💸 ₹{(item.pricePerPerson || 'Price')}
          </Text>
        </View>
      </View>
    ))}
  </ScrollView>
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
    marginTop: -32,
    left:40
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    width: width - 32,
    alignSelf: "center",
    height: 150
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
    fontSize: 16,
    color: "#66bb6a",
    marginTop: 6,
    fontWeight: "800",
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
    width: 76,
    height: 76,
    borderRadius: 50,
    backgroundColor: "#66bb6a",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    alignSelf:'center',
    bottom:40
  },
});
