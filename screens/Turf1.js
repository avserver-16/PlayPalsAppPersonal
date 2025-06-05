import React, { useEffect, useState } from 'react';
import BG2 from './BG2';
import {
  View, ScrollView, TouchableOpacity, Text, TextInput, Image
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Turf1 = () => {
  const navigation = useNavigation();
  const today = new Date();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [turf, setTurf] = useState([]);
  const [loading, setLoading] = useState(true);
function wordCutter(text) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 6) {
    return text;
  }
  return words.slice(0, 6).join(' ') + '...';
}
  useEffect(() => {
    const fetchTurf = async () => {
      console.log("Fetching Rentals...");
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          console.log("No Token Found");
          return;
        }

        const response = await fetch("https://playpals-l797.onrender.com/turf/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
          }
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setTurf(data);
          //console.log(data[0].profilePhoto)
          console.log(turf.turfPhoto)
          console.log(data[3].turfPhoto[0])

        }
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, []);

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <BG2>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{
        position: 'absolute',
        top: 40, left: 10, zIndex: 10,
      }}>
        <AntDesign name="arrowleft" size={34} color="white" />
      </TouchableOpacity>

      {/* Filter Blur View */}
      {showFilter && (
        <BlurView intensity={100} tint="dark" style={{
          position: 'absolute', width: '100%', height: '100%', zIndex: 3
        }}>
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.01)',
            height: '100%', width: '100%', position: 'absolute',
            top: 0, left: 0, borderRadius: 10,
          }}>
            <View style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderWidth: 3, borderColor: 'white', height: 400,
              width: '95%', alignSelf: 'center', top: 150, borderRadius: 25,
              padding: 20,
            }}>
              <Text style={{ color: 'white', fontSize: 20, paddingBottom: 10 }}>
                Select your preferred turf and book your seats
              </Text>
              <TouchableOpacity>
                <View style={{
                  width: 180, height: 64, borderWidth: 2, borderColor: '#66bb6a',
                  backgroundColor: 'transparent', alignItems: 'center',
                  justifyContent: 'center', borderRadius: 10
                }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>Area</Text>
                </View>
              </TouchableOpacity>
              <TextInput style={{
                backgroundColor: 'white', marginTop: 10, padding: 10, borderRadius: 5
              }} placeholder="Enter location" />
            </View>
            <TouchableOpacity onPress={toggleFilter} style={{
              width: 170, height: 50, backgroundColor: '#66bb6a', borderRadius: 30,
              position: 'absolute', top: '75%', alignSelf: 'center',
              justifyContent: 'center', alignItems: 'center'
            }}>
              <Text style={{ color: 'black', fontSize: 20 }}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}

      {/* Date Selector */}
      <View style={{
        backgroundColor: 'transparent', height: 81, justifyContent: 'center',
        top: 80, position: 'absolute'
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', left: 5 }}
          style={{ width: 323, borderRadius: 20, height: 81 }}>
          {[...Array(10)].map((_, index) => {
            const date = new Date();
            date.setDate(today.getDate() + index);
            const isSelected = selectedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedIndex(index)}
                style={{
                  height: 80, width: 60, marginRight: 20,
                  backgroundColor: isSelected ? '#423E3EB2' : 'black',
                  borderRadius: 15, alignItems: 'center', justifyContent: 'center'
                }}>
                <Text style={{ fontSize: 32, color: 'white' ,fontFamily:'PL'}}>{date.getDate()}</Text>
                <Text style={{ fontSize: 20, color: 'white',fontFamily:'PL' }}>
                  {date.toLocaleString('en-US', { month: 'short' })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Search & Filter Button */}
      <View style={{
        height: 61, width: 313, backgroundColor: 'transparent', top: 172, position: 'relative',
        borderRadius: 50, borderWidth: 1, borderColor: '#66bb6a',
        flexDirection: 'row', alignItems: 'center', paddingLeft: 20
      }}>
        <TextInput style={{ flex: 1, fontSize: 18, color: 'white' }}
          placeholder='Search' placeholderTextColor={'#FFFFFF'} />
        <TouchableOpacity style={{
          width: 112, height: 43, backgroundColor: '#66bb6a', borderRadius: 30,
          alignItems: 'center', justifyContent: 'center', marginRight: 10
        }} onPress={toggleFilter}>
          <Text style={{ fontSize: 18 }}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Turf List */}
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'column', alignItems: 'center',
          paddingTop: 20, paddingBottom: 20
        }}
        style={{ marginTop: 200 }}
      >
        {loading ? (
          <Text style={{ color: 'white', marginTop: 100 }}>Loading turfs...</Text>
        ) : (
          turf.map((item, index) => (
            <View key={index} style={{
              height: 250, width: 308, backgroundColor: 'transparent',
              borderBottomWidth: 2, borderColor: '#FFFFFF', marginBottom: 30,justifyContent:'center'
            }}>
              <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <Image  source={{ uri: item.turfPhoto?.[0] }}style={{
                  flex: 1, height: 80, width: 120, position: "absolute", bottom: 0, opacity: 1, left: 0, top: 20
                }} />
                <TouchableOpacity style={{
                  zIndex: 2, width: 80, height: 30, backgroundColor: '#66bb6a',
                  borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                  position: 'absolute', left: 20, top: 45, borderWidth: 1, borderColor: '#66bb6a'
                }}
                  onPress={() => navigation.navigate('TurfsMain', { turfDetails: item })}
                >
                  <Text style={{ fontSize: 20, color: 'white' ,fontFamily:'PL'}}>Book</Text>
                </TouchableOpacity>
              </View>
              <View style={{ left: 150, top: 0 ,backgroundColor:'transparent',width:180}}>
                <Text style={{
                  fontSize: 20, fontWeight: '600', color: '#FFFFFF', marginBottom: 5,fontFamily:'PB'
                }}>
                  {item.turfName || "Unnamed Turf"}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF',fontFamily:'PL' }}>
                {wordCutter(item.turfLocation || "No Location")}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF' ,fontFamily:'PL'}}>
                  Available Seats: {item.availableSeats ?? 0}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#FFFFFF',fontFamily:'PL',marginBottom:30}}>
                  Rating: {item.ratings ?? 0}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </BG2>
  );
};

export default Turf1;
