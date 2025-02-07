import { Text, View, StyleSheet} from 'react-native';
import ImageViewer from '@/components/ImageView';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/adaptive-icon.png');

export default function Index() {
    return (
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} />
            </View>
            <View style = {styles.footerContainer}>
                <Button theme= "primary" label = "Take a photo"/>
                <Button label = "Choose from gallery"/>
            </View>
        </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
      },
   
  });