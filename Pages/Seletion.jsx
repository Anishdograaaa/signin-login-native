import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text,  View } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown, FadeOut } from 'react-native-reanimated';

export default function Selection({navigation}) {
 
  return (
   
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Animated.View style={styles.form} entering={FadeInDown.duration(400).delay(200).springify()} >
        
        <Text style={styles.head} entering={FadeInDown.duration(500).delay(300).springify()} >Let's Get Started </Text>
        <TouchableOpacity style={styles.btncontainer1} onPress={()=>{
            navigation.navigate('Login')
        }} entering={FadeInDown.duration(600).delay(400).springify()}>
           <Text
            style={styles.button1} entering={FadeInDown.duration(700).delay(500).springify()} 
            >Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity tyle={styles.btncontainer2} onPress={()=>{
            navigation.navigate('Signup')
        }} entering={FadeInDown.duration(800).delay(600).springify()}>
           <Text style={styles.button2} entering={FadeInDown.duration(900).delay(700).springify()}
            >Sign Up</Text>
        </TouchableOpacity>
        
      </Animated.View>
    </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
    head:{
        fontSize:30,
        color:"#000",
        margin:20,
      },
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
  
  
  button1:{
    backgroundColor:"#00ffff",
    color:"#000",
    elevation:3,
    padding:5,
    width:250,
    borderRadius:10,
    textAlign:"center",
    margin:20,

  },
  button2:{
    backgroundColor:"#fff",
    color:"#000",
    elevation:3,
    padding:5,
    width:250,
    borderRadius:10,
    textAlign:"center",
    margin:20,

  },
  
  
});