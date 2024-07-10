import { View, Text, Pressable, Image, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"

// import styles from '../components/styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Sanity
import sanityClient from "../Sanity";

const Login = () => {
    const navigator = useNavigation();

  const [errors, setErrors] = useState({});
  const [logging, setLogging] = useState(false);

  const [allUsers, setAllUsers] = useState({});
  
  const [formData, setFormData] = useState(
    {
        formType: "login",
        email: "adamabdulrafik@gmail.com",
        password: "meeeeeeee"
        // email: "",
        // password: ""
    }
  );
    
  const handleChangeText = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () =>{
    setLogging(true)
    const errors_arr = [{email: '', password: ''}]
    
    if(formData.email == "" || formData.password == ""){
      
      errors_arr['email']= "Please Enter your Email"
      errors_arr['password'] = "Please Enter your Password";
      
      if(formData.email != ""){
        errors_arr['email']= ''
        
      }
      
      if(formData.password != ""){
        errors_arr['password'] = '';

      }

      setLogging(false)

    } else{
      const email = formData.email;
      const password = formData.password;

      // const userExist = allUsers.find(user => user.email === email && user.password === password);

      // if(userExist){
      //   console.log(userExist)
      // } else{
      //   console.log("No User", userExist)
      // }

      sanityClient.fetch(`
        *[_type=="users" && email == "${email}"]{
        ...
      }`
      )
      .then((data)=>{
        // setAllUsers(data)
        if(data.length > 0){
          
          data.forEach(user => {
            if(user.password == password){
              console.log(user._id);
              AsyncStorage.setItem("userSession", user._id)
              setLogging(false)

              navigator.navigate("HomeTabs");
  
            } else{
              errors_arr['password'] = "incorect password, please try again!!"
              setLogging(false)
            }
          });
        } else{
          errors_arr["email"] = "Sorry, Account not found";
          setLogging(false)
        }
      })
      .catch(err =>{
        console.log(err);
      })


    }

    setErrors(errors_arr);
  }

  return (
    // <View>
        <View style={[styles.container, {backgroundColor: 'white'}]}>
            <View style={[styles.container, {width: '80%'}]}>

            <View style={{alignItems:'center'}}>
                <Pressable onPress={()=>navigator.navigate("HomeTabs")}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo} />
                </Pressable>
                <Text style={{fontSize: '2.3em', fontWeight: '400'}}>Login Here</Text>
            </View>

            <View style={{width: '100%', marginTop: 25}}>
                <View>
                <Text style={{padding: 5}}>Email *</Text>
                <TextInput
                    value={formData.email}
                    onChangeText={(text) =>handleChangeText("email", text)}
                    placeholder='example@example.com' placeholderTextColor={'#455D79'} style={styles.input} 
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>

                <View style={{marginTop: 10}}>
                <Text style={{padding: 5}}>Password *</Text>
                <TextInput
                    value={formData.password}
                    onChangeText={(text) =>handleChangeText("password", text)}
                    placeholder='********' placeholderTextColor={'#455D79'} style={styles.input} 
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                </View>

                <View>
                <Pressable disabled={logging} style={styles.submitBtn} className={logging ? "opacity-50": ''} onPress={()=>handleLogin()} >
                    {(logging) ? (
                      <Text style={{color: 'white'}}>Logining In ...</Text>
                      
                    ): (
                      <Text style={{color: 'white'}}>Login</Text>

                    )}
                </Pressable>
                </View>
            </View>

            {/* OTHERS */}
            <View style={{width: '100%', marginTop: 20}}>
                <View>
                    <Pressable>
                        <Text style={{color: '#9586E3'}}>Forgot password? </Text>
                    </Pressable>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Text>Don't Have an Account? </Text>
                    <Pressable onPress={()=>navigator.navigate("signup")}>
                        <Text style={{color: '#9586E3'}}>Signup here </Text>
                    </Pressable>
                    </View>
                </View>
            </View>
        </View>
    // </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      // backgroundColor: 'red'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      padding: 11,
      borderWidth: 2,
      borderColor: '#9586E3',
      backgroundColor: 'white',
      borderRadius: 5,
      width: '100%',
      outlineStyle: 'none',
      color: 'black'
    },
    logo: {
      width: 70,
      height: 70,
      borderRadius: 50,
    },
    submitBtn: {
      padding: 10,
      backgroundColor: '#9586E3',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 7
    }
  });

export default Login