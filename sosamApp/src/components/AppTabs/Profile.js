import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, TouchableOpacity, SafeAreaView, Alert
} from 'react-native';

import axios from 'axios';
//import AsyncStorage  from "@react-native-async-storage/async-storage"

import { useDispatch } from 'react-redux';
import checkLogin from '../../redux/actions';

const Profile = ({navigation, setLoggedIn}) =>{
    const dispatch = useDispatch();
    const onLogout = async ()=>{
        //asyncstorage에서 지우기
        await axios.get(`/logout`)
        .then((res)=>{
            if(res.data) {
                AsyncStorage.setItem('loggedIn', JSON.stringify(false));
                dispatch(checkLogin());
            }
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        //
    }

    //let uname = "이름 표시"
    //let nname = "닉네임 표시"
    //let ph = '번호 표시'
    //let addr = '주소 표시'
    //let age = '연령 표시'
    //let thisStatus = true
    //let thisStatus = false

    const [uname, setUname] = useState("이름 표시");
    const [nname, setNname] = useState("닉네임 표시");
    const [ph, setPh]= useState('번호 표시');
    const [addr, setAddr] = useState('주소 표시');
    const [age, setAge] = useState('연령 표시');
    const [status, setstatus] = useState(true);


      const road = () => {
        fetch("http://52.15.171.192/userinfo", {
          method: "get",
          headers: {
              'Accept': 'application/json',
              'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(),
      })
        .then((res)=>res.json())
        .then((json)=>{ 
          console.log(json[0]);
    
          setUname(json[0].name);
          setNname(json[0].nickname);
          setPh(json[0].phone);
          setAddr(json[0].address);
          setAge(json[0].age);

      }) 
      }

      const buttonPress = () => {
        //Alert.alert('정보 수정', '정보가 수정되었습니다.')
        setstatus(!status)
        //thisStatus = !thisStatus
      }
    
      const changePress = () => {
        setstatus(!status)
        //thisStatus = !thisStatus
        Alert.alert('정보 수정', '정보가 수정되었습니다.')
      }

      road()
      
    return(
           <View style={styles.container}>
             <Text style={styles.appTitle}>사용자 설정</Text>

              { 
                status ? 
                <View style={styles.frame}>

                  <Text style={styles.label}> 이름 {'\t\t\t\t'}
                  <Text style={styles.info}> {uname} </Text>
                  </Text>                  

                  <Text style={styles.label}> 닉네임 {'\t\t\t\t'}
                  <Text style={styles.info}> {nname} </Text>
                  </Text> 

                  <Text style={styles.label}> 휴대폰 번호 {'\t\t\t\t'}
                  <Text style={styles.info}> {ph} </Text>
                  </Text>

                  <Text style={styles.label}> 주소 {'\t\t\t\t'}
                  <Text style={styles.info}> {addr} </Text>
                  </Text>

                  <Text style={styles.label}> 연령 {'\t\t\t\t'}
                  <Text style={styles.info}> {age} </Text>
                  </Text>

                </View>
                :
                <View style={styles.frame}>
                <View style={styles.row}>
                <View style={styles.inputWrap}>
                  <Text style={styles.label}> 이름 </Text>
                  <Text style={styles.label}> 닉네임 </Text>
                  <Text style={styles.label}> 휴대폰 번호 </Text>
                  <Text style={styles.label}> 주소 </Text>
                  <Text style={styles.label}> 연령</Text>
                </View>

                <View style={styles.inputWrap}>
                  <TextInput 
                      autoFocus={true}
                      style={styles.input} 
                      placeholder="이름"
                      onChangeText={(uname) => setUname({uname})}
                      value = {uname}
                      returnKeyType="next"
                  /> 
                  <TextInput 
                      autoFocus={true}
                      style={styles.input} 
                      placeholder="닉네임"
                      onChangeText={(nname) => setNname({nname})}
                      value = {nname}
                      returnKeyType="next"
                  /> 
                  <TextInput 
                      style={styles.input} 
                      placeholder="번호 입력" 
                      nChangeText={(ph) => setPh({ph})}
                      value={ph}
                      returnKeyType="next"
                  /> 
                  <TextInput 
                      style={styles.input} 
                      placeholder="주소 입력" 
                      onChangeText={(addr) => setAddr({addr})}
                      value={addr}
                      returnKeyType="next"
                  />
                  <TextInput
                      style={styles.input} 
                      type="number"
                      placeholder="연령 입력" 
                      onChangeText={(age) => setAge({age})}
                      value={age.toString()}
                      keyboardType="numeric"
                      returnKeyType="next"
                  />
                  </View>
                  </View>
                </View>
            }
       

          <View style={styles.changeButton}>
          {
            status ? 
            <Button title={'정보 수정'} color="gray" onPress={ buttonPress }/>
            :
            <Button title={'수정 완료'} color="black" onPress={ changePress }/>
          }
          </View>


              <TouchableOpacity style={styles.logoutContainer}onPress={onLogout}>
                  <Text style={styles.logout}>Logout</Text>
              </TouchableOpacity>
           </View> 
    )
}
  


export default Profile;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
        paddingBottom: 70,
       //alignItems : 'center',
        //flexDirection : 'column',
        //justifyContent : 'center'

    },
    logoutContainer : {
        marginLeft: 20,
        marginRight: 20,
        padding: 5,
        backgroundColor : 'white',
        justifyContent : 'center',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    logout:{
      textAlign: 'center',
        fontSize : 20,

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
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1,
    //marginLeft: 30,
    borderColor: "#cccccc",
    //borderBottomWidth: 1,
    marginBottom: 150
    //marginBottom: -15
  },
  
  label: {
    height:40,
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
    height:40,
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


})
