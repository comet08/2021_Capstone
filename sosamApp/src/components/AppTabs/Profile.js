import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Profile = (props) =>{
    return(
           <View style={styles.container}>
              <Text>Profile</Text>
           </View> 
    )
}
  


export default Profile;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
   
})