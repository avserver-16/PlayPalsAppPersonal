import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const TurfPayment = () => {
  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('UPI');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./asset/turfBG.png')} style={styles.background} />
      <View style={styles.overlay} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.heading}>Turf Payment</Text>

        <View style={styles.dropdownWrapper}>
          <Text style={styles.label}>Select number of players:</Text>
          <Picker
            selectedValue={selectedSeats}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSeats(itemValue)}
          >
            {[...Array(10)].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>

        <View style={styles.paymentOptions}>
          <Text style={styles.label}>Choose Payment Method:</Text>
          {['UPI', 'Credit/Debit Card', 'Net Banking'].map((option) => {
            const selected = selectedPayment === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.paymentButton, selected && styles.paymentSelected]}
                onPress={() => setSelectedPayment(option)}
              >
                <View style={styles.paymentRow}>
                  <Icon
                    name={selected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                    size={24}
                    color={selected ? '#4CAF50' : '#555'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.paymentText}>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.payNowButton}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TurfPayment;

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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  heading: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    marginBottom: 25,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  paymentOptions: {
    marginBottom: 30,
  },
  paymentButton: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentSelected: {
    backgroundColor: 'white',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#000',
  },
  payNowButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payNowText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
