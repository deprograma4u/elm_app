import { View, Text, ScrollView, Pressable, TextInput, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import sanityClient from '../Sanity';
import ImageUpload from '../components/ImageUpload';

const Signup = () => {
    const navigator = useNavigation();

    const [formData, setFormData] = useState(
        {
            _type: 'users',
            fullname: "Junior Joe",
            phone: "0550453427",
            location: "Sunyani",
            account_type: "seller",
            profile: {},
            id_card: {},
            email: "joe@gmail.com",
            password: "meeeeeeee"
        }
    );
    
    const [errors, setErrors] = useState({});
    const [signupErro, setSignupErro] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [selectedPrfoile, setSelectedPrfoile] = useState('');
    const [selectedIdCard, setSelectedIdCard] = useState('');

    const [items, setItems] = useState([
        {label: 'Select Account Type', value: ''},
        {label: 'Sales Person', value: 'seller'},
        {label: 'Laborrer', value: 'laborrer'},
        {label: 'Customer', value: 'customer'}
    ]);

    const handleChangeText = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const saveData = async () => {
        try {
            setIsSigning(true)
            if(formData.name !== "" && formData.price !== "" && formData.category !== "" && formData.location !== "" && formData.description !== ""){
                
                const fetchProfile = await fetch(selectedPrfoile); // Fetching the image data
                const fetchID = await fetch(selectedIdCard); // Fetching the image data

                const blobProfile = await fetchProfile.blob();
                const blobID = await fetchID.blob();

                
                const Profileresponse = await sanityClient.assets.upload('image', blobProfile);
                const IDresponse = await sanityClient.assets.upload('image', blobID);

                formData.profile = {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: Profileresponse._id
                    }
                }

                formData.id_card = {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: IDresponse._id
                    }
                }
                
                const result = await sanityClient.create(formData)
            
                console.log(result);
                setIsSigning(false)
            } else{
                setSignupErro("Please Fill all Input Fields")
                setIsSigning(false)
            }
          
          
        }catch(err){
            console.log("Error: ", err)
        };
    }

    const handleProfileUpload = (img_src) => {
        formData.profile = img_src
        setSelectedPrfoile(img_src)
    }

    const handleIdCardUpload = (img_src) => {
        formData.id_card = img_src
        setSelectedIdCard(img_src)
    }

    const handleSignup = () => {
        saveData()
    }

  return (
    <View style={{height: '100vh'}}>
        <ScrollView style={[styles.container, {minHeight: '100%'}]} showsVerticalScrollIndicator={false}>
            <View></View>
            <View className="p-3" style={{}}>
                <View style={{alignItems:'center'}}>
                    <Pressable onPress={()=>navigator.navigate("HomeTabs")}>
                        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
                    </Pressable>
                    <Text style={{fontSize: '2.3em', fontWeight: '400'}}>Signup Here</Text>
                    {(signupErro.length > 0) && <Text>{signupErro}</Text>}
                </View>

                <View style={{width: '100%', marginTop: 25}}>
                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Full Name *</Text>
                        <TextInput 
                            value={formData.fullname}
                            onChangeText={(text) =>handleChangeText("fullname", text)}
                            placeholder='kojo joe' placeholderTextColor={'#455D79'} style={styles.input} 
                        />
                        {errors.fullname && <Text style={{ color: 'red' }}>{errors.fullname}</Text>}
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Phone *</Text>
                        <TextInput
                            value={formData.phone}
                            onChangeText={(text) =>handleChangeText("phone", text)} 
                            placeholder='233 000 000 000' placeholderTextColor={'#455D79'} style={styles.input} 
                        />
                        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}

                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Location *</Text>
                        <TextInput
                            value={formData.location}
                            onChangeText={(text) =>handleChangeText("location", text)}
                            placeholder='Sunyani' placeholderTextColor={'#455D79'} style={styles.input} 
                        />
                        {errors.location && <Text style={{ color: 'red' }}>{errors.location}</Text>}
                    </View>

                    <View style={{marginTop: 10, zIndex: 10}}>
                        <Text style={{padding: 5}}>Account Type *</Text>
                        <DropDownPicker 
                            open={isOpen}
                            value={formData.account_type}
                            items={items}
                            setOpen={setIsOpen}
                            setValue={(text)=>handleChangeText("account_type", text())}
                            setItems={setItems}
                            zIndex={1}
                            style={[styles.input, {zIndex: 10}]}
                            containerStyle={{zIndex: 10}}
                        />
                        {errors.account_type && <Text style={{ color: 'red' }}>{errors.account_type}</Text>}
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Upload an Image</Text>
                        <ImageUpload uploadedImage={handleProfileUpload} />
                        {errors.profile && <Text style={{ color: 'red' }}>{errors.profile}</Text>}
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Upload an Image</Text>
                        <ImageUpload uploadedImage={handleIdCardUpload} />
                        {errors.id_card && <Text style={{ color: 'red' }}>{errors.id_card}</Text>}
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Email *</Text>
                        <TextInput
                            value={formData.email}
                            onChangeText={(text) =>handleChangeText("email", text)} 
                            placeholder='example@example.com' placeholderTextColor={'#455D79'} style={styles.input} 
                        />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={{padding: 5}}>Password *</Text>
                        <TextInput
                            value={formData.password}
                            onChangeText={(text) =>handleChangeText("password", text)} 
                            placeholder='********' placeholderTextColor={'#455D79'} style={styles.input} 
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                    </View>
                    <View>
                        <Pressable onPress={()=>handleSignup()} style={styles.submitBtn} className={isSigning ? "opacity-50" : ""}>
                            {(isSigning) ? (
                                <Text style={{color: 'white'}}>Signing Up...</Text>

                            ):(
                                <Text style={{color: 'white'}}>Signup</Text>

                            )}
                        </Pressable>
                    </View>
                </View>

                {/* OTHERS */}
                <View style={{width: '100%', marginTop: 20}}>
                    <View>
                    {/* <Pressable>
                        <Text style={{color: '#9586E3'}}>Forgot password? </Text>
                    </Pressable> */}
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                        <Text>Already have an Account? </Text>
                        <Pressable onPress={()=>navigator.navigate("login")}>
                            <Text style={{color: '#9586E3'}}>Login here </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            
        </ScrollView>
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

export default Signup