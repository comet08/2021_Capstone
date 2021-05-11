import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Rank = ({navigation}) =>{
    return(
           <View style={styles.container}>
              <Text>Rank</Text>
           </View> 
    )
}
  


export default Rank;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
   
})