import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
//import { REACT_APP_GOOGLE_API_KEY } from '@env';
import {Text, View, StyleSheet} from 'react-native';
import { useMemo, useState, useEffect } from "react";
import * as Location from "expo-location";
import "./Map.css";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCG--r9Tici0asEOUAFk9d8noXxRm0RdKE",
  });
 
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
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
        setCurrentPosition({ lat: latitude, lng: longitude });
        setIsLoaded(true);
      } catch (error) {
        console.error("Error getting current position:", error);
      }
    };

    getLocation();
  }, []);

  const center = useMemo(() => currentPosition, [currentPosition]);

  return (
    <View className="App">v
      {!isLoaded ? (
        <Text>Loading...</Text>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        />
      )}
    </View>
  );
};

export default Map;