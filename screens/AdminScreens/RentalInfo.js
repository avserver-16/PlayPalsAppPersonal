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

export default function RentalInfo({ route }) {
  const navigation = useNavigation();
  const { rentalId } = route.params;

  const rentalData = {
    id: rentalId,
    name: "Pro Cricket Kit",
    type: "Cricket",
    brand: "SG",
    description: "Complete cricket kit with pads, gloves, bat, helmet, and ball.",
    condition: "Excellent",
    contact: "Rahul Sharma - 9876543212",
    availability: "Available",
    price: 150, // per hour
    images: [
      require("./../asset/cKit.png"),
      require("./../asset/cKit.png"),
      require("./../asset/cKit.png"),
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 18, marginTop: 30 }}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>{rentalData.name}</Text>
        <Text style={styles.subTitle}>
          <Ionicons name="construct" size={16} color="#ccc" /> {rentalData.type} Gear
        </Text>

        {/* Content Wrapper with Border */}
        <View style={styles.contentWrapper}>
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
              {rentalData.images.map((img, idx) => (
                <Image key={idx} source={img} style={styles.image} />
              ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {rentalData.images.map((_, i) => (
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

          {/* Rental Info Cards */}
          <View style={styles.infoCard}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{rentalData.description}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Brand</Text>
            <Text style={styles.value}>{rentalData.brand}</Text>
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.infoCard, styles.halfCard]}>
              <Text style={styles.label}>Condition</Text>
              <Text style={styles.value}>{rentalData.condition}</Text>
            </View>
            <View style={[styles.infoCard, styles.halfCard]}>
              <Text style={styles.label}>Availability</Text>
              <Text style={styles.value}>{rentalData.availability}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>{rentalData.contact}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Rental Price</Text>
            <Text style={styles.value}>₹ {rentalData.price}/hour</Text>
          </View>
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
  contentWrapper: {
    borderWidth: 2,        // Add white border width
    borderColor: "white",  // Set white border color
    borderRadius: 16,      // Rounded corners for the container
    padding: 16,           // Padding inside the wrapper
    marginBottom: 16,      // Margin below the wrapper
  },
  imageScroll: {
    marginBottom: 10,
  },
  image: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
    marginRight: 6,
    borderWidth: 2,       // Add white border to images
    borderColor: "grey", // White border color
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2, 
    borderColor: "grey",
  },
  label: {
    fontSize: 14,
    color: "white",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "white",
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
