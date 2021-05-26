import React, { useState } from 'react';

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial';

const Home = ({navigation}) =>{
  const [energy, setEnergy] = useState(0);
  const [run, setRun] = useState(false);
  const [runText, setRunText] = useState("운동하기");

  //먼저 블루투스랑 아두이노 연결 - 사용자가 직접 해야함
  //기기랑 연결되었으면 운동 시작 누를 수 있다
  //블루투스 안켜졌으면 alert 블루투스를 켜고 운동기기와 연결해주세요
  //기기랑 연결 안되었으면 운동 시작 누르면 alert 운동기기와 연결이 되지 않았습니다 표시
  //운동 시작 누르면 터미널에 write 해서 s 보내기
  //운동 종료 누르면 터미널에 write 해서 e 보내기
  //시리얼로 들어온 값 받은 다음 내 전력량 갱신
  
  const refreshEnergy = (e) => {
    setEnergy(e);
    return e;
  }

  const connect = (device) => {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      Toast.showShortBottom(`Connected to device ${device.name}`)
      this.setState({ device, connected: true, connecting: false })
    })
    .catch((err) => Toast.showShortBottom(err.message))
  }


  const onRun = () => {
    connect("arduino")

    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => console.log("error!"))


  }

  const offRun = () => {


  }

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
    backgroundColor : '#2196F3',
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
