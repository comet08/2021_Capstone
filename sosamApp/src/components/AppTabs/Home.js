import React, { useState, useEffect } from 'react';

import {
  Animated,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { useSelector, shallowEqual } from 'react-redux';

const Home = ({navigation}) =>{
  const [energy, setEnergy] = useState(0);
  const [run, setRun] = useState(false);
  const [runText, setRunText] = useState("운동하기");
  const [isEnabled, setIsEnabled] = useState("false");
  const [id, setId] = useState("daun");
  //const userstate = useSelector((state)=>state.user, shallowEqual);

  const refreshEnergy = (e) => {
/*
    axios.get('/energy', userstate.uid)
    .then(function(){
      setEnergy(e);
      return e;
    })
    .catch(function(error){
      console.log("에너지 가져오기 에러");
    })
*/
    setEnergy(e);
  }

  const connect = (device) => {
    BluetoothSerial.connect(device)
    .then((res) => {
      console.log("연결됨")
      BluetoothSerial.write('s')
      .then((res) => {
        setRunText("운동종료")
        console.log("운동시작됨")
      })
      .catch((err) => console.log("운동시작 실패"))
    })
    .catch((err) => Alert.alert("장치와 연결 실패"))
  }


  const onRun = () => {
    if (runText == "운동하기"){
      BluetoothSerial.requestEnable()
      .then((res) => setIsEnabled(true))
      .catch((err) => Alert.alert("블루투스를 켜주세요"))

      if (isEnabled == true){
        connect("98:D3:61:F9:90:8C")
      }
    }
    else {
      BluetoothSerial.write('e')
      setRunText("운동하기")
      BluetoothSerial.disconnect()
      .then((res) => setIsEnabled(false))
      .catch((err) => console.log("블루투스 끄기 실패"))
      refreshEnergy()
    }
  }

  useEffect(()=>{ refreshEnergy(100); }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.myEnergy}>내 에너지</Text>
      <Text style={styles.runText}>{energy}</Text>
    <View style={styles.run}>
      <TouchableOpacity style = {styles.runButton} onPress = {onRun}>
        <Text style={styles.runText}>{runText}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.bottom}>
      <TouchableOpacity style = {styles.discountButton} onPress = {() => navigation.navigate("Discount")}>
        <Text style={styles.discountText}>할인받기</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.donateButton} onPress = {() => navigation.navigate("Donate")}>
        <Text style={styles.donateText}>기부하기</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'white',
    flex:1,
    alignItems : 'center',
    flexDirection : 'column'
  },
  myEnergy : {
    marginTop : 50,
    fontSize: 50
  },
  runButton : {
    backgroundColor : 'rgb(7, 101, 38)',
    flexDirection : 'row',
    width : 209,
    height : 200,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 10,
    borderRadius : 2,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    marginVertical : 100,
  },
  runText : {
    color : 'black',
    fontSize: 50,
  },
  bottom : {
    flexDirection : 'row'
  },
  discountButton : {
    backgroundColor: "#009688",
    height: 64,
    width: 128,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft: 20,
    marginRight: 20
  },
  discountText : {
    fontSize : 30
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
