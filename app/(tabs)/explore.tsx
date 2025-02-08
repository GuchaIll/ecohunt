import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function Explore() {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://sophisticated-well-surf.glitch.me' }} 
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});