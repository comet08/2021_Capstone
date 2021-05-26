import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';

import Home from './src/components/AppTabs/Home';

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

    await axios.post(`/donate`,body)
    .then((res)=>{

    }
    .catch((err)=>{
      console.log("donate error : ");
      console.log(err);
    })
  }

  const refreshPlaces = () => {
    await axios.get(`/getPlaces`)
    .then((res)=>{
      if(res.data) {
        setPlaces(data);
      }
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })

  }


  {setEnergy(Home.refreshEnergy())}

  return(


    <View style={styles.container}>

    <Text style={styles.titleText}>기부하기</Text>
      <Text style={styles.normalText}>내 전력량 : {energy}</Text>
      <TextInput style = {styles.input} placeholder="기부할 전력량" onChangeText={n=>{setSendEnergy(n)}}/>
      <Dropdown label='Favorite Fruit' data={places}/>
      <TouchableOpacity style = {styles.donateButton} onPress = {() => checkEnergy()}>
        <Text style={styles.donateText}>기부하기</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Donate;





const styles = StyleSheet.create({
  container : {
    backgroundColor : 'green',
    flex:1,
    alignItems : 'center',
    flexDirection : 'column'
  },
  titleText : {
    fontSize : 50
  },
  normalText : {
    fontSize : 30,
  },
  donateButton : {
    backgroundColor: "#009688",
    height: 64,
    width: 128,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft: 20,
    marginRight: 20
  },
  donateText : {
    fontSize : 30
  }

})
