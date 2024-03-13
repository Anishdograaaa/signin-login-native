import { View, Text, TextInput, SafeAreaView, StatusBar,Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Formik } from 'formik';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
// import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import * as yup from 'yup'


export default function Form({navigation}) {
  
  const dataValidationSchema = yup.object().shape({
    
    // Altitude: yup
    //   .string()
    //   .matches(/(01)(\d){5}\b/, 'Enter numbers only')
    //   .required('Latitude is required'),
    // Longtitude: yup
    //   .string()
    //   .matches(/(01)(\d){5}\b/, 'Enter numbers only')
    //   .required('Latitude is required'),
  })

  
 
    const [image, setImage] = useState(null);
    const [focus1,setfocus1] = useState(false);
    const [focus2,setfocus2] = useState(false);
    const [modal,setmodal] = useState(false);
    
    

    const uploadimage = async()=>{
      try{
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
          cameraType:ImagePicker.CameraType.front,
          allowsEditing:true,
          aspect:[1,1],
          quality:1,
        }
        )
        console.log(result)
        if(!result.canceled){
           await saveimage(result.assets[0].uri);
           await uploaDImage(result.assets[0].uri);
        }
        setmodal(false)

      }catch(error){
            alert("Error uploading image" + error.message)
            setModalVisible(false)
      }
    }

    const saveimage = async(image)=>{
      try{
       setImage(image);

       setModalVisible(false)
      }catch({error}){
        throw(error)
      }
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploaDImage(result.assets[0].uri);
    }
    setmodal(false)
  };

  
  const uploaDImage = async (uri) => {
    let formData = new FormData();
    formData.append('image', {
        uri:uri,
        type: 'image/jpeg',
        name: 'image.jpg',
    });

    try {
        const response = await axios.post('https://test.webyaparsolutions.com/auth/user/form', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const imageUrl = response.data.imageUrl; // Assuming the API returns the URL of the uploaded image
        console.log('Uploaded image URL:', imageUrl);
        setImage(imageUrl)
        // Send this URL to your desired API endpoint
        // For example:
        // await sendImageUrlToApi(imageUrl);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

const submitdata =async({Altitude,Longtitude})=>{
  try {const response = await axios.post("https://test.webyaparsolutions.com/auth/user/form", {
    latitude: Altitude,
    longtitude: Longtitude,
    uri:image,
});
navigation.navigate('Data');
console.log(response.data)

if (response.data.success == true){
 
}
else{
//  navigation.navigate('Form');
 console.log(response.data)
}

      }catch(error) {
        console.log(error) 
       }
               
}

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar/>
        <Formik
     initialValues={{ Altitude: '',Longtitude:'' }}
     onSubmit={values => {
      submitdata(values)
      navigation.navigate('Data');
    }}
     validationSchema={dataValidationSchema}
   >
     {({ handleChange, handleBlur, handleSubmit, values,errors }) => (
   
        <Animated.View style={styles.secondcontainer} entering={FadeInDown.duration(400).delay(200).springify()}>
        <Text entering={FadeInDown.duration(500).delay(300).springify()} style={styles.head}>
            Latitude
        </Text>
        <TextInput entering={FadeInDown.duration(600).delay(400).springify()} placeholder='Enter Altitude' style={[styles.input,{borderColor:focus1? ("#00ffff"):("#000")}]} value={values.Altitude}  onSubmitEditing={() => setfocus1(false)}
                    onEndEditing={() => setfocus1(false)} onFocus={()=>{setfocus1(true)}} onChangeText={handleChange('Altitude')}/>

{errors.Altitude &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.Altitude}</Text>
       }
    
        <Text entering={FadeInDown.duration(700).delay(500).springify()} style={styles.head}> 
            Longtitude
        </Text>
        <TextInput entering={FadeInDown.duration(800).delay(600).springify()} placeholder='Enter Longtitude' style={[styles.input,{borderColor:focus2? ("#00ffff"):("#000")}]} value={values.Longtitude}  onSubmitEditing={() => setfocus2(false)}
                    onEndEditing={() => setfocus2(false)} onFocus={()=>{setfocus2(true)}} onChangeText={handleChange('Longtitude')}/>

{errors.Longtitude &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.Longtitude}</Text>
       }

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {modal && <View style={{flex:1,flexDirection:'row',width:100,height:100,borderColor:"#fff",borderRadius:20,position:"relative", top:30}}>
            <Icon1 style={{margin:10}}name="images" size={20} color="#000" onPress={pickImage} />
            <Icon style={{margin:10}}name="camera" size={20} color="#000" onPress={uploadimage} />
            <Icon style={{margin:10}}name="trash" size={20} color="#000" onPress={()=>{setImage(null)
            setmodal(false)}} />
            {/* <Button title="Pick an image from camera roll"  /> */}
              
          </View>}
        <TouchableOpacity entering={FadeInDown.duration(900).delay(700).springify()} style={{paddingTop:20}} onPress={()=>setmodal(!modal)}>
          <Text style = {styles.button}> Image Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity entering={FadeInDown.duration(1000).delay(800).springify()} style={{paddingTop:20}} onPress={handleSubmit}>
          <Text style = {styles.button}> Submit</Text>
        </TouchableOpacity>
        
      {image && <Image source={{ uri: image }} value={values.image}  onChange={handleChange('image')} style={{ width: 200, height: 200,margin:20 }} />}
      
    </View> 
        </Animated.View>)}
        
        </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      secondcontainer:{
      position:"absolute",
      top:20,
      },
      head:{
        fontSize:20,
        color:"#000",
        margin:10,
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
        
    
      }
    })