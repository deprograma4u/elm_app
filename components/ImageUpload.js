import { View, Text, Image, Button, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import ImagePicker from 'react-native-image-picker';
// import { ImagePickerResponse } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const ImageUpload = ({ uploadedImage }) => {
    const [imageSource, setImageSource] = useState(null);


    const pickImage = async () => {
        let result = await launchImageLibrary({
          mediaType: 'photo', 
          allowsEditing: true, 
          aspect: [4, 3], 
          quality: 1, 
        });
      
        if (!result.didCancel) {
            setImageSource(result.assets[0].uri); // Update state with image URI
            uploadedImage(result.assets[0].uri); // Update state with image URI
        }
      };

    const selectImage = () => {
        ImagePicker.showImagePicker({ mediaType: 'photo' }, response => {
          if (!response.didCancel) {
            setImageSource(response.uri);
          }
        });
      };
  return (
    <View>
        <View>
            <View>
                {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200 }} />}
                <Pressable onPress={pickImage} style={[styles.input, {marginTop: 5}]} >
                    <Text>No File Uploaded ...</Text>
                </Pressable>
                {/* <Button title="Select Image"/> */}
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    
    input: {
        padding: 11,
        borderWidth: 2,
        borderColor: '#9586E3',
        backgroundColor: 'white',
        borderRadius: 5,
        width: '100%',
        outlineStyle: 'none',
        color: 'black'
      },
})

export default ImageUpload