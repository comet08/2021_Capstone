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
import {Picker} from '@react-native-picker/picker';

const Donate = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [energy, setEnergy] = useState(0);
  const [places, setPlaces] = useState([]);
  const [sendEnergy, setSendEnergy] = useState(0);
  const [sendPlace, setSendPlace] = useState('');
  const [pi, setPi] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

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
      Alert.alert('가지고 있는 전력량보다 기부할 전력량이 많습니다.');
    } else {
      sendBody();
    }
  };

  const sendBody = () => {
    let today = new Date();
    let body = {
      id: userstate.uid,
      date: today.toISOString().split('T')[0],
      time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      energy: sendEnergy,
      donateto: sendPlace,
    };

    axios
      .post(`http://${url}/donate`, body)
      .then(res => {
        if (res.data != false) {
          Alert.alert('기부가 완료되었습니다.');
        }
      })
      .catch(err => {
        Alert.alert('기부 실패');
      });
  };

  const refreshPlaces = () => {
    axios
      .get(`http://${url}/places`)
      .then(res => {
        console.log(res.data);
        //setPlaces(res.data.map(function(item, index){ return {label : index, value : item.place}}));
        setPi(
          res.data.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.place} value={item.place} />
            );
          }),
        );
      })
      .catch(err => {
        console.log('기부 장소 가져오기 에러');
      });
  };

  useEffect(() => {
    refreshPlaces();
    refreshEnergy();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>기부하기</Text>
      <Text style={styles.normalText}>내 전력량 : {energy}</Text>
      <TextInput
        style={styles.input}
        placeholder="기부할 전력량"
        onChangeText={n => {
          setSendEnergy(n);
        }}
      />
      <Text style={styles.normalText}>기부할 곳을 선택해주세요.</Text>

      <Picker
        selectedValue={sendPlace}
        style={{height: 50, width: 200}}
        placeholder="기부 장소"
        onValueChange={(itemValue, itemIndex) => setSendPlace(itemValue)}>
        {pi}
      </Picker>

      <TouchableOpacity
        style={styles.donateButton}
        onPress={() => checkEnergy()}>
        <Text style={styles.donateText}>기부하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleText: {
    marginTop: 50,
    fontSize: 50,
  },
  normalText: {
    marginTop: 50,
    fontSize: 30,
  },
  input: {
    marginTop: 20,
    fontSize: 30,
  },
  donateButton: {
    backgroundColor: 'rgb(7, 101, 38)',
    height: 64,
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  donateText: {
    fontSize: 30,
  },
});
