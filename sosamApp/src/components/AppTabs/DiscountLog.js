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

const DiscountLog = ({data}) =>{
    return (
        <>
          <View style={styles.historyTitleFrame}>
            <Text style={styles.historyTitle}> 할인 내역 </Text>
          </View>

          <View style={styles.historyList}>
            <ScrollView>
            {
                    data.reverse().map((d, index) =>
                    (
                        <View style={styles.innerContainer} key={index}>
                            <Text> {d.date} {d.time} {d.donateTo} {d.energy}</Text>
                        </View>
                    ))
                } 
            </ScrollView>
          </View>
          </>
    )
}

export default DiscountLog;

const styles = StyleSheet.create({
    historyTitleFrame: {
        backgroundColor: '#ddd',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        maxHeight: 100,
        padding: 15,
        justifyContent: 'center',
        width : width-50,
      },
      historyTitle: {
        color: 'black',
        textAlign: 'center',
        fontFamily : bold,
        fontSize : 15,
      },
      historyList: {
        backgroundColor: '#eee',
        //flex: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        justifyContent: 'center',
      },
      historyText: {
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontFamily : plane
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
      }
})