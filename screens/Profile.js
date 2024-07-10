import { View, Text, Image, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import styles from '../components/styles'
import client, { urlFor } from '../Sanity'
import PostItem from '../components/PostItem'
import BookingItem from '../components/bookingItem'

const Profile = () => {
  const navigator = useNavigation();
  const [data] = useState([1, 2, 3, 4]);

  const [user, setUser] = useState({})
  const [id, setID] = useState("")

  const [userListings, setUserListings] = useState({})
  const [hasListings, setHasListings] = useState(false)
  

  const [userBookings, setUserBookings] = useState({})
  const [hasBookings, setHasBookings] = useState(false)

  const [logedIn, setLogedIn] = useState(false)

  const fetchUser = async () => {
    const myPromise = new Promise((resolve) => {
        resolve(AsyncStorage.getItem("userSession"));
        });
    
        const result = await myPromise;
        
        if(result.length > 0){

            await client.fetch(`
                *[ _type == "users" && _id == "${result}" ]{
                    ...
            }
            `)
            .then((data)=>{
                if(data.length > 0){
                    setUser(data[0]);
                    setLogedIn(true)

                    client.fetch(`
                        *[_type == "Listings" && user_id._ref == "${result}" ]
                    `)
                    .then((list)=>{
                        if(list.length > 0){
                            console.log(list)
                            setUserListings(list)
                            setHasListings(true)

                        } else{
                            setHasListings(false)
                        }
                    })

                    client.fetch(`
                      *[_type=="bookings" && seller_id._ref == "${result}"]  
                    `)
                    .then((bookings)=>{
                        if(bookings.length > 0){
                            setUserBookings(bookings);
                            setHasBookings(true)

                        } else{
                            setHasBookings(false)
                        }
                    })
                }
            })
        }
    }

    useEffect(()=>{
        // getPromiseResult()
        fetchUser();
    }, [])

  return (
    <View>
      <View style={[{height: '100vh', position: 'relative'}]}>
        <View style={{height:5}}></View>
        <ScrollView style={[styles.container, {minHeight: '100%'}]} showsVerticalScrollIndicator={false}>
            {(logedIn) ? (
                <View style={[styles.profile_container, {minHeight: '100%', marginBottom: 50}]}>
                    <View style={styles.profile_header}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={{uri: urlFor(user.profile)}} style={{width: 80, height: 80, borderRadius: 50}} />
                            <Text style={[styles.h2, {color: 'white', marginTop: 10}]}>{user.fullname}</Text>
                            <Text style={[styles.small, {color:'white'}]}>{user.account_type}</Text>
                        </View>
                        <View style={{width: '100%', alignItems:'center', marginTop: 20}}>
                            <View style={[styles.justify_row_between, {width: '70%', alignItems: 'center'}]}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={[styles.h2, {color: 'white'}]}>7k</Text>
                                    <Text style={[styles.small, {color: 'white'}]}>Lisints</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={[styles.h2, {color: 'white'}]}>2</Text>
                                    <Text style={[styles.small, {color: 'white'}]}>Oders</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={[styles.h2, {color: 'white'}]}>5</Text>
                                    <Text style={[styles.small, {color: 'white'}]}>Delivered</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* ### Profile Body */}

                    {(user.account_type == "seller") && 
                        <>
                            <View style={{marginTop: 15}}>
                                <View>
                                    <Text style={[styles.h2, {color: 'gray'}]}>Listinings History</Text>
                                    {(hasListings)?(
                                        <FlatList
                                            data={userListings}
                                            horizontal={true}
                                            renderItem={({item, index}) => <PostItem post={item} />}
                                            keyExtractor={(item)=>item._id}
                                            showsHorizontalScrollIndicator={false}

                                        />
                                    ):(
                                        <View  style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#9586E3', fontSize: 13 }}>User Has No listings Yet</Text>
                                        </View>
                                    )}
                                    
                                </View>

                                <View>
                                    <Text style={[styles.h2, {color: 'gray'}]}>Bookings History</Text>
                                    {(hasBookings)?(
                                        <FlatList
                                            data={userBookings}
                                            horizontal={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({item, index}) => <BookingItem list={item}  />}
                                            keyExtractor={(item)=>item._id}

                                        />
                                    ):(
                                        <View  style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#9586E3', fontSize: 13 }}>No one Has booked your Products Yet</Text>
                                        </View>
                                    )}
                                    
                                </View>
                                <View>

                                </View>
                            </View>                        
                        </>
                    }
                    
                </View>
                
            ): (
                <View style={[styles.d_flex, styles.align_center, styles.justify_center, {height: '100%', width: '100vw'}]}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{ color: '#9586E3', fontSize: 18 }}>Please Login First</Text>
                    </View>
                    <View className="flex-1 justify-center items-center" style={styles.align_center}>
                        <Pressable onPress={()=> navigator.navigate("login")} style={[styles.submitBtn, {width: 120}]}>
                            <Text className="text-white">Login Here</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </ScrollView>
        {((logedIn) && (user.account_type == "seller")) && 
            <View style={custom.floatBtn}>
                <Pressable onPress={()=>navigator.navigate("postlisting")}>
                    <FontAwesomeIcon icon={faCartPlus} size={25} color={'white'} />
                </Pressable>
            </View>
        
        }

      </View>
    </View>
  )
}


const custom = StyleSheet.create({
    floatBtn: {
      position: 'absolute',
      bottom: 60,
      right: 30,
      padding: 20,
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#9586E3',
      alignItems: 'center',
      justifyContent: 'center',

    }
  })

export default Profile