import { View, Text, ScrollView, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

// Comps
import PostItem from '../components/PostItem'
import ModalNav from '../components/ModalNav'

import sanityClient from '../Sanity'

const Materials = () => {
  const navigator = useNavigation();
  const [materials, setMaterials] = useState([])

  
  const fetchMaterials = async () =>{
    await sanityClient.fetch(`
      *[_type == "Listings" && category=="material"]{
      ...
    }`).then((data)=>{
      setMaterials(data);
    })
  }

  useFocusEffect((
    React.useCallback(()=>{
      fetchMaterials();
    })
  ))
  
  return (
    <View>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ModalNav title={'Materials'} />

        {/* ### MODAL BODY */}
        <ScrollView>
          <View style={{display: 'flex-wrap', marginTop: 10}}>
            
            {(materials.length == 0) ? (
              <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#9586E3', fontSize: 20 }}>No Materials To SHow</Text>
              </View>
            ) : (
                <FlatList 
                  data={materials}
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

export default Materials