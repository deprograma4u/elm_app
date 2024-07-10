import { View, Text, ScrollView, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

// Comps
import ModalNav from '../components/ModalNav'
import LaborItem from '../components/LaborItem'

import sanityClient from '../Sanity'

const Laborrers = () => {
  const navigator = useNavigation();
  const [laborrers, setLaborrers] = useState([])

  const fetchLaborrers = async () =>{
    await sanityClient.fetch(`
      *[_type == "users" && account_type=="laborrer"]{
      ...

    }`).then((data)=>{
      setLaborrers(data);
    })
  }

  useFocusEffect((
    React.useCallback(()=>{
      fetchLaborrers();
    })
  ))
  
  return (
    <View>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ModalNav title={'Laborrers'} />
        
        {/* ### MODAL BODY */}
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 10}}>
          {(laborrers.length == 0) ? (
            <View  style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#9586E3', fontSize: 20 }}>No Laborrers To Show</Text>
            </View>
          ) : (
              <FlatList 
                data={laborrers}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) =>  <LaborItem labor={item} />}
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

export default Laborrers