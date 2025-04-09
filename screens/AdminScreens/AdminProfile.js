import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [adminName, setAdminName] = useState('Admin Name');
  const [email, setEmail] = useState('admin@example.com');
  const [contactNumber, setContactNumber] = useState('9876543210');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Admin Profile</Text>
      </LinearGradient>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('./../asset/cKit.png') // use your admin avatar fallback here
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </View>
            
      <View style={styles.formSection}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={adminName}
          onChangeText={setAdminName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <LinearGradient
          colors={['#0284c7', '#0ea5e9']}
          style={styles.gradientButton}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  changePhotoText: {
    marginTop: 8,
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
  },
  formSection: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#0f172a',
  },
  saveButton: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
