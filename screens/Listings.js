import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import AsyncStorage from "@react-native-async-storage/async-storage"

import styles from '../components/styles'
import TopNav from '../components/TopNav'
import client from '../Sanity'
import BookingItem from '../components/bookingItem'

const Listings = () => {
  const navigator = useNavigation();

  const [data] = useState([1, 2, 3, 4])
  const [hisData] = useState([1, 2, 3])
  const [user, setUser] = useState([])

  const [hasBookings, setHasBookings] = useState(false)
  const [hasHistory, setHasHistory] = useState(false)

  const [userBookings, setUserBookings] = useState([])
  const [userBookingsHistory, setUserBookingsHistory] = useState([])
  
  const [logedIn, setLogedIn] = useState(false)

  const fetchBookingsData = async () => {
    var myPromise = new Promise((resolve) => {
      resolve(AsyncStorage.getItem("userSession"));
    });
  
    const result = await myPromise;
    
    if(result.length > 0){
      setLogedIn(true)

      // Fecthing User Completed Bookings
      await client.fetch(`
        *[_type=="bookings" && status == "completed" && user_id._ref == "${result}"]{
          ...
        }
      `)
      .then((data)=>{
        if(data.length > 0){
          setUserBookingsHistory(data);
          setHasHistory(true)
        }
      })

      
      // Fecthing User Pending Bookings
      await client.fetch(`
        *[_type=="bookings" && status == "pending" && user_id._ref == "${result}"]{
          ...
        }
      `)
      .then((data)=>{
        if(data.length > 0){
          setUserBookings(data);
          setHasBookings(true)
  
        }
      })

    } else{
      setLogedIn(false)
    }
  }


  useFocusEffect((
    React.useCallback(()=> {
      fetchBookingsData()
      // if(userID.length > 0){
      //   console.log("User Logged IN")
      // }

    }, [])
  ))

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TopNav title={'LISTINGS'} />
        {/* <Text style={styles.h1}>{title}</Text> */}
        {(logedIn)?(
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.h2}>Recent</Text>
            </View>
            {(hasBookings) ? (
              <FlatList
                data={userBookings}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>  <BookingItem list={item} />}
                keyExtractor={(item)=>item._id}
              />

            ): (
              <View style={{alignItems: 'center', height: 300}}>
                <Text style={{ color: '#9586E3', fontSize: 13 }}>No Recent Bookings / Purchase To SHow</Text>
              </View>
            )}
            <View style={{marginTop: 25}}>
              <Text style={styles.h2}>History</Text>
            </View>
            {(hasHistory) ? (
              <FlatList
                data={userBookingsHistory}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>  <BookingItem list={item} />}
                keyExtractor={(item)=>item._id}
                // renderItem={renderHistory}
              />

            ): (
              <View style={{alignItems: 'center', height: 300}}>
                <Text style={{ color: '#9586E3', fontSize: 13 }}>No Bookings / Purchase History To SHow</Text>
              </View>
            )}
          </ScrollView>
        ):(
          <View  style={{ height: "100vh", alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#9586E3', fontSize: 13 }}>Please Login To Your Account</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Listings