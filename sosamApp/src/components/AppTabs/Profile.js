import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, TouchableOpacity
} from 'react-native';

import axios from 'axios';
import AsyncStorage  from "@react-native-async-storage/async-storage"

import { useDispatch } from 'react-redux';
import checkLogin from '../../redux/actions';

const Profile = ({navigation, setLoggedIn}) =>{
    const dispatch = useDispatch();
    const onLogout = async ()=>{
        //asyncstorage에서 지우기
        await axios.get(`/logout`)
        .then((res)=>{
            if(res.data) {
                AsyncStorage.setItem('loggedIn', JSON.stringify(false));
                dispatch(checkLogin());
            }
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        //
    }
    return(
           <View style={styles.container}>
              <Text>Profile</Text>
              <TouchableOpacity style={styles.logoutContainer}onPress={onLogout}>
                  <Text style={styles.logout}>Logout</Text>
              </TouchableOpacity>
           </View> 
    )
}
  


export default Profile;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column',
        justifyContent : 'center'
    },
    logoutContainer : {
        backgroundColor : 'white',
        justifyContent : 'center'
    },
    logout:{
        fontSize : 20,

    }

   
})