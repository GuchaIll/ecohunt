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

     const [predictions, setPredictions] = useState<any[]>([]);
     
     const [photoSize, setPhotoSize] = useState({ width: 320, height: 440 });
     const [imageDimensions, setImageDimensions] = useState({ width: 320, height: 440 });

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
          setPhotoSize({ width: result.assets[0].width, height: result.assets[0].height });
          setShowAppOptions(true);
          uploadImage(result.assets[0].uri);
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
            setPhotoSize({ width: result.assets[0].width, height: result.assets[0].height });
            setShowAppOptions(true);
            uploadImage(result.assets[0].uri);
        } else{
            alert('You did not take any photo.');
        }
      };
    
      const uploadImage = async (uri: string | undefined) => {
        if (!uri) {
          console.error('No image URI provided');
          return;
        }
      
        let formData = new FormData();
        formData.append('file', {
          uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any); // Type assertion to avoid TypeScript error
      
        try {
          let response = await fetch('http://172.26.52.141:5000/predict', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          let json = await response.json();
           setPredictions(json);
           console.log(json);
           console.log(predictions);
        } catch (error) {
          console.error(error);
        }
      };
    
      const renderBoundingBoxes = () => {
        const scaleX = imageDimensions.width / photoSize.width;
        const scaleY = imageDimensions.height / photoSize.height;

        return predictions.map((prediction, index) => {
          const { class: className, confidence, bbox } = prediction;
          const [x, y, boxWidth, boxHeight] = bbox;
          console.log('scaleX:', scaleX, 'scaleY:', scaleY);
          console.log('className:', className, 'confidence:', confidence);
        console.log('x:', x, 'y:', y, 'boxWidth:', boxWidth, 'boxHeight:', boxHeight);
          return (
            <View
              key={index}
              style={[
                styles.boundingBox,
                {
                  left: (x - (boxWidth /2)) * scaleX ,
                  top:  (y + (boxHeight/ 2)) * scaleY,
                  width: boxWidth * scaleX,
                  height: boxHeight * scaleY,
                  zIndex: 1000,
                  
                },
              ]}
            >
              <Text style={styles.label}>
                {className} ({(confidence * 100).toFixed(2)}%)
              </Text>
            </View>
          );
        });
      };

    return (
        <ImageBackground source = {BackgroundImage} style = {styles.container}>
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage } />
            {selectedImage && renderBoundingBoxes()}

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
   boundingBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    zIndex: 1,
  },
  label: {
    backgroundColor: 'red',
    color: 'white',
    padding: 2,
    fontSize: 12,
    position: 'absolute',
    top: -20,
    left: 0,
  },
  });