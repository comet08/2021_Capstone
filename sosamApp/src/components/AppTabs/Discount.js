import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, TouchableOpacity
} from 'react-native';



const Discount = ({navigation}) =>{
  const [energy, setEnergy] = useState(0);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [myPlace, setMyPlace] = useState("");

  const checkEnergy = () => {
    if (energy > checkEnergy){
      Alert.alert("가지고 있는 전력량보다 기부할 전력량이 많습니다.")
    }
    else sendBody()
  }

  const sendBody = () => {
    let body = {
      'energy' : energy,
      'place' : place
    }
    


  }

  const getMyPlace = () => {

    setMyPlace();
  }


  return(
    <View style={styles.container}>

    <Text style={styles.titleText}>할인받기</Text>
      <Text style={styles.normalText}>내 전력량 : {energy}</Text>
      <TextInput style = {styles.input} placeholder="할인받을 전력량" onChangeText={n=>{setSendEnergy(n)}}/>
      <Text style={styles.normalText}>나의 집 주소</Text>
      <Text style={styles.normalText}>{myPlace}</Text>
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
    marginTop : 50,
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
    marginTop : 30
  },
  donateText : {
    fontSize : 30
  }

})
