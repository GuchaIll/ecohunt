import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Button, TouchableOpacity, Image, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the plus sign
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot} from 'firebase/firestore';
import { db, hotspotColRef, trashcanColRef  } from '../../config/firebaseConfig'; // Adjust the import path as needed
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MapFallback } from '@/components/MapFallback';
import { MapErrorBoundary } from '@/components/MapErrorBoundary';


const hotspotMarkerImage = require('@/assets/images/recycling.png');
const trashcanMarkerImage = require('@/assets/images/garbage.png');

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  const [loaded, setIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [mapError, setMapError] = useState(false);

  const [hotspots, setHotspots] = useState<{ id: string; name: string; image: string | null; description: string | null; location: { latitude: number; longitude: number } }[]>([]);
  const [trashcans, setTrashcans] = useState<{ id: string; location: { latitude: number; longitude: number } }[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<{ name: string; image: string | null; description: string | null } | null>(null);


  useEffect(() => {
    const unsubscribeHotspots = onSnapshot(hotspotColRef, (snapshot) => {
      const hotspotData = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image || hotspotMarkerImage,
        name: doc.data().name || 'Default',
        location: {
          latitude: doc.data().location.latitude,
          longitude: doc.data().location.longitude,
        },
        description: doc.data().description || 'No description',
      }));
      setHotspots(hotspotData);
      console.log('Hotspot data:', hotspotData);
    });

    const unsubscribeTrashcans = onSnapshot(trashcanColRef, (snapshot) => {
      const trashcanData = snapshot.docs.map((doc) => ({
        id: doc.id,
        location: {
          latitude: doc.data().location.latitude,
          longitude: doc.data().location.longitude,
        },
      }));
      setTrashcans(trashcanData);
      console.log('Trashcan data:', trashcanData);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeHotspots();
      unsubscribeTrashcans();
    };
  }, []);


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

  const AppendNewLocationToDatabase = async () => {
    try {
      const docRef = await addDoc(hotspotColRef, {
        name,
        image,
        description,
        location: { latitude: currentPosition.latitude, longitude: currentPosition.longitude },
      });
      console.log('Document written with ID:', docRef.id);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  const onMarkerSelected = (currentName : string) => {
    setSelectedMarker({ name, image, description });
    setTimeout(() => setSelectedMarker(null), 5000);

  };

  const calloutPressed = () => {
    //alert('Callout pressed');
  };

  return (
    <View style={styles.container}>
      {!loaded ? (
        <Text>Loading...</Text>
      ) : mapError ? (
        <MapFallback onLocationPress={handleGetCurrentLocation} />
      ) : (
        <MapErrorBoundary fallback={<MapFallback onLocationPress={handleGetCurrentLocation} />}>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            followsUserLocation
          >
            <Marker coordinate={currentPosition} />
            {hotspots.map((hotspot) => (
              <Marker
                key={hotspot.id}
                coordinate={hotspot.location}
                title={'Hotspot'}
                pinColor = 'blue'
                onPress={() => onMarkerSelected(hotspot.name)}
                image = {require('@/assets/images/recyclingSmall.png')}
                //image={hotspot.image ? { uri: hotspot.image } : hotspotMarkerImage}
                //icon={() => (
                 // <View style={styles.markerIconContainer}>
                 //   <Image source={require('@/assets/images/recycling.png')} style={styles.markerIcon} />
                 // </View>
                //)}
              >
              <Callout onPress={calloutPressed}>
							<View style={{ padding: 10 }}>
								<Text style={{ fontSize: 24 }}>{hotspot.name}</Text>
                <Text style={{ fontSize: 16, flexWrap: 'wrap'}}>{hotspot.description}</Text>
							</View>
						</Callout>
              </Marker>
            ))}

            
            {trashcans.map((trashcan) => (
              <Marker
                key={trashcan.id}
                coordinate={trashcan.location}
                image={trashcanMarkerImage}
              />
            ))}
          </MapView>
          <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
            <Text>Latitude: {currentPosition.latitude}</Text>
            <Text>Longitude: {currentPosition.longitude}</Text>
          </View>
          {selectedMarker && (
            <View style={styles.selectedMarkerFab}>
              <Text style={styles.selectedMarkerText}>{selectedMarker.name}</Text>
              {selectedMarker.image && <Image source={{ uri: selectedMarker.image }} style={styles.selectedMarkerImage} />}
              <Text style={styles.selectedMarkerText}>{selectedMarker.description}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setModalVisible(true)}
          >
            
            <IconSymbol name="plus" size={36} color="black" />
          </TouchableOpacity>
        </MapErrorBoundary>
      )}
      
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
            <Button title="Submit" onPress={AppendNewLocationToDatabase} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    bottom: 120,
    right: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 80,
    height: 80,
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
  },
  selectedMarkerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedMarkerImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  selectedMarkerFab: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000, // Ensure the FAB is on top
  },
});

export default Map;