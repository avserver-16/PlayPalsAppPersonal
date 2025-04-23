import React, { useEffect, useState } from 'react';
import BG2 from './BG2';
import { View, ScrollView, TouchableOpacity, Text, TextInput, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


//price perr hour 
//itemname
//description
//category
//quantity
//location

const Rentals = () => {
    const navigation = useNavigation();
    const today = new Date();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRentals = async () => {
            console.log("Fetching Rentals...");
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (!storedToken) {
                    console.log("No Token Found");
                    return;
                }

                console.log("Retrieved Token", JSON.stringify(storedToken, null, 2));
                const response = await fetch("https://playpals-l797.onrender.com/rentals", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedToken}`
                    }
                });

                const data = await response.json();
                console.log("Fetched Data:", JSON.stringify(data, null, 2));

                if (Array.isArray(data)) {
                    setRentals(data);
                    //console.log(rentals[0].photos[0])
                }
            } catch (error) {
                console.error("Error fetching rentals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);
    const capitalizeWords = (sentence) => {
        if (!sentence) return "";
        return sentence
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

    return (
        <BG2>
        
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                position: 'absolute',
                top: 40, left: 10, zIndex: 10,
            }}>
                <AntDesign name="arrowleft" size={34} color="white" />
            </TouchableOpacity>

            <View style={{ backgroundColor: 'transparent', height: 81, justifyContent: 'center', top: 81, position: 'absolute' }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'row', left: 5, backgroundColor: 'transparent', height: 81 }}
                    style={{ width: 323, borderRadius: 20, height: 81 }}
                >
                    {[...Array(10)].map((_, index) => {
                        const date = new Date();
                        date.setDate(today.getDate() + index);
                        const isSelected = selectedIndex === index;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedIndex(index)}
                                style={{
                                    height: 80,
                                    width: 60,
                                    marginRight: 20,
                                    backgroundColor: isSelected ? '#423E3EB2' : 'black',
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ fontSize: 32, color: 'white' }}>{date.getDate()}</Text>
                                <Text style={{ fontSize: 20, color: 'white' }}>{date.toLocaleString('en-US', { month: 'short' })}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Search and Filter Section */}
            <View style={{
                height: 61, width: 313, backgroundColor: 'transparent', top: 172, position: 'relative',
                borderRadius: 50, borderWidth: 1, borderColor: '#66bb6a', flexDirection: 'row', alignItems: 'center', paddingLeft: 20
            }}>
                <TextInput style={{ flex: 1, fontSize: 18, color: 'white' }} placeholder='Search' placeholderTextColor={'#FFFFFF'} />
                <TouchableOpacity style={{
                    width: 112, height: 43, backgroundColor: '#66bb6a', borderRadius: 30,
                    alignItems: 'center', justifyContent: 'center', marginRight: 10
                }}>
                    <Text style={{ fontSize: 18 }}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Rental List Section */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
                    <ActivityIndicator size="large" color="#B8F4AA" />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}
                    style={{ marginTop: 200 }}
                >
                    {rentals.length === 0 ? (
                        <Text style={{ color: 'white', fontSize: 18 }}>No rentals available.</Text>
                    ) : (
                        rentals.map((rental) => (
                            <View key={rental.id} style={{
                                height: 150, width: 308, backgroundColor: 'transparent',
                                borderBottomWidth: 2, borderColor: '#FFFFFF', marginBottom: 30,
                            }}>
                                <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                                    <Image source={{ uri: rentals[0].photos[0]}} style={{
                                        flex: 1, height: 100, width: 150, position: "absolute", bottom: 0, opacity: 1, left: 20, top: 20, resizeMode: 'contain',borderRadius:20
                                    }} />
                                    <TouchableOpacity
                                        style={{
                                            zIndex: 2, width: 60, height: 30, backgroundColor: '#B8F4AA', borderRadius: 10,
                                            alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 5, top: 5
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, color: 'black' }}>${rental.pricePerHour}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ left: 190, top: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 5 }}>{capitalizeWords(rental.name)}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>Category: {rental.category}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>Quantity: {rental.quantity}</Text>

                                    <TouchableOpacity
                                        style={{
                                            zIndex: 2, width: 80, height: 35, backgroundColor: 'transparent',
                                            borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                                            position: 'absolute', left: 0, top: 80, borderWidth: 2, borderColor: '#66bb6a'
                                        }}
                                        onPress={() => navigation.navigate('RentalsBooking', { rentalDetails: rentals })}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white' }}>View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </BG2>
    );
};

export default Rentals;
