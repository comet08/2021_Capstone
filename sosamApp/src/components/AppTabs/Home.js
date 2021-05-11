import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Home = () =>{
    return(
           <View style={styles.container}>
              <Text>홈화면</Text>
           </View> 
    )
}
  


export default Home;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
   
})