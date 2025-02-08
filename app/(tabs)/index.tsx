import { Image, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/recycle.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleStyle} >Ecohunt</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.headerStyles}>What is ecohunt?</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.semitransparenttext}>
              A scavenger hunt for recycling! Track your progress and environmental impacts! Build a green community and scavenge rather than throwing things away!
        </ThemedText>
        
        <ThemedText>
          <TouchableOpacity onPress = {handleToggleExpand}>
            <ThemedText type="defaultSemiBold">
            {isExpanded ? 'Hide\n' : 'How to play?\n'}  
            </ThemedText>
          </TouchableOpacity>
          {isExpanded && (
          
          <View style={styles.expandedTextContainer}>
          <ThemedText type="defaultSemiBold" style={styles.semitransparenttext}>
            A scavenger hunt for recycling! Track your progress and environmental impacts! Build a green community and scavenge rather than throwing things away!
          </ThemedText>
          </View>
        )}
          
        </ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: "#1D3D47",
  },
  headerStyles: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#1D3D47",
  },
  expandedTextContainer: {
    marginVertical: 8,
    padding: 20,
    backgroundColor: '#ffed87',
    borderRadius: 8,
  },
  semitransparenttext: {
    color: '#332f1c',
  }
});
