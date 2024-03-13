import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Selection from './Seletion';
import Login from './Login';
import Signup from './Signup';
import Form from './Form';
import Data from './Data';

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Selection}
          
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Data" component={Data} />
      </Stack.Navigator>
  )
}