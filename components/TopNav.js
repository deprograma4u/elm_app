import { View, Text, Pressable, TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons/faBarsStaggered'


const TopNav = ({title='Home', showBottom=false}) => {
    const navigator = useNavigation()
  return (
    <View>
        <View  style={{backgroundColor: 'white', padding: 10}}>
            <View style={{height:5}}></View>
            {/* style={{display: 'flex', justifyContent: 'space-between', flexDirection:'row'}} */}
            <View className=" bg-black flex-1 flex-row justify-between" style={{flexDirection:'row', justifyContent: 'space-between'}}>
                {/* <FontAwesomeIcon icon={faBarsStaggered} size={20} /> */}

                <Text className=" text-xlg">{title}</Text>

                {/* <View style={{padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> */}
                <Pressable className="" style={{width: 'fit-content'}} onPress={() =>navigator.navigate('login')}>
                    <FontAwesomeIcon icon={faUser} size={25} color='#9586E3' />
                </Pressable>    
                {/* <View >
                </View> */}
            </View>
            {showBottom &&
                <View style={{marginTop: 15, padding:0, maxHeight: 70}}>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 5}}>
                        <View style={styles.searchbar}>
                            <FontAwesomeIcon icon={faSearch} size={20} color='#455D79' style={styles.searchbar_icon} />
                            <TextInput placeholder='Seacrh something' style={styles.searchInput} />
                        </View>
                        <View style={styles.filter}>
                            <Pressable>
                                <FontAwesomeIcon icon={faFilter} size={20} color={'white'} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            }
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    topbar: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    searchInput: {
        width: '100%',
        borderWidth: 0,
        borderColor: 'white',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        fontSize: 17,
        outlineStyle: 'none',
      
    },
    searchbar: {
        position: 'relative',
        padding: 12,
        backgroundColor: '#EAE9E9',
        width: '85%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchbar_icon: {
        // position: 'absolute',
        // top: '50%',
        // left: 10,
        // trans
    },
    filter: {
        backgroundColor: '#9586E3',
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 10
    }
  });

export default TopNav