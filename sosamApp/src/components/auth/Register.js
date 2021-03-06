import React, {useState} from 'react';
import axios from 'axios';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import url from '../../url';
import { bold, plane } from '../../font';

const {width, height} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [id, setId] = useState('');
  const [idCheck, setIdCheck] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [passwdcheck, setPasswdCheck] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [nick, setNick] = useState('');
  const [errmessage, setErr] = useState('');
  const [checkPoint, setCheckPoint] = useState(false);

  const onidCheck = async () => {
    //아이디 체크
    if (id == '') {
      Alert.alert('X', '아이디를 입력해주세요.', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
    } else {
      console.log(id);
      await axios
        .get(`http://${url}/idcheck?id=${id.toLocaleLowerCase()}`)
        .then(res => {
          console.log(res.data);
          if (!res.data) {
            Alert.alert('새로운 아이디', '사용 가능한 아이디입니다.', [
              {
                text: '확인',
                style: 'cancel',
              },
            ]);
            setIdCheck(true);
          } else {
            Alert.alert('중복된 아이디', '이미 사용중인 아이디입니다.', [
              {
                text: '확인',
                style: 'cancel',
              },
            ]);
            setIdCheck(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const oncheck = () => {
    if (id == '') {
      setErr('아이디를 입력해주세요.');
      return false;
    }
    if (!idCheck) {
      setErr('아이디 중복확인을 해주세요.');
      return false;
    }
    if (passwd == '') {
      setErr('비밀번호를 입력해주세요.');
      return false;
    }
    if (passwdcheck == '') {
      setErr('비밀번호 확인을 입력해주세요.');
      return false;
    }
    if (passwdcheck != passwd) {
      setErr('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (name == '') {
      setErr('이름을 입력해주세요.');
      return false;
    }
    if (address == '') {
      setErr('주소를 입력해주세요.');
      return false;
    }
    if (phone == '') {
      setErr('번호를 입력해주세요.');
      return false;
    }
    if (birth == '') {
      setErr('나이를 입력해주세요.');
      return false;
    }
    if (nick == '') {
      setErr('닉네임을 입력해주세요.');
      return false;
    }
    if (!checkPoint) {
      setErr('개인정보 약관에 동의해주세요.');
      return false;
    }
    return true;
    //axios코드
  };
  const onSignIn = async () => {
    if (!oncheck()) return;

    let body = {
      id: id.toLowerCase(),
      passwd: passwd,
      name: name,
      address: address,
      phone: phone,
      birth: birth,
      nickname: nick,
      message: '',
    };

    await axios
      .post(`http://${url}/register`, body)
      .then(res => {
        if (res.data) {
          Alert.alert('환영합니다!', '회원가입이 완료되었습니다.', [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('Login');
              },
              style: 'cancel',
            },
          ]);
        } else {
          Alert.alert(
            '회원가입 실패',
            '회원가입에 실패하였습니다.\n다시 시도해주세요.',
            [
              {
                text: '확인',
                style: 'cancel',
              },
            ],
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.head}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <ScrollView>
          <View style={styles.buttonSet}>
            <TextInput
              style={[styles.input, {width: width - 120}]}
              placeholder="아이디"
              onChangeText={n => {
                setId(n);
                setIdCheck(false);
              }}
            />
            <TouchableOpacity style={styles.idButton} onPress={onidCheck}>
              <Text style={styles.idButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={n => setPasswd(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onChangeText={n => setPasswdCheck(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="이름"
            onChangeText={n => setName(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            onChangeText={n => setNick(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="휴대폰 번호(010-0000-0000)"
            onChangeText={n => setPhone(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="주소"
            onChangeText={n => setAddress(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="생년월일(2000-01-01)"
            onChangeText={n => setBirth(n)}
          />

          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={[styles.checkPoint, checkPoint && styles.checked]}
              onPress={() => {
                setCheckPoint(!checkPoint);
              }}>
              <Text style={styles.checkIcon}>{checkPoint && '✔'}</Text>
            </TouchableOpacity>
            <Text style={styles.checkText}>개인정보 처리약관 동의(필수)</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={onSignIn}>
            <Text style={styles.regButton}>회원가입</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.errmessage}>{errmessage}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  head: {
    fontFamily: bold,
    fontSize: 30,
    paddingVertical: 20,
    textAlign: 'center',
  },
  buttonSet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgb(64,183,173)',
    color: 'black',
    height: width / 8,
    justifyContent: 'center',
    fontSize: 20,
    marginVertical: width / 30,
    borderRadius : 10
  },
  regButton: {
    fontSize: 25,
    fontFamily: bold,
    color: 'black',
    textAlign: 'center',
  },
  idButton: {
    width: width / 4,
    marginBottom: width / 60,
    backgroundColor: 'rgb(64,183,173)',
    height: width / 9,
    justifyContent: 'center',
    borderRadius : 7
  },
  idButtonText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    fontFamily : bold
  },
  inputContainer: {
    width: width - width / 30,
    marginLeft: width / 60,
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: width / 28,
    width: width - width / 20,
    marginVertical: width / 60,
  },
  errmessage: {
    textAlign: 'center',
    color: 'red',
    fontFamily: plane,
    fontSize: 15,
  },
  checkContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width / 40,
  },
  checkPoint: {
    borderRadius: 20,
    width: width / 15,
    height: width / 15,
    borderColor: 'grey',
    borderWidth: 2,
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'white',
  },
  checkIcon: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  checkText: {
    color: 'black',
    fontFamily: plane,
    fontSize: width / 28,
  },
});
