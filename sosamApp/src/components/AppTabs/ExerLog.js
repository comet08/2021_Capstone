import React, {useState, useEffect, Component} from 'react';

import {
  Animated,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import {bold , plane} from '../../font'
const {width, height} = Dimensions.get('window')

const ExerLog = ({data}) =>{
  const arr = data;
  console.log(data[0]);
    return (
        <>
          <View style={styles.historyTitleFrame}>
            <Text style={styles.historyTitle}> 운동 내역 </Text>
          </View>

          <View style={styles.historyList}>
            <View style={[styles.header, styles.row]}>
              <Text style={styles.historyText}> 날짜 </Text>
              <Text style={styles.historyText}> 시작 시간 </Text>
              <Text style={styles.historyText}> 종료 시간 </Text>
              <Text style={styles.historyText}> 에너지 </Text>
            </View>
          <ScrollView contentContainerStyle={styles.scroll}>
            {
                   arr.map((d, index) =>
                    (
                        <View style={[styles.innerContainer, styles.row]} key={index}>
                            <Text style={styles.inner}> {d.date.split('T')[0]} </Text>
                            <Text style={styles.inner}> {d.startwith} </Text>
                            <Text style={styles.inner}> {d.endwith} </Text>
                            <Text style={styles.inner}>  {d.energy} mA</Text>
                        </View>
                    ))
                } 
            </ScrollView>
          </View>
          </>
    )
}

export default ExerLog;

const styles = StyleSheet.create({
  historyTitleFrame: {
      backgroundColor: '#eee',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginLeft: 15,
      marginRight: 15,
      maxHeight: 100,
      padding: 15,
      justifyContent: 'center',
      width : width-50,
    },
    scroll:{
      flexDirection: 'column'
    },
    row:{
      display: 'flex',
      flexDirection: 'row',
    },
    historyTitle: {
      color: 'black',
      textAlign: 'center',
      fontFamily : bold,
      fontSize : 15,
    },
    header:{
      justifyContent : 'space-between',
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      
      paddingHorizontal: 20
    },
    historyList: {
      backgroundColor: '#fff',
      //flex: 1,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      marginLeft: 15,
      marginRight: 15,
      padding: 10,
      justifyContent: 'center',
      textAlign : 'center',
      height: height/3.5
    },
    historyText: {
      fontFamily : plane,
    },
    frameButton: {
      backgroundColor: '#ddd',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flex: 1,
      justifyContent: 'center',
    },
    histFrame : {
      flex:1,
      width : width
    },
    innerContainer : {
      display: 'flex',
      justifyContent : 'center'
       
    },
    inner : {
      width: width/5,
      textAlign: 'center',
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
    }

})