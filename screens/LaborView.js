import { View, Text, ScrollView, ImageBackground, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import AsyncStorage from "@react-native-async-storage/async-storage"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import ModalNav from '../components/ModalNav'
import client, { urlFor } from '../Sanity'

// import MapView, { Marker } from 'react-native-maps';

import styles from '../components/styles'

const LaborView = () => {
    
    const route = useRoute();
    const laborId = route.params?.laborId;

    const [chosen, setChosen] = useState([])
    const [isBooking, setIsBooking] = useState(false)

    const chosenLaborrer = async () =>{
        await client.fetch(`
            *[_type == "users" && _id=="${laborId}"]{
                ...,
                profile
            }
        `).then((data)=>{
            setChosen(data[0])
        })
    }

    const handleBookBtn = async () => {
        setIsBooking(true)
        var myPromise = new Promise((resolve) => {
            resolve(AsyncStorage.getItem("userSession"));
          });
        
          const result = await myPromise;
          
          if(result.length > 0){
            // setLogedIn(true)
            
            const formData = {
                _type: 'bookings',
                name: chosen.fullname,
                user_id: {
                    _type: 'reference',
                    _ref: result
                },
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: chosen.profile.asset._ref
                    }
                },
                seller_id: {
                    _type: "reference",
                    _ref: chosen._id
                },
                list_id: {
                    _type: "reference",
                    _ref: chosen._id
                },
                price: 0,
                category: chosen.account_type,
                status: 'pending',
                action: 'book',

            }

            const buyBook = await client.create(formData)

            console.log(buyBook)
            setIsBooking(false)
            
        } else{
            Alert.alert("Error", "Please Login to your Account Before Buying")
            setIsBooking(false)
          }
    }

    useEffect(()=>{
        chosenLaborrer();
    }, [])

  return (
    <View>
        <View style={{height: "100vh"}}>
            <View style={{backgroundColor: 'white', flex:1}}>
                
                <ScrollView style={[styles.container, {height: "100%"}]} showsVerticalScrollIndicator={false}>
                    <View>
                        {/* Banner */}
                        <View style={{height: 350}}>
                            {(chosen.length !=0) &&  
                                <ImageBackground source={{ uri: urlFor(chosen.profile).url() }} style={{height: '100%'}}>
                                    <ModalNav title='' arrowColor='white' />
                                </ImageBackground>
                            }
                        </View>

                        {/* Details */}
                        <View style={custom.banner}>
                            {/* Top Detail */}
                            <View style={[styles.justify_row_between, custom.banner_title]}>
                                <View>
                                    <Text style={styles.h2}>{chosen.fullname}</Text>
                                    <Text style={styles.small}>{chosen.location}</Text>
                                </View>
                                {/* <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:8}}>
                                    <FontAwesomeIcon icon={faStar} color={'orange'} size={15} />
                                    <Text style={{color:'balck', fontWeight:'500', fontSize:15}}>{chosen.rate}</Text>
                                </View> */}
                            </View>

                            {/* Bottom */}
                            <View style={{marginTop: 30}}>
                                <View style={custom.description}>
                                    <Text style={styles.h2}>Description</Text>
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Text>Phone: </Text>
                                        <Text style={{padding: 5}}>
                                            {chosen.phone}
                                        </Text>
                                    </View>
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Text>Email: </Text>
                                        <Text style={{padding: 5}}>
                                            {chosen.email}
                                        </Text>
                                    </View>
                                </View>
                                <View style={custom.description}>
                                    <View>
                                        <Text style={styles.h2}>Location</Text>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                                            {/* <MapView style={{width: "100%", height: "100%"}}>
                                                <Marker 
                                                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }} // Marker position
                                                    title="My Location" // Marker title (optional)
                                                    description="This is a marker"
                                                />
                                            </MapView> */}
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    {(chosen.category == 'material') ? (

                                    <Pressable disabled={isBuying} onPress={()=>handleBuyBtn()} style={custom.book_btn} className={isBuying ? "opacity-50" : ""}>
                                        {(isBuying)?(
                                            <Text style={{color: 'white'}}>Buying Material ...</Text>

                                        ):(
                                            <Text style={{color: 'white'}}>Buy Now</Text>

                                        )}
                                    </Pressable>
                                    
                                    ) : (

                                    <Pressable disabled={isBooking} onPress={()=>handleBookBtn()} style={custom.book_btn} className={isBooking ? "opacity-50" : ""}>
                                        {(isBooking)?(
                                            <Text style={{color: 'white'}}>Booking Equipment ...</Text>

                                        ):(
                                            <Text style={{color: 'white'}}>Book Now</Text>

                                        )}
                                    </Pressable>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    </View>
  )
}


const custom = StyleSheet.create({
    banner: {
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      top: -20,
      height: 'fit-content',
      padding: 15
    },
    banner_title: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
  
    },
    description: {
      minHeight: 250,
      // padding: 5
    },
    book_btn: {
      padding: 10,
      backgroundColor: '#9586E3',
      marginTop: 15,
      alignItems: 'center',
      borderRadius: 7
    }
  })

export default LaborView