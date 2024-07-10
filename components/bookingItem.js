import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'

import { urlFor } from '../Sanity'
import styles from './styles'

const BookingItem = ({list}) => {
    const navigator = useNavigation()

    const handlePress = () =>{

        if(list.category == "laborrer"){
            navigator.navigate("LaborView", {laborId: list._id})

        } else{
            console.log("List ID", list);
            navigator.navigate("postView", {postId: list._id})

        }
    }
  return (
    <View>
        <View style={styles.list_container}>
            <Pressable onPress={()=>handlePress()}>
                <View style={styles.listing_item}>
                <Image source={{ uri: urlFor(list.image).url() }} style={styles.listing_img} />
                <View style={{width: '55%', marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold'}}>{list.name}</Text>
                    <Text style={{color: 'gray'}}>{list.category}</Text>
                    <Text>
                    <FontAwesomeIcon icon={faStar} style={{marginRight: 5}} size={15} color={'orange'} />
                    {list.rate}
                    </Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#9586E3', padding: 5, borderRadius: 5, width:'fit-content'}}><FontAwesomeIcon icon={faHeart} size={16} color={'white'} /></View>
                    <View><Text style={{padding: 5, fontWeight: 'bold'}}>₵{list.price}</Text></View>
                </View>
                </View>
            </Pressable>
        </View>
    </View>
  )
}

export default BookingItem