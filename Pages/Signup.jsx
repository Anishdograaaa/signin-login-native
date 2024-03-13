import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Formik } from 'formik';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import axios from 'axios'; // Import Axios
import * as yup from 'yup'


export default function Signup({navigation}) {

  const signUpValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    username: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
   
  })
           
          const sign = async({name,username,password}) => {
                             try {const response = await axios.post("https://test.webyaparsolutions.com/auth/user/signup", {
                              email: username,
                              name: name,
                              password: password
                          });
                          console.log(response.data);
                          if(response.data.success === true){
                             navigation.navigate('Login');
                          }
                          else{
                            navigation.navigate('Signup')
                            console.log(response.data)
                          }
                          
                          
                          
                                }catch(error) {
                                  console.log(error) 
                                 }
                                         }
    
    const [focus1,setfocus1] = useState(false);
    const [focus2,setfocus2] = useState(false);
    const [focus3,setfocus3] = useState(false);
    

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Formik
      validationSchema={signUpValidationSchema}
     initialValues={{ username:'',password:'',name:'' }}
     onSubmit={values => {
      sign(values)
     }}
   >{({ handleChange, handleBlur, handleSubmit, values,errors }) => (
      <Animated.View style={styles.form} entering={FadeInDown.duration(400).delay(200).springify()}>
        
        <Text style={styles.head} entering={FadeInDown.duration(500).delay(300).springify()}>
          Sign In
        </Text>
        
        <TextInput placeholder='Enter Name' style={[styles.input,{borderColor:focus3? ("#00ffff"):("#000")}]} value={values.name}  onSubmitEditing={() => setfocus3(false)}
                    onEndEditing={() => setfocus3(false)} onFocus={()=>{setfocus3(true)}} onChangeText={handleChange('name')} onBlur={handleBlur('name')} entering={FadeInDown.duration(600).delay(400).springify()}/>

                    {errors.name && <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>}


        <TextInput placeholder='Enter Username'  style={[styles.input,{borderColor:focus1? ("#00ffff"):("#000")}]} value={values.username}  onSubmitEditing={() => setfocus1(false)}
                    onEndEditing={() => setfocus1(false)} onFocus={()=>{setfocus1(true)}} onChangeText={handleChange('username')} onBlur={handleBlur('username')} entering={FadeInDown.duration(700).delay(500).springify()}/>

                    {errors.username && <Text style={{fontSize: 10, color: 'red'}}>{errors.username}</Text>}

    <TextInput placeholder='Enter Password' style={[styles.input,{borderColor:focus2? ("#00ffff"):("#000")}]} value={values.password}  onSubmitEditing={() => setfocus2(false)} secureTextEntry={true}
                    onEndEditing={() => setfocus2(false)} onFocus={()=>{setfocus2(true)}} onChangeText={handleChange('password')} onBlur={handleBlur('password')} entering={FadeInDown.duration(800).delay(600).springify()}/>

                    {errors.password && <Text style={{fontSize: 10, color: 'red'}}>{errors.password}</Text>}
          
        <TouchableOpacity style={styles.btncontainer} onPress={handleSubmit} entering={FadeInDown.duration(900).delay(700).springify()}>
           <Text
            style={styles.button}
            >Submit</Text>
        </TouchableOpacity>
    
        
      </Animated.View>)}
      </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00ffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form:{
    borderRadius:10,
     width:300,
     
     backgroundColor:"#fff",
     alignItems:"center",
     justifyContent:"center"
    },
    head:{
      fontSize:30,
      color:"#000",
      margin:20,
    },
    input:{
      backgroundColor:"#fff",
      padding:10,
      margin:10,
      width:250,
      borderRadius:10,
      borderColor:"#00ffff",
      borderWidth:1
    },
    button:{
      backgroundColor:"#00ffff",
      color:"#000",
      elevation:3,
      padding:5,
      width:250,
      borderRadius:10,
      textAlign:"center",
      
  
    },
    btncontainer:{
      margin:30,
    },
    scndtext:{
      marginBottom:30,
      marginTop:10,
    },
    img:{
      position:"absolute",
    }
  });
  