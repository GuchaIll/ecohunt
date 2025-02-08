import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ImageBackground, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width, height } = Dimensions.get('window');

const lightBackground = require('@/assets/images/doodleBackground.jpg');

export default function ProfileComp() {
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > height / 3) {
      setShowAdditionalSection(true);
    } else {
      setShowAdditionalSection(false);
    }
  };

  return (
    <ImageBackground source = {lightBackground} style = {styles.container}>
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollViewContent} 
      onScroll={handleScroll} 
      scrollEventThrottle={16}
      maximumZoomScale={3}
      minimumZoomScale={1}
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('@/assets/images/profile/2633.jpg')} // Replace with actual profile image URL
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.nameText}>Gingko</Text>
          <Text style={styles.startDateText}>Start Date: January 1, 2023</Text>
          <Text style={styles.streakText}>3 days streak!</Text>
        </View>
      </View>

     {/* Bottom Section */}
     <View style={styles.bottomSection}>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#A9AD7D' }]} activeOpacity={0.7}>
            <Text style={[styles.gridText, styles.widgetHeader]}>Environmental Impact</Text>
            <Text style={[styles.gridText, styles.widgetSubHeader]}>Tree saved</Text>
            <Text style={[styles.gridText, styles.widgetSubHeader]}>Energy saved</Text>
            <Text style={[styles.gridText, styles.widgetSubHeader]}>Plastic recycled</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#E3B57A' }]} activeOpacity={0.7}>
            <Text style={styles.gridText}>Weekly Contributions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#D97A4A' }]} activeOpacity={0.7}>
            <Text style={styles.gridText}>Badges</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#AFCDE3' }]} activeOpacity={0.7}>
            <Text style={styles.gridText}>Monthly tracker</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Section */}
      {showAdditionalSection && (
        <View style={styles.additionalSection}>
          <Text style={styles.additionalText}>This is an additional section that is only visible when you scroll down.</Text>
        </View>
      )}
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    
  },
  topSection: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff'
    
  },
  profileImageContainer: {
    width: width / 3,
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: width / 6,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  startDateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  streakText: {
    fontSize: 16,
    color: '#ff6347',
    marginTop: 10,
  },
  bottomSection: {
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 60) / 2,
    height: (height - 60) / 4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  additionalText: {
    fontSize: 16,
    color: '#333',
  },
  widgetHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
  widgetSubHeader:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#415226',
  }
});