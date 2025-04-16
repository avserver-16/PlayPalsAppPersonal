import React, { useState } from 'react';
import BG2 from './BG2';
import { View, ScrollView, TouchableOpacity, Text, TextInput, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Turf1 = () => {
    const navigation = useNavigation();
    const today = new Date();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const turfs = [
        { id: 1, name: 'Nsf Turf', location: 'Satya Nagar', time: '9.00pm-11.00pm', maxPlayers: 12, image: require("./asset/TurfFront.png") },
        { id: 2, name: 'Elite Sports', location: 'Ghatkopar', time: '6.00pm-8.00pm', maxPlayers: 10, image: require("./asset/TurfFront.png") },
        { id: 3, name: 'Urban Play', location: 'Andheri', time: '7.00pm-9.00pm', maxPlayers: 8, image: require("./asset/TurfFront.png") },
        { id: 4, name: 'PlayZone', location: 'Vile Parle', time: '8.00pm-10.00pm', maxPlayers: 10, image: require("./asset/TurfFront.png") },
    ];

    return (
        <BG2>
            {/* Arrow Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                position: 'absolute',
                top: 40, left: 10, zIndex: 10,
            }}>
                <AntDesign name="arrowleft" size={34} color="white" />
            </TouchableOpacity>

            {/* Filter Blur View */}
            {showFilter && (
                <BlurView intensity={100} tint="dark" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 3
                }}>
                    <View style={{
                        backgroundColor: 'rgba(255,255,255,0.01)',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: 10,
                    }}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderWidth: 3, borderColor: 'white', height: 400, width: '95%', alignSelf: 'center', top: 150, borderRadius: 25,
                            padding: 20,
                        }}>
                            <Text style={{ color: 'white', fontSize: 20, paddingBottom: 10 }}>Select your preferred turf and book your seats</Text>
                            <TouchableOpacity>
                                <View style={{
                                    width: 180, height: 64, borderWidth: 2, borderColor: '#B8F4AA', backgroundColor: 'transparent',
                                    alignItems: 'center', justifyContent: 'center', borderRadius: 10
                                }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Area</Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput style={{ backgroundColor: 'white', marginTop: 10, padding: 10, borderRadius: 5 }} placeholder="Enter location" />
                        </View>
                        <TouchableOpacity onPress={toggleFilter} style={{
                            width: 170, height: 50, backgroundColor: '#B8F4AA', borderRadius: 30,
                            position: 'absolute', top: '75%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            )}

            {/* Date Selector */}
            <View style={{ backgroundColor: 'transparent', height: 81, justifyContent: 'center', top: 80, position: 'absolute' }}>
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

            {/* Search & Filter Button */}
            <View style={{
                height: 61, width: 313, backgroundColor: 'transparent', top: 172, position: 'relative',
                borderRadius: 50, borderWidth: 1, borderColor: '#B8F4AA', flexDirection: 'row', alignItems: 'center', paddingLeft: 20
            }}>
                <TextInput style={{ flex: 1, fontSize: 18, color: 'white' }} placeholder='Search' placeholderTextColor={'#FFFFFF'} />
                <TouchableOpacity style={{
                    width: 112, height: 43, backgroundColor: '#B8F4AA', borderRadius: 30,
                    alignItems: 'center', justifyContent: 'center', marginRight: 10
                }} onPress={toggleFilter}>
                    <Text style={{ fontSize: 18 }}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Turf List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}
                style={{ marginTop: 200 }}
            >
                {turfs.map((turf) => (
                    <View key={turf.id} style={{
                        height: 150, width: 308, backgroundColor: 'transparent',
                        borderBottomWidth: 2, borderColor: '#FFFFFF', marginBottom: 30,
                    }}>
                        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                            <ImageBackground source={turf.image} style={{
                                flex: 1, height: 100, width: 150, position: "absolute", bottom: 0, opacity: 1, left: 20, top: 20
                            }} />
                            <TouchableOpacity
                                style={{
                                    zIndex: 2, width: 112, height: 43, backgroundColor: 'transparent',
                                    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                                    position: 'absolute', left: 40, top: 50, borderWidth: 1, borderColor: 'white'
                                }}
                                onPress={() => navigation.navigate('TurfsMain', { turfDetails: turf })}
                            >
                                <Text style={{ fontSize: 20, color: 'white' }}>Book</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ left: 190, top: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 5 }}>{turf.name}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>{turf.location}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>{turf.time}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' }}>Max {turf.maxPlayers} Players</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </BG2>
    );
};

export default Turf1;
