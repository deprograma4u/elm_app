import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import TopNav from '../components/TopNav'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import sanityClient from '../Sanity'

// Comps
import PostItem from '../components/PostItem'
import LaborItem from '../components/LaborItem'
import styles from '../components/styles'

const Home = () => {
  const navigator = useNavigation();
  const [materials, setMaterials] = useState([])
  const [laborrers, setLaborrers] = useState([])
  const [equipement, setEquipement] = useState([])

  const fetchMaterials = async () =>{
    await sanityClient.fetch(`
      *[_type == "Listings" && category=="material"]{
      ...
    }`).then((data)=>{
      setMaterials(data);
    })
  }

  const fetchEquipments = async () =>{
    await sanityClient.fetch(`
      *[_type == "Listings" && category=="equipment"]{
      ...
    }`).then((data)=>{
      setEquipement(data);
    })
  }

  const fetchLaborrers = async () =>{
    await sanityClient.fetch(`
      *[_type == "users" && account_type=="laborrer"]{
      ...

    }`).then((data)=>{
      setLaborrers(data);
    })
  }

  const fetchData = async () => {
    fetchMaterials();
    fetchEquipments();
    fetchLaborrers();
  }


  useFocusEffect((
    React.useCallback(()=>{
      fetchData();
    }, [])
  ))
  
  return (
    <View style={styles.container}>
      <TopNav showBottom={true} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Equipments */}
        <View className="p-2">
          <View style={{marginTop: 20}}>
            <View style={styles.justify_row_between}>
              <Text style={styles.h2} className="text-gray-500">Equipments</Text>
              <Pressable onPress={()=>navigator.navigate("equipments")} style={{padding:10, display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                <Text style={{color: '#9586E3', fontSize: 13}} className="textl">View All</Text>
                <FontAwesomeIcon icon={faAngleRight} color={'#9586E3'} size={15} />
              </Pressable>
            </View>

            {(equipement.length == 0) ? (
              <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#9586E3', fontSize: 13 }}>No Equipments To SHow</Text>
              </View>
            ) : (
                <FlatList 
                  data={equipement}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) =>  <PostItem post={item} /> }
                  keyExtractor={(item)=>item._id}
                />

              )
            }
          </View>
        </View>

        {/* Laborrers */}
        <View>
            <View style={{marginTop: 20}}>
              <View style={styles.justify_row_between}>
                <Text style={styles.h2} className="text-gray-500">Laborers</Text>
                <Pressable onPress={()=>navigator.navigate("laborrers")} style={{padding:10, display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                  <Text style={{color: '#9586E3', fontSize: 13}} className="textl">View All</Text>
                  <FontAwesomeIcon icon={faAngleRight} color={'#9586E3'} size={15} />
                </Pressable>
              </View>
              
              {(laborrers.length == 0) ? (
                <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#9586E3', fontSize: 13 }}>No Laborrers To Show</Text>
                </View>
              ) : (
                  <FlatList 
                    data={laborrers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // renderItem={renderEquipements}
                    renderItem={({item, index}) =>  <LaborItem labor={item}  />}
                    keyExtractor={(item)=>item._id}
                  />

                )
              }
              
            </View>
        </View>

        {/* Materials */}
        <View>
          <View style={{marginTop: 30, width: '100%'}}>
            <View style={styles.justify_row_between}>
              <Text style={styles.h2} className="text-gray-500">Materials</Text>
              <Pressable onPress={()=>navigator.navigate("materials")} style={{padding:10, display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                <Text style={{color: '#9586E3', fontSize: 13}} className="textl">View All</Text>
                <FontAwesomeIcon icon={faAngleRight} color={'#9586E3'} size={15} />
              </Pressable>
            </View>
            
            {(materials.length == 0) ? (
              <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#9586E3', fontSize: 13 }}>No Materials To SHow</Text>
              </View>
            ) : (
                <FlatList 
                  data={materials}
                  horizontal={true}
                  style={{width: '100%'}}
                  showsHorizontalScrollIndicator={false}
                  // renderItem={renderEquipements}
                  renderItem={({item, index}) =>  <PostItem post={item} />}
                  keyExtractor={(item)=>item._id}
                />

              )
            }
            
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default Home