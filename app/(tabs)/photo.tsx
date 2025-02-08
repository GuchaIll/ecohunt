import { Text, View, StyleSheet, ImageBackground} from 'react-native';
import ImageViewer from '@/components/ImageView';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

const PlaceholderImage = require('@/assets/images/bottles.jpg');
const BackgroundImage = require('@/assets/images/lightGreenBackground.jpg');

export default function Index() {

     const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
     
     const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

     useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
     }, []);

     const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          setShowAppOptions(true);
        } else {
          alert('You did not select any image.');
        }
      };

      const takePhotoAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled){
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else{
            alert('You did not take any photo.');
        }
      };

    return (
        <ImageBackground source = {BackgroundImage} style = {styles.container}>
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            </View>
            {
                showAppOptions ? (
                    <View /> 
                ) : (
                    <View style = {styles.footerContainer}>
                <Button theme= "primary" label = "Take a photo" onPress={takePhotoAsync}/>
                <Button label = "Choose from gallery" onPress={pickImageAsync}/>
            </View>
                )
            }
            
        </View>
        </ImageBackground>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
    },
    imageContainer: {
      paddingTop: 50,
      flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
      },
   
  });