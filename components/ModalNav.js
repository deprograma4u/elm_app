import { View, Text, Pressable } from 'react-native'
import React from 'react'

import styles from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'

const ModalNav = ({title='', arrowColor='white'}) => {
    const navigator = useNavigation()
  return (
    <View>
        <View>
            <View style={{height: 10}}></View>
            <View style={[styles.justify_row_between, {alignItems: 'center', padding: 15}]}>
                <Pressable onPress={()=>navigator.navigate("HomeTabs")}>
                    <View style={{width: 40, height: 40, borderRadius: 50, backgroundColor: '#9586E3', alignItems: 'center', justifyContent: 'center'}}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color={arrowColor} />
                    </View>
                </Pressable>
                <Text style={styles.h3}>{title}</Text>
                <View></View>
            </View>
        </View>
    </View>
  )
}

export default ModalNav