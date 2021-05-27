import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, TouchableOpacity,
} from 'react-native';
//import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';


const Donate = ({navigation}) =>{
  const [energy, setEnergy] = useState(0);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [places, setPlaces] = useState([]);

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

  const refreshPlaces = () => {
    axios.get('/places')
    .then(function(){
      return e;
    })
    .catch(function(error){
      console.log("에너지 가져오기 에러");
    })
  }


  return(
    <View style={styles.container}>
    <Text style={styles.titleText}>기부하기</Text>
    <Text style={styles.normalText}>내 전력량 : {energy}</Text>
    <TextInput style = {styles.input} placeholder="기부할 전력량" onChangeText={n=>{setSendEnergy(n)}}/>
    <Dropdown label='기부할 곳' data={places}/>
    <TouchableOpacity style = {styles.donateButton} onPress = {() => checkEnergy()}>
    <Text style={styles.donateText}>기부하기</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Donate;


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
