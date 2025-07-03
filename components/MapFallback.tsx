import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MapFallbackProps {
  onLocationPress?: () => void;
}

export const MapFallback: React.FC<MapFallbackProps> = ({ onLocationPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="map-outline" size={64} color="#666" />
        <Text style={styles.title}>Maps Feature</Text>
        <Text style={styles.description}>
          Interactive maps are available in the full app build.
        </Text>
        <Text style={styles.instructions}>
          To use maps in development:
        </Text>
        <Text style={styles.bullet}>• Create a development build with EAS</Text>
        <Text style={styles.bullet}>• Or use Expo Go on a physical device</Text>
        
        <TouchableOpacity style={styles.button} onPress={onLocationPress}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Get Current Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
