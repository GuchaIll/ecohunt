import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types
interface ShopItem {
  id: string;
  name: string;
  price: number;
  image: any;
  category: string;
}

interface PurchaseConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  item: ShopItem | null;
  tokens: number;
  onPurchase: () => void;
  loading?: boolean;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  visible,
  onClose,
  item,
  tokens,
  onPurchase,
  loading = false
}) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.confirmationOverlay}>
        <View style={styles.confirmationContainer}>
          <Image source={item.image} style={styles.confirmationImage} />
          <Text style={styles.confirmationTitle}>{item.name}</Text>
          <View style={styles.confirmationPrice}>
            <Ionicons name="leaf" size={20} color="#4CAF50" />
            <Text style={styles.confirmationPriceText}>{item.price} tokens</Text>
          </View>
          
          <View style={styles.confirmationButtons}>
            <TouchableOpacity 
              style={[styles.confirmButton, { backgroundColor: '#f0f0f0' }]}
              onPress={onClose}
            >
              <Text style={[styles.confirmButtonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.confirmButton, { 
                backgroundColor: tokens >= item.price ? '#4CAF50' : '#ccc' 
              }]}
              onPress={onPurchase}
              disabled={tokens < item.price || loading}
            >
              <Text style={styles.confirmButtonText}>
                {loading ? 'Processing...' : 
                 tokens >= item.price ? 'Buy Now' : 'Not Enough Tokens'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    margin: 20,
    minWidth: 280,
  },
  confirmationImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  confirmationPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 5,
  },
  confirmationButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  confirmButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PurchaseConfirmationModal;
