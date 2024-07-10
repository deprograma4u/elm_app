import { View, Text, Image, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import styles from '../components/styles'

const Account = ({title=''}) => {
    const navigator = useNavigation();
    const [data] = useState([1, 2, 3, 4]);
  
    const [user, setUser] = useState({})
    const [userListings, setUserListings] = useState({})
    const [logedIn, setLogedIn] = useState(false)
    const [hasListings, setHasListings] = useState(false)
  
  return (
    <View>
        <View style={[styles.container, {position: 'relative'}]}>    
            <View style={{height:5}}></View>
            <ScrollView>
                {(logedIn) ? (
                    <View style={styles.profile_container}>
                    <View style={styles.profile_header}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={{uri: ''}} style={{width: 80, height: 80, borderRadius: 50}} />
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
                    <View style={{marginTop: 15}}>
                        <View>
                            <Text style={[styles.h2, {color: 'gray'}]}>Listinings History</Text>
                            <FlatList
                                data={data}
                                horizontal={true}
                                // renderItem={({item, index}) => }
                                showsHorizontalScrollIndicator={false}
                                style={{display: 'flex', flexDirection: 'row' , flexWrap: 'wrap'}}

                            />
                            </View>
                            <View>

                            </View>
                        </View>
                        <View style={custom.floatBtn}>
                            <Pressable onPress={()=>navigator.navigate("postListing")}>
                                <FontAwesomeIcon icon={faCartPlus} size={25} color={'white'} />
                            </Pressable>
                        </View>
                    </View>
                    
                ): (
                    <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{ color: '#9586E3', fontSize: 18 }}>Please Login First</Text>
                    </View>
                    <Pressable onPress={()=> navigator.navigate("login")} style={{backgroundColor: '#9586E3'}} />
                    </View>
                )}
            </ScrollView>
        </View>
    </View>
  )
}


const custom = StyleSheet.create({
    floatBtn: {
      position: 'absolute',
      bottom: 30,
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

export default Account