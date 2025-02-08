import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  const [loaded, setIsLoaded] = useState(false);

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

  return (
    <View style={styles.container}>
      {!loaded ? (
        <Text>Loading...</Text>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          <Marker coordinate={currentPosition} />
        </MapView>
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
});

export default Map;