import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TurfsMain = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { turfDetails } = route.params || {};

    if (!turfDetails) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'white', fontSize: 20 }}>No Turf Data Available</Text>
            </View>
        );
    }

    const { name, location, time, maxPlayers, image } = turfDetails;
    const seatsAvailable = maxPlayers - 1;

    // Generate seat layout: Occupied seats (white) first, then available seats (empty)
    const seats = [
        ...Array(maxPlayers - seatsAvailable).fill('occupied'), // Occupied seats first
        ...Array(seatsAvailable).fill('available') // Available seats after
    ];

    return (
        <View style={styles.container}>
            {/* Background with Opacity */}
            <ImageBackground source={require("./asset/turfBG.png")} style={styles.background}>
                <View style={styles.overlay} />

                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                {/* Turf Image + Details Container with Semi-Transparent Background */}
                <View style={styles.turfContainer}>
                    {/* Turf Image */}
                    <ImageBackground source={image} style={styles.turfImage} />

                    {/* Turf Information */}
                    <View style={styles.infoContainer}>
                        <Text style={styles.turfName}>{name}</Text>
                        <Text style={styles.turfInfo}>{location}</Text>
                        <Text style={styles.turfInfo}>{time}</Text>
                        <Text style={styles.turfInfo}>Max {maxPlayers} Players</Text>

                        {/* Seat Availability */}
                        <Text style={styles.seatsTitle}>Seats Available: {seatsAvailable}</Text>
                        <View style={styles.seatsContainer}>
                            {seats.map((status, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.seat,
                                        status === 'occupied' ? styles.occupiedSeat : styles.availableSeat,
                                        (index + 1) % 6 === 0 ? { marginRight: 0 } : {} // Wrap after 6 seats
                                    ]} 
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Book Button */}
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookText}>Book Now</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default TurfsMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Background opacity
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        zIndex: 10,
    },
    backText: {
        color: 'white',
        fontSize: 18,
    },
    turfContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 150,
        paddingBottom: 20,
        alignItems: 'center',
    },
    turfImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    infoContainer: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
    },
    turfName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B8F4AA',
    },
    turfInfo: {
        fontSize: 16,
        color: 'white',
        marginTop: 2,
    },
    seatsTitle: {
        fontSize: 18,
        color: '#B8F4AA',
        marginTop: 10,
    },
    seatsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 160, // Ensures wrapping after 6 seats
        marginTop: 5,
    },
    seat: {
        width: 20,
        height: 20,
        borderRadius: 10,
        margin: 5,
    },
    occupiedSeat: {
        backgroundColor: 'white',
    },
    availableSeat: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
    },
    bookButton: {
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: '#B8F4AA',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    bookText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
