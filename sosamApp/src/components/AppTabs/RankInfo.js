import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import {bold , plane} from '../../font'

const {width, height} = Dimensions.get('window')

 const RankInfo = ({d}) =>{
    return (
       <View  key={d.rank} style={styles.rankbox}>        
         <Text style={styles.ranknum}> {d.rank} 위 </Text>
        <Text style={styles.energy}> {d.amount} </Text>
        <Text style={styles.inner}>{d.nickname}</Text>   
        <Text style={styles.inner}>{d.message} </Text>
        </View>
    )
}
export default RankInfo;

const styles = StyleSheet.create({

    rankbox: {
        backgroundColor : 'white',
        borderRadius : 5,
        flex: 1,
        borderColor: '#bbb',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        fontFamily : plane,
        flexDirection:'row',
        //justifyContent: 'space-between'
      },
      ranknum: {
        padding: 0,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        //borderBottomColor: '#ddd',
        //borderBottomWidth: 1,
        //borderRightWidth: 1,
        //borderRightColor: '#ddd',
        //textAlign: 'center',
        //justifyContent : 'center'
      },
      energy: {
        width : width/5,
        textAlign : 'center'
      },
      inner : {
        fontSize : 12,
        width : width/4,
        textAlign : 'center'
      }
})