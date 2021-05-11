import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Donate = () =>{
    return(
           <View style={styles.container}>
              <Text>Donate</Text>
           </View> 
    )
}
  


export default Donate;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
   
})