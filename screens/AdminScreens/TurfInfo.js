import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BG2 from "../BG2";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function TurfInfo({ route }) {
    const navigation=useNavigation();
  const { turfId } = route.params;

  const turfData = {
    id: turfId,
    name: "Elite Arena",
    location: "Bangalore",
    description: "A top-notch turf with premium quality synthetic grass.",
    contact: "John Doe - 9876543210",
    size: "60 x 40 ft",
    games: ["Football", "Cricket", "Box Cricket"],
    amenities: ["Lighting", "Restroom", "Drinking Water", "Parking"],
    price: 200,
    totalSeats: 20,
    images: [
      require("./../asset/Sachin.png"),
      require("./../asset/Sachin.png"),
      require("./../asset/Sachin.png"),
    ],
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (width * 0.8)
    );
    setActiveIndex(index);
  };

  return (
    <BG2>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginBottom:18,marginTop:30}}>
      <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
        <Text style={styles.title}>{turfData.name}</Text>
        <Text style={styles.subTitle}>
          <Ionicons name="location" size={16} color="#ccc" /> {turfData.location}
        </Text>

        {/* Image Carousel */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={scrollRef}
            style={styles.imageScroll}
          >
            {turfData.images.map((img, idx) => (
              <Image key={idx} source={img} style={styles.image} />
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {turfData.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { opacity: i === activeIndex ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Turf Info Cards */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{turfData.description}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{turfData.contact}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.infoCard, styles.halfCard]}>
            <Text style={styles.label}>Turf Size</Text>
            <Text style={styles.value}>{turfData.size}</Text>
          </View>
          <View style={[styles.infoCard, styles.halfCard]}>
            <Text style={styles.label}>Total Seats</Text>
            <Text style={styles.value}>{turfData.totalSeats}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Available Games</Text>
          <Text style={styles.value}>{turfData.games.join(", ")}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Amenities</Text>
          <Text style={styles.value}>{turfData.amenities.join(", ")}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>₹ {turfData.price}/person</Text>
        </View>
      </ScrollView>
    </BG2>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 12,
  },
  imageScroll: {
    marginBottom: 10,
  },
  image: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfCard: {
    flex: 1,
    marginRight: 8,
  },
});
