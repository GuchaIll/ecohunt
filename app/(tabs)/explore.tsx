import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import ShopModal from '@/components/ShopModal';
import PurchaseConfirmationModal from '@/components/PurchaseConfirmationModal';
import { auth, getUserTokens, deductTokens, createUserDocument, signInAnonymousUser } from '@/config/firebaseConfig';

const { width, height } = Dimensions.get('window');

// Mock shop items data
const shopItems = [
  { id: '1', name: 'Sunflower Seeds', price: 50, image: require('@/assets/images/recycle.jpg'), category: 'seeds' },
  { id: '2', name: 'Rose Seeds', price: 75, image: require('@/assets/images/recycle.jpg'), category: 'seeds' },
  { id: '3', name: 'Tulip Bulbs', price: 100, image: require('@/assets/images/recycle.jpg'), category: 'seeds' },
  { id: '4', name: 'Oak Sapling', price: 200, image: require('@/assets/images/recycle.jpg'), category: 'trees' },
  { id: '5', name: 'Maple Sapling', price: 250, image: require('@/assets/images/recycle.jpg'), category: 'trees' },
  { id: '6', name: 'Pine Sapling', price: 180, image: require('@/assets/images/recycle.jpg'), category: 'trees' },
  { id: '7', name: 'Daisy Seeds', price: 40, image: require('@/assets/images/recycle.jpg'), category: 'seeds' },
  { id: '8', name: 'Lavender Seeds', price: 60, image: require('@/assets/images/recycle.jpg'), category: 'seeds' },
  { id: '9', name: 'Cherry Tree', price: 300, image: require('@/assets/images/recycle.jpg'), category: 'trees' },
  { id: '10', name: 'Herb Garden Kit', price: 120, image: require('@/assets/images/recycle.jpg'), category: 'kits' },
];

// Types
interface ShopItem {
  id: string;
  name: string;
  price: number;
  image: any;
  category: string;
}

export default function Explore() {
  const [shopVisible, setShopVisible] = useState(false);
  const [tokens, setTokens] = useState(0); // Initialize with 0, will load from Firebase
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user tokens from Firebase when component mounts
  useEffect(() => {
    const loadUserTokens = async () => {
      try {
        setLoading(true);
        
        // Check if user is already authenticated
        let user = auth.currentUser;
        if (!user) {
          console.log('No authenticated user found, signing in anonymously...');
          const success = await signInAnonymousUser();
          if (success) {
            user = auth.currentUser;
          }
        }

        if (user) {
          console.log('User is authenticated:', user.uid);
          const userTokens = await getUserTokens(user.uid);
          setTokens(userTokens);
          setLoading(false);
        } else {
          console.log('Failed to authenticate user');
          setTokens(0);
          setLoading(false);
        }

        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            console.log('User authenticated via state change:', user.uid);
            const userTokens = await getUserTokens(user.uid);
            setTokens(userTokens);
          } else {
            console.log('User signed out or not authenticated');
            // Try to sign in anonymously again
            const success = await signInAnonymousUser();
            if (success && auth.currentUser) {
              const userTokens = await getUserTokens(auth.currentUser.uid);
              setTokens(userTokens);
            } else {
              setTokens(0);
            }
          }
          setLoading(false);
        });
        
        return unsubscribe;
      } catch (error) {
        console.error('Error loading user tokens:', error);
        setTokens(0);
        setLoading(false);
      }
    };

    loadUserTokens();
  }, []);

  const handleItemPress = (item: ShopItem) => {
    setSelectedItem(item);
    // Handle purchase logic here
    console.log('Item selected:', item);
  };

  const handlePurchase = async () => {
    if (!selectedItem) return;

    const user = auth.currentUser;
    if (!user) {
      // This shouldn't happen with our new auth flow, but just in case
      console.error('No authenticated user found during purchase');
      Alert.alert('Authentication Error', 'Please restart the app and try again.');
      return;
    }

    try {
      setLoading(true);
      const result = await deductTokens(user.uid, selectedItem.price);
      
      if (result.success) {
        setTokens(result.newTokens);
        setSelectedItem(null);
        Alert.alert(
          'Purchase Successful! 🎉',
          `You've successfully purchased ${selectedItem.name} for ${selectedItem.price} tokens. It has been added to your virtual garden!`,
          [{ text: 'Great!', style: 'default' }]
        );
        // Add item to user's garden/inventory here
      } else {
        Alert.alert(
          'Insufficient Tokens 😔',
          `You need ${selectedItem.price} tokens to purchase this item, but you only have ${result.newTokens} tokens.`,
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Error processing purchase:', error);
      Alert.alert('Error', 'Failed to process purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://sophisticated-well-surf.glitch.me' }} 
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
      
      {/* Floating Shop Button */}
      <TouchableOpacity 
        style={[styles.floatingShopButton, loading && styles.buttonDisabled]} 
        onPress={() => {
          if (loading) return;
          setShopVisible(true);
        }}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Ionicons name="storefront" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>
          {loading ? 'Loading...' : 'Shop'}
        </Text>
      </TouchableOpacity>

      {/* Shop Modal */}
      <ShopModal
        visible={shopVisible}
        onClose={() => setShopVisible(false)}
        tokens={tokens}
        shopItems={shopItems}
        onItemPress={handleItemPress}
      />

      {/* Purchase Confirmation Modal */}
      <PurchaseConfirmationModal
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        tokens={tokens}
        onPurchase={handlePurchase}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  webview: {
    flex: 1,
    zIndex: 1,
  },
  floatingShopButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    left: width / 2 - 60, 
    backgroundColor: '#B2FBA6', 
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 20,
    zIndex: 9999,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#fff',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});