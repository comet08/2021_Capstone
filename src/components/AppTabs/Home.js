import React, {useState, useEffect, Component} from 'react';

import {
  Animated,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import url from '../../url';
import axios from 'axios';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useSelector, shallowEqual} from 'react-redux';

const Home = ({navigation}) => {
  const [energy, setEnergy] = useState(0);
  const [run, setRun] = useState(false);
  const [runText, setRunText] = useState('운동하기');
  const [isEnabled, setIsEnabled] = useState('false');
  const [id, setId] = useState('daun');
  const userstate = useSelector(state => state.user, shallowEqual);

  const refreshEnergy = () => {
    axios
      .get(`http://${url}/energy`, {id: userstate.uid})
      .then(res => {
        setEnergy(res.data[0].amount);
      })
      .catch(err => {
        console.log('에너지 가져오기 에러');
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
    if (runText == '운동하기') {
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
          setRunText('운동하기');
        })
        .catch(err => console.log('블루투스 끄기 실패'));
      refreshEnergy();
    }
  };

  useEffect(() => {
    refreshEnergy();
  }, []);

  return (
    <View style={styles.container}>

    <View style={styles.energy}>
      <Image style = {styles.icon} source={require('../icon.png')}></Image>
      <Text style={styles.myEnergy}>내 에너지 : {energy}</Text>

      </View>
      <View style={styles.run}>
        <TouchableOpacity style={styles.runButton} onPress={onRun}>
          <Text style={styles.runText}>{runText}</Text>
        </TouchableOpacity>
      </View>
      <View>

      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  energy: {
    marginTop : 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon : {
    height : 80,
    width : 80,
    marginRight : 20
  },
  myEnergy: {
    marginTop: 10,
    fontSize: 40,
    color: 'black',
    fontFamily: 'nanumbarungothicbold',
  },
  runButton: {
    backgroundColor: 'rgb(64, 183, 173)',
    flexDirection: 'row',
    width: 209,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 2,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    marginVertical: 100,
  },
  runText: {
    color: 'black',
    fontSize: 50,
    fontFamily: 'nanumbarungothicbold',
  },
});
