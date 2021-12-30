import React, {useState} from 'react';

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
  Touchable,
} from 'react-native';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Fontisto';
import FoIcon from 'react-native-vector-icons/FontAwesome5';


import axios from 'axios';
import AsyncStorage  from "@react-native-async-storage/async-storage"

import {useDispatch} from 'react-redux';
import { checkLogin } from '../../redux/actions';
import url from '../../url';
import {bold , plane} from '../../font'

const {width, height} = Dimensions.get('window');
const color="white";
const iconSize=30

const Profile = ({navigation, setLoggedIn}) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    //asyncstorage에서 지우기
    await axios
      .get(`http://${url}/logout`) 
      .then(res => {
        if (res.data) {
          console.log(res.data);
          AsyncStorage.setItem('loggedIn', JSON.stringify(false));
          dispatch(checkLogin(false, ' '));
        }
        
      })
      .catch(err => {
        console.log(err);
      });

    //
  };

  //let uname = "이름 표시"
  //let nname = "닉네임 표시"
  //let ph = '번호 표시'
  //let addr = '주소 표시'
  //let age = '연령 표시'
  //let thisStatus = true
  //let thisStatus = false

  const [uname, setUname] = useState('이름 표시');
  const [nname, setNname] = useState('닉네임 표시');
  const [message, setMessage] = useState('메시지 표시');
  const [ph, setPh] = useState('번호 표시');
  const [addr, setAddr] = useState('주소 표시');
  const [age, setAge] = useState('생일 표시');
  const [status, setstatus] = useState(true);
  const [isLoad, setisLoad] = useState(false);

  //textinput
  const [utext, setUtext] = useState('');
  const [ntext, setNtext] = useState('');
  const [mtext, setMtext] = useState('');
  const [ptext, setPtext] = useState('');
  const [adtext, setAdtext] = useState('');
  const [agtext, setAgtext] = useState('');

  const road = () => {
    fetch(`http://${url}/userinfo`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json[0]);

        setUname(json[0].name);
        setNname(json[0].nickname);
        setMessage(json[0].message); 
        setPh(json[0].phone);
        setAddr(json[0].address);
        setAge(json[0].birth);
      });
  };

  //사용자 정보 수정하기
  const updateInfo = () => {
    const post = {
      name: utext,
      address: adtext,
      phone: ptext,
      birth: agtext,
      message: mtext,
      nickname: ntext,
    };

    fetch(`http://${url}/modifyinfo`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post), //메시지 추가하기
    })
      .then(res => res.json())
      .then(json => {
        console.log(json[0]);
      });

      road();
  };

  const buttonPress = () => {
    //Alert.alert('정보 수정', '정보가 수정되었습니다.')

    setUtext(uname);
    setNtext(nname);
    setMtext(message);
    setPtext(ph);
    setAdtext(addr);
    setAgtext(age);

    setstatus(!status);
    //thisStatus = !thisStatus
  };

  const changePress = () => {
    setstatus(!status);
    //thisStatus = !thisStatus
    //updateInfo()

    Alert.alert('정보 수정', '정보가 수정되었습니다.');
    updateInfo();
    setisLoad(false);
    //console.log(nname)
  };

  if (!isLoad) {
    road();
    setisLoad(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.appTitle}>사용자 설정</Text>
      </View>

      {status ? (
        <>
        <View style={styles.frame}>
          <View style={styles.user}>
            <View style={styles.icon}>
              <FoIcon name="seedling" color={"black"} size={50} />
            </View>
            <View style={styles.nickMessage}>
            <Text style={styles.nick}> {nname} </Text>
            <Text style={styles.message}> {message} </Text>
            </View>
          </View>
        </View>
        <View style={styles.changeButton}>
          <TouchableOpacity style={styles.cButton} onPress={buttonPress}>
            <IIcon name="settings-outline" color={color} size={iconSize} />
            <Text style={styles.cText}>정보 수정</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.cButton} onPress={buttonPress}>
            <FoIcon name="running" color={color} size={iconSize} />
            <Text style={styles.cText}>운동 내역</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.cButton} onPress={buttonPress}>
            <FIcon name="shopping-sale" color={color} size={iconSize} />
            <Text style={styles.cText}>전기료 할인 내역</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cButton} onPress={buttonPress}>
          <MIcon name="hand-heart" color={color} size={iconSize} />
            <Text style={styles.cText}>기부 내역</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutContainer} onPress={onLogout}>
        <Text style={styles.logout}>로그아웃</Text>
      </TouchableOpacity>
        </>
        
      ) : (
        <ScrollView>
        <View style={styles.frame}>
          
            <View style={styles.row}>
              <View style={styles.inputWrap}>
                <Text style={styles.label}> 이름 </Text>
                <Text style={styles.label}> 닉네임 </Text>
                <Text style={styles.label}> 메시지 </Text>
                <Text style={styles.label}> 휴대폰 번호 </Text>
                <Text style={styles.label}> 주소 </Text>
                <Text style={styles.label}> 생일</Text>
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  autoFocus={true}
                  style={styles.input}
                  placeholder="이름"
                  onChangeText={utext => setUtext(utext)}
                  value={utext}
                  returnKeyType="next"
                />
                <TextInput
                  autoFocus={true}
                  style={styles.input}
                  placeholder="닉네임"
                  onChangeText={ntext => setNtext(ntext)}
                  value={ntext}
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder="메시지"
                  onChangeText={mtext => setMtext(mtext)}
                  value={mtext}
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder="번호 입력"
                  onChangeText={ptext => setPtext(ptext)}
                  value={ptext}
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder="주소 입력"
                  onChangeText={adtext => setAdtext(adtext)}
                  value={adtext}
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder="생일 입력"
                  onChangeText={agtext => setAgtext(agtext)}
                  value={String(agtext)} 
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>
            </View>
        </View>
        <View style={styles.changeButton}>
          <Button title={'취소'} color="black" onPress={()=>{setstatus(!status)}} />
          <Text></Text>
          <Button title={'수정 완료'} color="black" onPress={changePress} />
        </View>
        </ScrollView>
      )}
      
    </View>
    
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',   
    flex:1,
  },
  logoutContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    color : 'white',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  logout: {
    textAlign: 'center',
    color  : 'white',
    fontSize: width/20,
    fontFamily : plane,
    marginVertical : 10,
  },
  header:{
    backgroundColor: "rgb(30,150,150)"
  },

  //사용자 설정 타이틀
  appTitle: {
    color: 'white',
    fontSize: width/18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '300',
    textAlign: 'center',

    fontFamily : bold
  },
  //설정 내용 틀
  frame: {
    backgroundColor: 'white',

    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    //marginBottom: 50,
    padding: 10,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  nick:{
    color : "black",
    fontSize: width/20,
    fontFamily: bold,
  },
  message:{
    paddingTop: 10,
    color : "black",
    fontFamily: plane,
  },
  user:{
    borderRadius: 10,
    borderColor: "black",
    borderWidth:1,
    padding: 10,
    
    alignItems: 'center',
    textAlign: 'center'

  },
  icon:{
    borderRadius: 50,
    borderColor: "black",
    borderWidth:3,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems : 'center'

  },
  nickMessage:{
    marginLeft: 10,
    paddingTop: 10,
    alignItems: 'center'
 
  },
  row: {
    flexDirection: 'row',
  },
  cButton:{
    fontFamily: plane,
    backgroundColor : "rgb(30,153,153)",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row"
    
  },
  cText:{
    fontFamily: plane,
    fontSize : width/20,
    marginLeft: 20,
    color: 'white',
    paddingTop: 5
  },
  inputWrap: {
    flex: 1,
    //marginLeft: 30,
    borderColor: '#cccccc',
    //borderBottomWidth: 1,
    marginBottom: 10,
    //marginBottom: -15
    
  },
  space:{
    marginVertical: 10,
    backgroundColor: 'grey',
    height: 2,
  },  
  label: {
    height: 40,
    paddingBottom: 10,
    marginTop: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontFamily : plane,
    fontSize: width/24,

    //marginLeft: 10,
    //marginBottom: -12,
  },

  info: {
    textAlign: 'center',
    color: 'gray',

    fontFamily : plane
  },

  input: {
    height: 40,
    paddingBottom: 10,
    marginTop: 20,
    //flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontFamily : plane
  },

  changeButton: {
    margin: 20,
    fontFamily : plane
    //marginLeft: 15,
    //marginRight: 15,
  },
});
