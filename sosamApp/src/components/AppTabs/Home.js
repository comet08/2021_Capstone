import React, {useState, useEffect, Component} from 'react';

import {
  Animated,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import url from '../../url';
import axios from 'axios';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useSelector, shallowEqual} from 'react-redux';
import {bold , plane} from '../../font'

const {width, height} = Dimensions.get('window')

const Home = ({navigation}) => {
  const [energy, setEnergy] = useState(0);
  const [log, setLog] = useState([]);
  const [checked, setChecked] = React.useState("history");
  const [run, setRun] = useState(false);
  const [runText, setRunText] = useState('운동시작');
  const [isEnabled, setIsEnabled] = useState('false');
  const [hist, setHist] = useState([]);
  const userstate = useSelector(state => state.user, shallowEqual);
  

  const histList = () => {
    if (checked == "history") {
        setHist(
          <>
          <View style={styles.historyTitleFrame}>
            <Text style={styles.historyTitle}> 운동 내역 </Text>
          </View>

          <View style={styles.historyList}>
            <ScrollView>
            <Text style={styles.historyText}> 날짜 시작 끝 전력 </Text>
            </ScrollView>
          </View>
          </>
    )
    } else if (checked == "donate") {
      setHist(
        <>
          <View style={styles.historyTitleFrame}>
            <Text style={styles.historyTitle}> 기부 내역 </Text>
          </View>

          <View style={styles.historyList}>
            <ScrollView>
            <Text style={styles.historyText}> 날짜 기부정보 전력 </Text>
            </ScrollView>
          </View>
          </>
        )
    } else if (checked == "discount") {
      setHist(
        <>
          <View style={styles.historyTitleFrame}>
            <Text style={styles.historyTitle}> 할인 내역 </Text>
          </View>

          <View style={styles.historyList}>
            <ScrollView>
            <Text style={styles.historyText}> 날짜 할인정보 전력 </Text>
            </ScrollView>
          </View>
          </>
        )
    }
  }

  const refreshEnergy = () => {
    axios
      .get(`http://${url}/energy`)
      .then(res => {
        setEnergy(res.data[0].amount);
      })
      .catch(err => {
        console.log('에너지 가져오기 에러');
      });
  };

  const getLog = () => {
    axios
      .get(`http://${url}/log`)
      .then(res => {
        console.log(res.data);
      })  
      .catch(err => {
        console.log('로그  에러');
      });
  };

  const connect = device => {
    setRunText('연결중...');
    BluetoothSerial.connect(device)
      .then(res => {
        console.log('연결됨');
        BluetoothSerial.write('s')
          .then(res => { 
            setRunText('운동종료');
            console.log('운동시작됨');
          })
          .catch(err => console.log('운동시작 실패'));
      })
      .catch(err => Alert.alert('장치와 연결 실패'));
  }; 

  const onRun = () => {
    if (runText == '운동시작') {
      BluetoothSerial.requestEnable()
        .then(res => setIsEnabled(true))
        .catch(err => Alert.alert('블루투스를 켜주세요'));
 
      if (isEnabled == true) {
        connect('98:D3:61:F9:90:8C');
      }
    } else {
      BluetoothSerial.write('e');
      BluetoothSerial.disconnect()
        .then(res => {
          setIsEnabled(false);
          setRunText('운동시작');
        })
        .catch(err => console.log('블루투스 끄기 실패'));
      refreshEnergy();
      getLog();
    }
  };

  useEffect(() => {
    refreshEnergy();
    getLog();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image style={styles.logo} source={require('../../logo.png')} />
        <Text style={styles.myEnergy}> 내 에너지 : {energy} mA </Text>
      </View>
      <TouchableOpacity style={styles.runButton} onPress={onRun}>
          <Text style={styles.runText}>{runText}</Text>
      </TouchableOpacity>
 

    <View style={styles.row}>
      <RadioButton
        value="history"
        status={ checked === 'history' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('history'); histList();}}
      />
      <RadioButton
        value="donate"
        status={ checked === 'donate' ? 'checked' : 'unchecked' }
        onPress={() => { setChecked('donate'); histList(); }}
      />
      <RadioButton 
        value="discount"
        status={ checked === 'discount' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('discount'); histList();}}
      />
    </View>

    <View style={styles.histFrame}>
      {hist}
    </View>
    </View>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(64,183,173)',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  head:{
    marginVertical : 20,
    alignItems : 'center',
    width : width,
    
  },
  logo : {
    width : 100,
    height : 100,
    alignItems : 'center',
    marginVertical : 20,
    
  },
  myEnergy: {
    fontSize: 27,
    fontFamily : plane,
    backgroundColor : 'white',
    borderColor : 'black',
    paddingVertical : 10,
    borderRadius : 5,
    paddingHorizontal : 10,
    borderWidth : 2,
    elevation : 10
  },
  runButton: {

    backgroundColor: 'white',
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 100,
    minWidth: 88,
    marginVertical: 20,
    borderColor : 'rgb(20,100,100)',
    borderWidth : 5,
    paddingVertical : 10,
    paddingHorizontal : 50,

    elevation : 10
  },
  runText: {
    color: 'black',
    fontSize: 40,
    fontFamily : bold,
    textAlign :'center'
  },
  bottom: {
    flexDirection: 'row',
  },
  discountButton: {
    backgroundColor: '#009688',
    height: 64,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  discountText: {
    fontSize: 30,
  },
  donateButton: {
    backgroundColor: '#009688',
    height: 64,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  donateText: {
    fontSize: 30,
  },
  historyTitleFrame: {
    backgroundColor: '#ddd',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    maxHeight: 100,
    padding: 15,
    justifyContent: 'center',
  },
  row: {
    flexDirection:'row',
    justifyContent: 'center',
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

});
