import React, {useState, useEffect} from 'react';

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import url from '../../url';
import axios from 'axios';
import {useSelector, shallowEqual} from 'react-redux';

const Discount = ({navigation}) => {
  const [energy, setEnergy] = useState(0);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [address, setAddress] = useState('');

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

  const checkEnergy = () => {
    if (energy < sendEnergy) {
      Alert.alert('가지고 있는 전력량보다 할인받을 전력량이 많습니다.');
    }
    else
      sendBody();
  };

  const sendBody = () => {
    let today = new Date();
    let body = {
      id: userstate.uid,
      date: today.toISOString().split('T')[0],
      time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      energy: sendEnergy,
      address: address,
    };

    axios
      .post(`http://${url}/discount`, body)
      .then(res => {
        if (res.data != false) {
          Alert.alert('할인이 완료되었습니다.');
        }
        else
          Alert.alert('실패하였습니다. 다시 시도해주세요.');
      })
      .catch(err => {
        Alert.alert('할인 실패');
      });
  };

  const getAddress = () => {
    axios
      .get(`http://${url}/myPlace`)
      .then(res => {
        console.log(res.data[0]);
        setAddress(res.data[0].address);
      })
      .catch(err => {
        console.log('주소 가져오기 에러');
      });
  };

  useEffect(() => {
    refreshEnergy();
    getAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>할인받기</Text>
      <View style={styles.body}>
      <Text style={styles.normalText}>내 전력량 : {energy}</Text>
      <TextInput
        style={styles.input}
        placeholder="할인받을 전력량"
        onChangeText={n => {
          setSendEnergy(n);
        }}
      />
      <Text style={styles.normalText}>나의 집 주소</Text>
      <Text style={styles.home}>{address}</Text>
      </View>
      <View style={styles.center}>
      <TouchableOpacity
        style={styles.donateButton}
        onPress={() => checkEnergy()}>
        <Text style={styles.donateText}>할인받기</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  body: {
    marginLeft : 10,
    marginRight : 10,
  },
  titleText: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 50,
    textAlign: 'center',
  },
  normalText: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 30,
    marginTop: 40,
  },
  input: {
    marginTop: 30,
    fontSize: 25,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  home: {
    marginTop : 10,
    fontSize: 25,
  },
  place: {
    height: 50,
    width: 300,
    marginTop: 30,
    fontSize: 25,
  },
  donateButton: {
    backgroundColor: 'rgb(64, 183, 173)',
    height: 64,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  },
  donateText: {
    fontSize: 30,
    fontFamily: 'nanumbarungothicbold',
  },
});
