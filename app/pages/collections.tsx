import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Collections() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Collections</Text>
      <Text style={styles.subtitle}>Your eco-friendly achievements and collected items will appear here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
  },
});
