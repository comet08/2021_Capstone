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
import { checkEnergy } from '../../redux/actions';
import { useDispatch } from 'react-redux';

// 로그 페이지들
import DiscountLog from './DiscountLog';
import ExerLog from './ExerLog';
import DonateLog from './DonateLog';
 
const {width, height} = Dimensions.get('window')


const Home = ({navigation}) => {
  const [energy, setEnergy] = useState(0);
  const [exerLog, setExerLog] = useState([]);
  const [discountLog, setDiscountLog] = useState([]);
  const [donateLog, setDonateLog] = useState([]);
  const [checked, setChecked] = useState("history");
  const [run, setRun] = useState(false);
  const [runText, setRunText] = useState('운동시작');
  const [isEnabled, setIsEnabled] = useState('false');
  const [hist, setHist] = useState([]);
  const [startTime, setStartTime] = useState(0);

  const userstate = useSelector(state => state.user);
  const dispatch = useDispatch();

  const histList = async (type) => {

    if (type === "history") {
        setHist(
          <ExerLog data={exerLog} />
    )
    } else if (type === "donate") {
      setHist( 
        <DonateLog data={donateLog} />
        )
    } else if (type === "discount") {
      setHist( 
        <DiscountLog data={discountLog} />
        )
    }
  }
  

  

  const getLog = async () => {
    await axios
      .get(`http://${url}/logdis`)
      .then(res => {
        setDiscountLog(res.data);
      })  
      .catch(err => {
        console.log('로그  에러');
      });

      await axios
      .get(`http://${url}/logdona`)
      .then(res => {
        setDonateLog(res.data);
      })  
      .catch(err => {
        console.log('로그  에러');
      });

      await axios
      .get(`http://${url}/logele`)
      .then(res => {
        setExerLog(res.data);
      })  
      .catch(err => {
        console.log('로그  에러');
      });
  };

  
  const getTime = () =>{
    let today = new Date();
    let t = '';
    if(today.getHours() < 10)
      t += '0';
    t += today.getHours() + ':';
    if(today.getMinutes() < 10)
      t+= '0';
    t +=today.getMinutes()+ ':';
    if(today.getSeconds()<10)
      t+='0';
    t += today.getSeconds();
    return t;
  }

  const connect = device => {
    setRunText('연결중...');
    BluetoothSerial.connect(device)
      .then(res => {
        console.log('연결됨');
        BluetoothSerial.write('s')
          .then(res => { 
            setStartTime(getTime());
            setRunText('운동종료');
            console.log('운동시작됨');
          })
          .catch(err => console.log('운동시작 실패'));
      })
      .catch(err => Alert.alert('장치와 연결 실패'));
  }; 

  const getMessage = () =>{
    let st = "end/";
    st+=userstate.uid + '/' + startTime + '/' + getTime()+'/';
    console.log(st);
    return st;
  } 
  const onRun = async () => {
    if (runText == '운동시작') {

    
      BluetoothSerial.requestEnable()
        .then(res => 
        {
          setIsEnabled(true);
          connect('98:D3:61:F9:90:8C');

        })
        .catch(err => Alert.alert('블루투스를 켜주세요'));
    } 
    else {
        await BluetoothSerial.write(getMessage());
        await BluetoothSerial.disable()
          .then(res => {
            setIsEnabled(false);
            setStartTime('');
            setRunText('운동시작');
          })
          .catch(err => console.log('블루투스 끄기 실패'));
       
      }
      setTimeout(()=>{
        dispatch(checkEnergy());
        getLog(); 
      },3000);     
  }; 
 
  useEffect(() => {
    dispatch(checkEnergy());
    getLog(); 
    histList();
  }, []);

    
  

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image style={styles.logo} source={require('../../logo.png')} />
        <Text style={styles.myEnergy}> 내 에너지 : {Math.floor(userstate.energy)} mA </Text>
      </View>
      <TouchableOpacity style={styles.runButton} onPress={onRun}>
          <Text style={styles.runText}>{runText}</Text>
      </TouchableOpacity>
 

    <View style={styles.row}>
      <RadioButton
        value="donate"
        status={ checked === 'donate' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('donate'); histList('donate')} }
      />
      <RadioButton
        value="history"
        status={ checked === 'history' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('history'); histList('history');}}
      />
      <RadioButton
        value="discount"
        status={ checked === 'discount' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('discount'); histList('discount')}}
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
    width : width/4,
    height :  width/4,
    alignItems : 'center',
    marginVertical : 20,
    
  },
  myEnergy: {
    fontSize: width/14,
    fontFamily : bold,
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
    fontSize: width/8,
    fontFamily : bold,
    textAlign :'center'
  },
  bottom: {
    flexDirection: 'row',
  },

  
  row: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  radio : {
    width : 10,
    height : 10,
    padding : 5,
  }
});
