import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';


import Discount from './src/components/AppTabs/Discount'
import Donate from './src/components/AppTabs/Donate'
import Home from './src/components/AppTabs/Home'

const Stack = createStackNavigator();

const App = (props) =>{
  return(
    <NavigationContainer style={styles.container}>
    <Stack.Navigator initialRouteName='Home' headerMode = 'None'>
    <Stack.Screen name='Discount' component={Discount} />
    <Stack.Screen name='Home' component={Home} />

    </Stack.Navigator>
    </NavigationContainer>
    )
  }


export default App;

const styles = StyleSheet.create({
  container : {
      backgroundColor : 'white'
  }
})
