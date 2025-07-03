import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Modal, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Types
interface ShopItem {
  id: string;
  name: string;
  price: number;
  image: any;
  category: string;
}

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
  tokens: number;
  shopItems: ShopItem[];
  onItemPress: (item: ShopItem) => void;
}

const ShopModal: React.FC<ShopModalProps> = ({
  visible,
  onClose,
  tokens,
  shopItems,
  onItemPress
}) => {
  const renderShopItem = ({ item }: { item: ShopItem }) => (
    <TouchableOpacity 
      style={styles.gridItem} 
      onPress={() => onItemPress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.shopContainer}>
          {/* Top bar with tokens */}
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <View style={styles.tokenContainer}>
              <Ionicons name="leaf" size={20} color="#4CAF50" />
              <Text style={styles.tokenCount}>{tokens}</Text>
              <Text style={styles.tokenLabel}>Tokens</Text>
            </View>
            
            <View style={styles.placeholder} />
          </View>

          {/* Shop title */}
          <View style={styles.shopHeader}>
            <Text style={styles.shopTitle}>🌱 EcoShop</Text>
            <Text style={styles.shopSubtitle}>Grow your virtual garden</Text>
          </View>

          {/* Items grid */}
          <FlatList
            data={shopItems}
            renderItem={renderShopItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  shopContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 5,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tokenCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 5,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#4caf50',
    marginLeft: 5,
  },
  placeholder: {
    width: 34, // Same as close button width
  },
  shopHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  shopSubtitle: {
    fontSize: 14,
    color: '#4caf50',
  },
  gridContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  itemInfo: {
    alignItems: 'center',
    width: '100%',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 3,
  },
});

export default ShopModal;
