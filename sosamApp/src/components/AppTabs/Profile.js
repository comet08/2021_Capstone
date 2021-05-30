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
} from 'react-native';

import axios from 'axios';
//import AsyncStorage  from "@react-native-async-storage/async-storage"

import {useDispatch} from 'react-redux';
import checkLogin from '../../redux/actions';
import url from '../../url';

const Profile = ({navigation, setLoggedIn}) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    //asyncstorage에서 지우기
    await axios
      .get(`http://${url}/logout`)
      .then(res => {
        if (res.data) {
          AsyncStorage.setItem('loggedIn', JSON.stringify(false));
          dispatch(checkLogin());
        }
        console.log(res.data);
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
  const [age, setAge] = useState('연령 표시');
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
        setAge(json[0].age);
      });
  };

  //사용자 정보 수정하기
  const updateInfo = () => {
    const post = {
      name: utext,
      address: adtext,
      phone: ptext,
      age: agtext,
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
      <Text style={styles.appTitle}>사용자 설정</Text>

      {status ? (
        <View style={styles.frame}>
          <Text style={styles.label}>
            {' '}
            이름 {'\t\t\t\t'}
            <Text style={styles.info}> {uname} </Text>
          </Text>

          <Text style={styles.label}>
            {' '}
            닉네임 {'\t\t\t\t'}
            <Text style={styles.info}> {nname} </Text>
          </Text>

          <Text style={styles.label}>
            {' '}
            메시지 {'\t\t\t\t'}
            <Text style={styles.info}> {message} </Text>
          </Text>

          <Text style={styles.label}>
            {' '}
            휴대폰 번호 {'\t\t\t\t'}
            <Text style={styles.info}> {ph} </Text>
          </Text>

          <Text style={styles.label}>
            {' '}
            주소 {'\t\t\t\t'}
            <Text style={styles.info}> {addr} </Text>
          </Text>

          <Text style={styles.label}>
            {' '}
            연령 {'\t\t\t\t'}
            <Text style={styles.info}> {age} </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.frame}>
          <ScrollView>
            <View style={styles.row}>
              <View style={styles.inputWrap}>
                <Text style={styles.label}> 이름 </Text>
                <Text style={styles.label}> 닉네임 </Text>
                <Text style={styles.label}> 메시지 </Text>
                <Text style={styles.label}> 휴대폰 번호 </Text>
                <Text style={styles.label}> 주소 </Text>
                <Text style={styles.label}> 연령</Text>
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
                  nChangeText={ptext => setPtext(ptext)}
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
                  type="number"
                  placeholder="연령 입력"
                  onChangeText={agtext => setAgtext(agtext)}
                  value={agtext}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      <View style={styles.changeButton}>
        {status ? 
        (
          <Button title={'정보 수정'} color="gray" onPress={buttonPress} />
        ) : 
        (
          <Button title={'수정 완료'} color="black" onPress={changePress} />
        )}
      </View>

      <TouchableOpacity style={styles.logoutContainer} onPress={onLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
    paddingBottom: 70,
    //alignItems : 'center',
    //flexDirection : 'column',
    //justifyContent : 'center'
  },
  logoutContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  logout: {
    textAlign: 'center',
    fontSize: 20,
  },

  //사용자 설정 타이틀
  appTitle: {
    color: 'black',
    fontSize: 36,
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    //backgroundColor: '#fff',
    borderBottomColor: 'black',
    borderBottomWidth: 4,
  },
  //설정 내용 틀
  frame: {
    backgroundColor: '#eee',
    //width: 100,
    flex: 1,
    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    //marginBottom: 50,
    padding: 10,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrap: {
    flex: 1,
    //marginLeft: 30,
    borderColor: '#cccccc',
    //borderBottomWidth: 1,
    marginBottom: 150,
    //marginBottom: -15
  },

  label: {
    height: 40,
    paddingBottom: 10,
    marginTop: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,

    //fontSize: 24,
    //marginLeft: 10,
    //marginBottom: -12,
  },

  info: {
    //flex: 1,
    textAlign: 'center',
    //borderLeftWidth: 2,
    color: 'gray',
    //paddingLeft: 50,
    //marginLeft: 50,
    //height:40,
    //paddingBottom: 10,
    //marginTop: 20,
    //borderBottomColor: '#bbb',
    //borderBottomWidth: 1,
    //fontSize: 24,
    //marginBottom: -12,
  },

  input: {
    height: 40,
    //minheight:40,
    //maxHeight: 40,
    paddingBottom: 10,
    marginTop: 20,
    //flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },

  changeButton: {
    margin: 20,
    //marginLeft: 15,
    //marginRight: 15,
  },
});
