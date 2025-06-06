import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const RentalsBooking = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rentalDetails } = route.params || {};

  console.log(rentalDetails[0].photos[0]);

  if (!rentalDetails) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "white", fontSize: 20 }}>
          No Rental Data Available
        </Text>
      </View>
    );
  }

  //const { name, description,category, price, image } = rentalDetails;

  return (
    <View style={styles.container}>
      {/* Background with Opacity */}
      <ImageBackground
        source={require("./asset/turfBG.png")}
        style={styles.background}
      >
        <View style={styles.overlay} />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Rental Image + Details Container with Semi-Transparent Background */}
        <View style={styles.rentalContainer}>
          {/* Rental Image */}
          <Image
            source={{ uri: rentalDetails[0].photos[0] }}
            style={styles.rentalImage}
          />

          {/* Rental Information */}
          <View style={styles.infoContainer}>
            <Text style={styles.rentalName}>{rentalDetails[0].name}</Text>
            <Text style={styles.rentalInfo}>
              Pickup: {rentalDetails[0].category}
            </Text>
            <Text style={styles.rentalInfo}>
              Duration: {rentalDetails[0].description}
            </Text>
            <Text style={styles.rentalInfo}>
              Price: {rentalDetails[0].pricePerHour}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "green",
                height: 35,
                width: 160,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("RentalReview")}
            >
              <Text style={{ color: "white", fontSize: 15 }}>
                Check Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("RentalPayment", {
              price: rentalDetails[0].pricePerHour,
            })
          }
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default RentalsBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Background opacity
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
  },
  rentalContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 200,
    paddingBottom: 20,
    alignItems: "center",
  },
  rentalImage: {
    width: 300,
    //backgroundColor:'white',
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  infoContainer: {
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  rentalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B8F4AA",
  },
  rentalInfo: {
    fontSize: 16,
    color: "white",
    marginTop: 2,
  },
  bookButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#66bb6a",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  bookText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
