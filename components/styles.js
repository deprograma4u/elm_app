
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 18,
        // fontWeight: 'bold'
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
    d_flex: {
        display: 'flex',
        },
    flex_row: {
        display: 'flex',
        flexDirection: 'row',
    },
    flex_column: {
        flexDirection: 'column',
    },
    justify_center: {
        justifyContent: 'center',
    },
    justify_row_between: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    align_center: {
        alignItems: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    post: {
      backgroundColor: 'white',
      minHeight: 200,
      minWidth: '100%',
      // marginRight: 10,
      borderRadius: 15,
      height: 250,
      shadowColor: '#808080',
      shadowRadius: 10,
      shadowOpacity: .5,
      shadowOffset: {width:5, height:5},
    },
    post_header: {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      height: 65,
      gap: 8,
    },
    post_price: {
      width: 70,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9586E3',
      borderRadius: 50,

    },
    post_add_cart: {
      width: 30,
      height: 30,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9586E3',
      borderRadius: 50,

    },
    header_title: {
      fontSize: 20,
      color: 'black'
    },
    img: {
      height: 55,
      width: 55,
      borderRadius: 100
    },
    small: {
      fontSize: 15,
      color: '#BEBEBE',
    },
    post_img: {
      width: '100%',
      height: '50%',
      objectFit: 'cover',
      // borderRadius: 
    },
    post_text: {
      color: 'black',
      fontSize: 15
  
    },
    searchInput: {
      padding: 10,
      tintColor: 'lightblue',
      borderColor: 'lightblue',
      borderRadius: 8,
      borderWidth: 1,
      width: '50%',
      color: 'black'
      
    },
    separator: {
        marginTop: 10,
        marginBottom: 2,
        height: 1,
        width: '100%',
        backgroundColor: '#BEBEBE'
    },
    bgImage: {
        resizeMode: 'cover',
        // height: '100vh'
    },

    // ##### LISTINGS Style
    list_container: {
      padding: 10
    },

    listing_item: {
      backgroundColor: 'white',
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      // borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 10,
      shadowColor: '#EAE9E9',
      shadowRadius: 5,
      shadowOffset: {width: 5, height: 5,},
      // shadowBlur: 5,
      marginTop: 5
      // bac
    },

    listing_img: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    profile_container: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      
    },
    profile_header: {
      display: 'flex',
      flexDirection: 'column',
      height: 300,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9586E3',
      borderRadius: 15
    },
    profile_list_item: {
      width: 180,
      height: 180,
      borderRadius: 15,
      marginRight: 5,
      borderWidth: 1,
      padding: 5,
      borderColor: '#9586E3'
    },
    profile_item_img: {
      width: '100%',
      height: '70%',
      resizeMode: 'cover'
    },
    submitBtn: {
      padding: 10,
      backgroundColor: '#9586E3',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 7
    }
})

export default styles