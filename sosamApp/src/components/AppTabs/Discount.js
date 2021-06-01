import React, {useState, useEffect} from 'react';

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import url from '../../url';
import axios from 'axios';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import { bold, plane } from '../../font';

const {width, height} = Dimensions.get('window')

const Discount = ({navigation}) => {
  const [energy, setEnergy] = useState(0);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const userstate = useSelector(state => state.user);

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

      dispatch(checkEnergy());
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
    getAddress();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.titleText}>할인받기</Text>
      <View style={styles.body}>

      <Text style={styles.normalText}>내 전력량 : {userstate.energy}</Text>
      <TextInput
        style={styles.input}
        placeholder="할인받을 전력량"
        onChangeText={n => {
          setSendEnergy(n);
        }}
      />

      <Text style={styles.normalText}>나의 집 주소</Text>
      <Text style={styles.home}>{address}</Text>
      
        <View style={styles.center}>
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => checkEnergy()}>
          <Text style={styles.donateText}>할인받기</Text>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Discount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(64,183,173)',
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  body: {
    marginLeft : 10,
    marginRight : 10,
    //backgroundColor: '#ddd',

  },
  titleText: {
    color: 'black',
    fontSize: 36,
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily : bold,
/*
    marginTop: 50,
    marginBottom: 30,
    fontSize: 50,
    textAlign: 'center',
    fontFamily : bold
    */
  },
  normalText: {
    fontSize: 22,
    marginTop: 40,
    fontFamily : plane,

    textAlign: 'center',
    borderColor : '#fff',
    paddingVertical : 10,
    borderRadius : 5,
    paddingHorizontal : 10,
    borderLeftWidth: 2,
    borderRightWidth:2,
    marginLeft: 100,
    marginRight: 100,
    margin: 10,

  },
  input: {
    marginTop: 10,
    fontSize: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontFamily : plane,
    backgroundColor : 'white',
    paddingLeft : 10,
    borderRadius : 10,
     elevation : 5,
    paddingVertical : 15,
    textAlign: 'center',
  },
  home: {
    marginTop : 10,
    fontSize: 20,
    paddingVertical : 7,
    paddingLeft : 10,
    backgroundColor : 'white',
    borderRadius : 10,
    elevation : 5,
    paddingVertical : 15,
    textAlign: 'center',
  },
  place: {
    height: 50,
    width: 300,
    marginTop: 30,
    fontSize: 25,
  },
  donateButton: {
    backgroundColor: 'white',
    height: 64,
    width: width - 50,
    borderRadius : 10,
    elevation : 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  },
  donateText: {
    fontSize: 30,
    fontFamily: bold,
    
  },
}); 