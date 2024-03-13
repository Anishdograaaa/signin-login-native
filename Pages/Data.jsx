import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import { removeData } from './Token';

export default function Data({navigation}) {

    const [data,setdata] = useState('')

    useEffect(fetchData(),[])

    const fetchData = async () => {
        try {
            const response = await axios.get("https://test.webyaparsolutions.com/auth/user/data");
            setdata(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    };
    const navigate = ()=>{
        removeData("token")
        navigation.navigate("Login")
    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar/>
        <View style={{position:"absolute",top:5,right:5}}>
            <TouchableOpacity>
            <Icon style={{margin:10,right:4}}name="logout" size={25} color="#000" onPress={navigate} />
            </TouchableOpacity>
        </View>
        
        <Animated.View style={styles.secondcontainer} entering={FadeInDown.duration(400).delay(200).springify()}>
            <View entering={FadeInDown.duration(500).delay(300).springify()} style={{flex:1,flexDirection:"row",marginBottom:20,}}>
               <Text entering={FadeInDown.duration(600).delay(400).springify()} style={styles.head}>
                   Latitude:         
               </Text >
               <Text entering={FadeInDown.duration(600).delay(400).springify()} style={styles.head2}>
                   {data.latitude}
                 
               </Text>
            </View>
            <View entering={FadeInDown.duration(700).delay(500).springify()} style={{flex:1,flexDirection:"row"}}>

            <Text entering={FadeInDown.duration(800).delay(600).springify()} style={styles.head}>
                   Latitude:         
               </Text >
               <Text entering={FadeInDown.duration(800).delay(600).springify()} style={styles.head2}>
                   {data.latitude}
                 
               </Text>

            </View>
            <View style={styles.container}>
                <Text style={{marginTop:50,fontSize:30}}>Image Gallery</Text>
                <Image style={{height:300,width:300,marginTop:30}} source={data.uri}/>
            </View>
        
        
        </Animated.View>
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
      top:50,
      },
      head:{
        fontSize:20,
        color:"#000",
        marginHorizontal:50,
      },
      head2:{
        fontSize:20,
        color:"#00ffff",
        marginHorizontal:50,
        // paddingHorizontal:20,

      }
    })