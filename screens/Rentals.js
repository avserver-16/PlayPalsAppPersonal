import React, { useState } from 'react';
import BG2 from './BG2';
import { View, ScrollView, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';


const Rentals = () => {
    const navigation = useNavigation();
    const today = new Date();
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Rental Data
    const rentals = [
        { id: 1, name: 'Badminton Racket', location: 'Andheri', duration: '24hrs', price: '$10', image: require("./asset/badmintonRacket.png") },
        { id: 2, name: 'Cricket Kit', location: 'Malad', duration: '24hrs', price: '$100', image: require("./asset/cKit.png") },
        { id: 3, name: 'Football Gloves', location: 'Bandra', duration: '12hrs', price: '$25', image: require("./asset/FBgloves.png") },
    ];

    return (
        <BG2>
            {/* Date Scroll Section */}
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
                borderRadius: 50, borderWidth: 1, borderColor: '#B8F4AA', flexDirection: 'row', alignItems: 'center', paddingLeft: 20
            }}>
                <TextInput style={{ flex: 1, fontSize: 18, color: 'white' }} placeholder='Search' placeholderTextColor={'#FFFFFF'} />
                <TouchableOpacity style={{
                    width: 112, height: 43, backgroundColor: '#B8F4AA', borderRadius: 30,
                    alignItems: 'center', justifyContent: 'center', marginRight: 10
                }}>
                    <Text style={{ fontSize: 18 }}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Rental List Section */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}
                style={{ marginTop: 200 }}
            >
                {rentals.map((rental) => (
                    <View key={rental.id} style={{
                        height: 150, width: 308, backgroundColor: 'transparent',
                        borderBottomWidth: 2, borderColor: '#FFFFFF', marginBottom: 30,
                    }}>
                        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                            <Image source={rental.image} style={{
                                flex: 1, height: 100, width: 150, position: "absolute", bottom: 0, opacity: 1, left: 20, top: 20, resizeMode: 'contain'
                            }} />
                            <TouchableOpacity
                                style={{
                                    zIndex: 2, width: 60, height: 30, backgroundColor: '#B8F4AA', borderRadius: 10,
                                    alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 5, top: 5
                                }}
                            >
                                <Text style={{ fontSize: 15, color: 'black' }}>{rental.price}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ left: 190, top: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 5 }}>{rental.name}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>Pickup: {rental.location}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>Duration: {rental.duration}</Text>

                            <TouchableOpacity
                                style={{
                                    zIndex: 2, width: 80, height: 35, backgroundColor: 'transparent',
                                    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                                    position: 'absolute', left: 0, top: 80, borderWidth: 2, borderColor: '#B8F4AA'
                                }}
                                onPress={() => navigation.navigate('RentalsBooking', { 
                                    rentalDetails: {
                                        id: rental.id,
                                        name: rental.name,
                                        location: rental.location,
                                        duration: rental.duration,
                                        price: rental.price,
                                        image: rental.image
                                    }
                                })}
                            >
                                <Text style={{ fontSize: 15, color: 'white' }}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </BG2>
    );
};

export default Rentals;
