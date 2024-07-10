import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

// Comps
import ModalNav from '../components/ModalNav'
import PostItem from '../components/PostItem'

import sanityClient from '../Sanity'

const Equipements = () => {
  const navigator = useNavigation();
  const [data] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  const [equipment, setEquipement] = useState([])

  const fetchEquipments = async () =>{
    await sanityClient.fetch(`
      *[_type == "Listings" && category=="equipment"]{
      ...
    }`).then((data)=>{
      setEquipement(data);
    })
  }

  useFocusEffect((
    React.useCallback(()=>{
      fetchEquipments()
    }, [])
  ))

  return (
    <View>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View>
          <ModalNav title={'Equipments'} />

        </View>

        {/* ### MODAL BODY */}
        <ScrollView>
          <View style={{display: 'flex-wrap', marginTop: 10}}>
          {(equipment.length == 0) ? (
              <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#9586E3', fontSize: 20 }}>No Equipments To SHow</Text>
              </View>
            ) : (
                <FlatList 
                  data={equipment}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) =>  <PostItem post={item} />}
                  keyExtractor={(item)=>item._id}
                />

              )
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Equipements