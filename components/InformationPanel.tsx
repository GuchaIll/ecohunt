import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    itemClass: string;
  };
const InformationPanel: React.FC<Props> = ({  itemClass }) => {
  const renderInformation = () => {
    switch (itemClass) {
      case 'biodegradable':
        return 'Biodegradable waste can be composted and turned into nutrient-rich soil.';
      case 'cardboard':
        return 'Cardboard can be recycled and used to make new paper products.';
      case 'glass':
        return 'Glass can be recycled indefinitely without losing quality or purity.';
      case 'metal':
        return 'Metal can be recycled and used to make new metal products, saving energy and resources.';
      case 'paper':
        return 'Paper can be recycled and used to make new paper products, reducing the need for new raw materials.';
      case 'plastic':
        return 'Plastic can be recycled into new products, but it is important to reduce plastic use and properly recycle it.';
      default:
        return 'Unknown item class.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Information</Text>
      <Text style={styles.text}>{renderInformation()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
    marginTop: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default InformationPanel;