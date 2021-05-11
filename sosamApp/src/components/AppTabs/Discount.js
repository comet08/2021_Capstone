import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Discount = () =>{
    return(
           <View style={styles.container}>
              <Text>Discount</Text>
           </View> 
    )
}
  


export default Discount;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
   
})