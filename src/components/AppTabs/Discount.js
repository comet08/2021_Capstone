import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, TouchableOpacity
} from 'react-native';



const Discount = ({navigation}) =>{


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
