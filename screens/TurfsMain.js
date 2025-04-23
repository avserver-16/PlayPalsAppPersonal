
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TurfsMain = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { turfDetails } = route.params || {};
    console.log("Data", turfDetails)
    if (!turfDetails) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'white', fontSize: 20 }}>No Turf Data Available</Text>
            </View>
        );
    }

    const { name, location, time, maxPlayers, image } = turfDetails;
    console.log("maxPlayers:", maxPlayers);
    //const seatsAvailable = 9; // 10 - 1, as you had

    // Ensure maxPlayers is a number and not less than seatsAvailable
    const totalPlayers = parseInt(maxPlayers) || 0;
    const seatsAvailable = Math.min(9, totalPlayers); // prevent more available seats than total
    const occupied = Math.max(0, totalPlayers - seatsAvailable);


    const seats = [
        ...Array(occupied).fill('occupied'),
        ...Array(seatsAvailable).fill('available')
    ];

    return (
        <View style={styles.container}>
            <ImageBackground source={require("./asset/turfBG.png")} style={styles.background}>
                <View style={styles.overlay} />

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.turfContainer}>
                    <ImageBackground source={{ uri: turfDetails.turfPhoto[0] }} style={styles.turfImage} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.turfName}>{turfDetails.turfName}</Text>
                        <Text style={styles.turfInfo}></Text>
                        <Text style={styles.turfInfo}>Time Slot : {turfDetails.availabilitySlots == null ? 9 : turfDetails.availabilitySlots[0].slots[0].start} - {turfDetails.availabilitySlots == null ? 12 : turfDetails.availabilitySlots[0].slots[0].end}</Text>
                        <Text style={styles.turfInfo}>Maximum {turfDetails.totalSeats == null ? 10 : turfDetails.totalSeats} Players</Text>

                        <Text style={styles.seatsTitle}>Seats Available: {turfDetails.availableSeats}</Text>
                        <TouchableOpacity style={{marginTop:20,backgroundColor:'green',height:35,width:160,borderRadius:10,justifyContent:'center',alignItems:'center'}} 
                        onPress={()=>navigation.navigate("TurfReview",{reviewData:turfDetails})}>
                            <Text style={{color:'white',fontSize:15}}>Check Turf Reviews</Text>
                        </TouchableOpacity>
                        <View style={styles.seatsContainer}>
                            {seats.map((status, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.seat,
                                        status === 'occupied' ? styles.occupiedSeat : styles.availableSeat,
                                        (index + 1) % 6 === 0 ? { marginRight: 0 } : {}
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.bookButton} onPress={()=>navigation.navigate("TurfPayment")}>
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
        //overflow: 'hidden',
        marginTop: 90,
        //paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    turfImage: {
        width: '90%',
        height: '60%',
        //resizeMode: 'cover',
        alignSelf: 'center',
        left: 20,
        borderRadius:10,
        bottom:-20
    },
    infoContainer: {
        width: '100%',
        //padding: 15,
        alignItems: 'center',
        top:-50
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
        marginTop: 10,
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
