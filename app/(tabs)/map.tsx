import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the plus sign

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  const [loaded, setIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentPosition({ latitude, longitude });
        setIsLoaded(true);
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    };

    getLocation();
  }, []);

  const region = useMemo(() => ({
    ...currentPosition,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }), [currentPosition]);

  const handleGetCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentPosition({ latitude, longitude });
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {!loaded ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            followsUserLocation
          >
            <Marker coordinate={currentPosition} />
          </MapView>
          <View>
            <Text>Latitude: {currentPosition.latitude}</Text>
            <Text>Longitude: {currentPosition.longitude}</Text>
          </View>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="red" />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Add a new scavenge</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Image URL"
                  value={image}
                  onChangeText={setImage}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
                <Button title="Get Current Location" onPress={handleGetCurrentLocation} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 100,
    backgroundColor: 'red',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000, // Ensure the FAB is on top
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  }
});

export default Map;