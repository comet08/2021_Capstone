import React, { useState, useEffect } from 'react';

import {Text,TextInput,View, Button, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import url from '../../url'
import axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';


const Discount = ({navigation}) =>{
  const [energy, setEnergy] = useState(0);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [address, setAddress] = useState("");
  const userstate = useSelector((state)=>state.user, shallowEqual);

  const refreshEnergy = () => {
    axios.get(`http://${url}/energy`, {id : userstate.uid})
    .then((res) => {
      setEnergy(res.data[0].["amount"]);
    })
    .catch((err) => {
      console.log("에너지 가져오기 에러");
    })
  }

  const checkEnergy = () => {
    if (energy > checkEnergy){
      Alert.alert("가지고 있는 전력량보다 할인받을 전력량이 많습니다.")
    }
    else sendBody()
  }

  const sendBody = () => {
    let today = new Date();
    let body = {
      'id' : userstate.uid,
      'date' : today.getDate(),
      'time' : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'energy' : sendEnergy,
      'address' : address
    }

    axios.post(`http://${url}/discount`, body)
      .then((res) => {
        if (res.data != false){
          Alert.alert("할인이 완료되었습니다.")
        }
      })
      .catch((err) => {
        Alert.alert("할인 실패")
      })
    }

  const getAddress = () => {
    axios.get(`http://${url}/myPlace`, {id : userstate.uid})
    .then((res) => {
      console.log(res.data[0]);
      setAddress(res.data[0].["address"]);
    })
    .catch((err) => {
      console.log("주소 가져오기 에러");
    })
  }

  useEffect(()=>{
    refreshEnergy();
    getAddress();
  }, [])

  return(
    <View style={styles.container}>

    <Text style={styles.titleText}>할인받기</Text>
      <Text style={styles.normalText}>내 전력량 : {energy}</Text>
      <TextInput style = {styles.input} placeholder="할인받을 전력량" onChangeText={n=>{setSendEnergy(n)}}/>
      <Text style={styles.normalText}>나의 집 주소</Text>
      <Text style={styles.normalText}>{address}</Text>
      <TouchableOpacity style = {styles.donateButton} onPress = {() => checkEnergy()}>
        <Text style={styles.donateText}>할인받기</Text>
      </TouchableOpacity>

    </View>
  )
}



export default Discount;

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'white',
    flex:1,
    alignItems : 'center',
    flexDirection : 'column',
  },
  titleText : {
    marginTop : 50,
    fontSize : 50
  },
  normalText : {
    marginTop : 30,
    fontSize : 30,
  },
  input : {
    marginTop : 20,
    fontSize : 30,
  },
  donateButton : {
    backgroundColor: "rgb(7, 101, 38)",
    height: 64,
    width: 128,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop : 50
  },
  donateText : {
    fontSize : 30
  }

})
