import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import styles from './styles'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { urlFor } from '../Sanity'

const LaborItem = ({labor}) => {
    const navigator = useNavigation();

  return (
    <View>
        <View style={{width: 250}}>
            <View style={{padding: 15, width: '100%'}}>
                <Pressable style={{width: '100%'}} onPress={()=>navigator.navigate("LaborView", {laborId: labor._id})}>
                    <View style={styles.post}>
                    {/* BODY */}
                    <View style={{height: '100%'}}>
                        {/* 'https://cdn.sanity.io/images/0tirvd18/production/84a59d417d22892e67380466219c49fcec5481cc-1080x1080.jpg' */}
                        <Image source={{uri: urlFor(labor.profile).url()}} style={styles.post_img} resizeMode='cover' />
                        <View style={{padding: 10}}>
                            <Text style={styles.title}>{labor.fullname}</Text>

                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
                                <Text style={{color: 'grey'}}>{labor.location}</Text>
                                {/* <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:8}}>
                                    <FontAwesomeIcon icon={faStar} color={'orange'} size={15} />
                                    <Text style={{color:'balck', fontWeight:'500', fontSize:15}}>{labor.rate}</Text>
                                </View> */}
                            </View>
                            <View>
                                <View style={styles.justify_row_between}>
                                    <View style={styles.post_price}>
                                        <Text style={{color: 'white', fontSize: 10}}>{labor.phone}</Text>
                                    </View>
                                    <View style={styles.post_add_cart}>
                                        <FontAwesomeIcon icon={faHeart} size={15} color={'white'} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* FOOTER */}
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default LaborItem