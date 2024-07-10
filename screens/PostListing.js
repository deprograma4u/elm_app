import { View, Text, ScrollView,Alert, Pressable, Image, StyleSheet, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
// import RNFS from "react-native-fs";

import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage"

// Comps
import ImageUpload from '../components/ImageUpload';
import ModalNav from '../components/ModalNav';
import client from '../Sanity';


const PostListing = () => {
  const navigator = useNavigation();
    // navigator.setOptions({})
    
  const [user, setUser] = useState({})
  const [posting, setPosting] = useState(false)

  const [errors, setErrors] = useState({});
  const [uploadError, setUploadErrors] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState([
      {label: 'Select Category', value: ''},
      {label: 'Material', value: 'material'},
      // {label: 'Laborrer', value: 'laborrer'},
      {label: 'Equipment', value: 'equipment'}
  ]);
  
  const [formData, setFormData] = useState(
    {
        _type: "Listings",
        name: "Test1",
        user_id: {},
        slogan: "Joe",
        price: 300,
        location: "Sunyani",
        category: "material",
        description: "Just Testing To Post Listing",
        image: "",
        rate: 0,
        // user_id: '',
        // slogan: "Joe",
      //   name: "",
      //   price: '',
      //   location: "",
      //   description: "",
      //   image: "",
      //   category: "",
        // rate: "",
    }
  );

  const handleImageUpload = (img_src) => {
    // console
    // formData.image = img_src;
    setSelectedFile(img_src)
  }

  const getUserID = async () =>{
    var myPromise = new Promise((resolve) => {
      resolve(AsyncStorage.getItem("userSession"));
    });
  
    const result = await myPromise;
    formData.user_id = {
        _type: 'reference',
        _ref: result
    }
  }

  const handleChangeText = ({name, value}) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePost = async () => {
    setPosting(true);

    if(formData.name !== "" && formData.price !== "" && formData.category !== "" && formData.location !== "" && formData.description !== ""){

      const fetchImg = await fetch(selectedFile); // Fetching the image data
      const blob = await fetchImg.blob();

      const response = await client.assets.upload('image', blob);

      formData.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: response._id,
        },
      }
  
      const savelist = await client.create(formData);
  
      console.log(savelist)
  
      Alert.alert("success", "Listing Posted!!!")
  
      setPosting(false)

    } else{
      setUploadErrors("Please Provide All Input Fields")
      setPosting(false)

    }

  }
  
  
  useFocusEffect((
    React.useCallback(()=>{
      getUserID();
    }, [])
  ))

  return (
    <View>
      <View style={{height: '100vh'}}>
        <ModalNav title='' arrowColor='white'  />
        <ScrollView style={[styles.container, {minHeight: '100%'}]} showsVerticalScrollIndicator={false}>
            <View>
                <View className="p-3">
                    <View style={{alignItems:'center'}}>
                        {/* <Pressable onPress={()=>navigator.navigate("(tabs)")}>
                            <Image source={logo} style={styles.logo} />
                        </Pressable> */}
                        <Text style={{fontSize: '2.3em', fontWeight: '400'}}>Post A Listing</Text>
                        <Text style={{ color: 'red' }}>{uploadError}</Text>
                    </View>
                    <View style={{width: '100%', marginTop: 25}}>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Name *</Text>
                            <TextInput
                                value={formData.name}
                                onChangeText={(text) =>handleChangeText("name", text)}
                                placeholder='Listing Name' placeholderTextColor={'#455D79'} style={styles.input} 
                            />
                            {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Slogan *</Text>
                            <TextInput
                                value={formData.slogan}
                                onChangeText={(text) =>handleChangeText("name", text)}
                                placeholder='Listing Name' placeholderTextColor={'#455D79'} style={styles.input} 
                            />
                            {errors.slogan && <Text style={{ color: 'red' }}>{errors.slogan}</Text>}
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Price *</Text>
                            <TextInput
                                value={formData.price}
                                onChangeText={(text) =>handleChangeText("price", text)}
                                placeholder='00.00' placeholderTextColor={'#455D79'} style={styles.input} 
                            />
                            {errors.price && <Text style={{ color: 'red' }}>{errors.price}</Text>}
                        </View>
                        <View style={{marginTop: 10, zIndex: 10}}>
                            <Text style={{padding: 5}}>Category *</Text>
                            <DropDownPicker 
                                open={isOpen}
                                value={formData.category}
                                items={items}
                                setOpen={setIsOpen}
                                setValue={(text)=>handleChangeText("category", text())}
                                // setValue={setSelectedValue}
                                // onChangeValue={(text)=>handleChangeText("category", text)}
                                // onChangeValue={(text)=>handleChangeText("category", text)}
                                setItems={setItems}
                                zIndex={1}
                                style={[styles.input, {zIndex: 10}]}
                                containerStyle={{zIndex: 10}}
                                
                            />
                                {/* {items.map((item) => (
                                    <DropDownPicker.Item key={item.id} label={item.label} value={item.value} />
                                ))}
                            </DropDownPicker> */}
                            {errors.category && <Text style={{ color: 'red' }}>{errors.category}</Text>}
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Upload an Image</Text>
                            <ImageUpload uploadedImage={handleImageUpload} />
                            {errors.image && <Text style={{ color: 'red' }}>{errors.image}</Text>}
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Location *</Text>
                            <TextInput
                                value={formData.location}
                                onChangeText={(text) =>handleChangeText("location", text)}
                                placeholder='Sunyani' placeholderTextColor={'#455D79'} style={styles.input} />
                            {errors.location && <Text style={{ color: 'red' }}>{errors.location}</Text>}
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{padding: 5}}>Description *</Text>
                            <TextInput
                                value={formData.description}
                                onChangeText={(text) =>handleChangeText("description", text)}
                                multiline={true} numberOfLines={5} placeholder='Describe Produt' 
                                placeholderTextColor={'#455D79'} style={styles.input} 
                            />
                            {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}
                        </View>
                        <View>
                        <Pressable disabled={posting} onPress={() => handlePost()} style={styles.submitBtn} className={posting ? "opacity-50": ''}>
                          {(posting)?(
                            <Text style={{color: 'white'}}>Posting Listing ...</Text>
                            
                          ):(
                            <Text  style={{color: 'white'}}>Post Listing</Text>

                          )}
                        </Pressable>
                        </View>
                    </View>

                    {/* OTHERS */}
                    <View style={{width: '100%', marginTop: 100}}>
                        <View>
                        {/* <Pressable>
                            <Text style={{color: '#9586E3'}}>Forgot password? </Text>
                        </Pressable> */}
                        </View>
                        {/* <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                            <Text>Already have an Account? </Text>
                            <Pressable onPress={()=>navigator.navigate("login")}>
                                <Text style={{color: '#9586E3'}}>Post Listing</Text>
                            </Pressable>
                        </View> */}
                    </View>
                </View>
            </View>
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
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
  logo: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  submitBtn: {
    padding: 10,
    backgroundColor: '#9586E3',
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 7
  }
});

export default PostListing