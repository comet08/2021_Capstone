import React, { useEffect, useState } from 'react';

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

import MainTab from './src/components/MainTab';

import Discount from './src/components/AppTabs/Discount'
import Donate from './src/components/AppTabs/Donate'
import Home from './src/components/AppTabs/Donate'
import Profile from './src/components/AppTabs/Profile'
import Rank from './src/components/AppTabs/Rank'

import Login from './src/components/auth/Login'
import Register from './src/components/auth/Register'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';


import {Provider, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createStore } from 'redux';
import  checkLogin  from './src/redux/actions';
import store from './src/store'

const Stack = createStackNavigator();


const App = (props) =>{ 
  const [init, setInit] = useState(false);
  const [checkStorage, setcheckStorage] = useState(false);
  const dispatch = useDispatch();
  const userstate = useSelector((state)=>state.loggedIn, shallowEqual);

  const StorageLoggedIn = async (val)=>{
    console.log("세팅!")
    await AsyncStorage.setItem('loggedIn', JSON.stringify(val));
    this.setState({
      loggedIn : val
    })
  }

  const setStorage = async ()=>{
    let value =   await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    console.log(value);
    if(value!=undefined)
        setcheckStorage(value);
    else // 없으면 세션 확인
    {
      await axios.get('/login')
      .then((res)=>{
        if(res.data){
            AsyncStorage.setItem('loggedIn', JSON.stringify(true))
          setcheckStorage(true);
        }
        else
          AsyncStorage.setItem('loggedIn', JSON.stringify(false));
      })
    }
  }
  const InitApp = async ()=>{
    await setStorage();
    dispatch(checkLogin(checkStorage));
    setInit(true); 
  }
  useEffect(()=>{
   InitApp();
  }, []);


      if(!init){
        InitApp();
        return(
        
            <Text>"Loading..."</Text>
        )
      }
      else{ 
        if(!userstate.loggedIn){
          return(
            <Provider store = {store}>
              <NavigationContainer style={styles.container}>
                <Stack.Navigator initialRouteName='Login' headerMode = 'None'>
                <Stack.Screen name='Login' component={Login} />
                  <Stack.Screen name='Register' component={Register} />
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          )
        }
        else{
          return(
            <Provider store = {store}>
              <NavigationContainer style={styles.container}>
                <Stack.Navigator initialRouteName='Main' headerMode = 'None'>
                  <Stack.Screen name='Main' component={MainTab} />
                  <Stack.Screen name='Discount' component={Discount} />
                  <Stack.Screen name='Home' component={Home} />
                  <Stack.Screen name='Donate' component={Donate} />
                  <Stack.Screen name='Profile' component={Profile} />
                  <Stack.Screen name='Rank' component={Rank} />

                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          )
        }  
      }
}


export default App;


const styles = StyleSheet.create({
  container : {
      backgroundColor : 'green'
  }
})