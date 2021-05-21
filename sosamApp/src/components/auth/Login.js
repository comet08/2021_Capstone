import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, AsyncStorage
} from 'react-native';

import axios from 'axios';
import { useEffect } from 'react/cjs/react.production.min';

//import AsyncStorage from '@react-native-community/async-storage';
const {width, height} = Dimensions.get('window')

const Login = ({navigation, setLoggedIn}) =>{
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [checkPoint, setCheckPoint] = useState(false);
 
    
    const onAutoLogin = () =>{
        //asyncstorage에 auto설정 /
        
    }
    const onLogin = async() =>{
        //확인
        console.log(passwd);
        if(id=='' || passwd==''){
            Alert.alert(
                "실패",
                "아이디 혹은 비밀번호가 잘못됐습니다.\n다시 확인해주세요.",
                [
                {
                    text: "확인",
                    style: "cancel"
                },
                ],
            );
        }
        else{

            let body = {
                'id' : id.toLowerCase(),
                'passwd': passwd,
            }


            await axios.post(`/login`,body)
            .then((res)=>{
                if(res.data!=false)
                {
                    //asyncstorage에 아이디 저장
                    Alert.alert(
                        "환영합니다!",
                        "로그인에 성공하였습니다.",
                        [
                        {
                            text: "확인",
                            onPress: () => {
                                setLoggedIn(true);
                            },
                            style: "cancel"
                        },
                        ],
                    );
                    
                }
                else{
                    Alert.alert(
                        "로그인 실패",
                        "아이디 혹은 비밀번호가 잘못되었습니다.\n다시 시도해주세요.",
                        [
                        {
                            text: "확인",
                            style: "cancel"
                        },
                        ],
                    );
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    return(
           <View style={styles.container}>
               <Text style= {{marginTop : 250}}> 뭔가 간지나는 이미지 </Text>
               <View style = {styles.inputContainer}>
                <Text></Text>
                <TextInput style = {styles.input} placeholder="👤 아이디" onChangeText={n=>setId(n)}/>
                <TextInput style = {styles.input} placeholder=" 🔒 비밀번호" onChangeText={n=>setPasswd(n)}/>
               </View>
               {/*
               <View style = {styles.checkContainer}>
                    <TouchableOpacity style={[styles.checkPoint , checkPoint && styles.checked]} onPress={()=>{setCheckPoint(!checkPoint)}}>
                        <Text style={styles.checkIcon}>{checkPoint && '✔'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.checkText}>자동로그인</Text>
                </View>
                */}

               <View style={styles.login} >
                
                <TouchableOpacity style = {styles.login} onPress = {onLogin}>
                    <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
               </View>
               <TouchableOpacity style={styles.reg}
                onPress = {()=>{ navigation.navigate("Register"); }}>
                    <Text style = {styles.regText}>회원가입</Text>
                </TouchableOpacity>
              
               
           </View> 
    )
}
  


export default Login;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
    login : {
        backgroundColor : 'black',
        flexDirection : 'row',
        width : width-50,
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 10,
        borderRadius : 10
    },
    loginText : {
        color : 'white',
        fontSize : 20,
        fontFamily : 'nanumbarungothicbold'
    },
    input : {
        borderBottomColor : 'grey',
        borderBottomWidth : 2,
        width  : width-50,
        height : 60, 
        paddingVertical : 10,
        marginVertical : 10,
        fontSize : 20
    },
    inputContainer : {
    },
    reg:{
        backgroundColor : 'rgb(7, 101, 38)',
        flexDirection : 'row',
        width : width-50,
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 10,
        borderRadius : 10
    },
    regText : {
        color : 'black',
        fontSize : 20,
        fontFamily:'nanumbarungothicbold'
    },
    checkContainer : {
        width  : width,
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 10,
        marginBottom : 60,
       
    },
    checkPoint : {
        borderRadius : 20,
        width : 30,
        height : 30,
        borderColor : 'grey',
        borderWidth : 2,
        marginHorizontal : 10,
        justifyContent : 'flex-start',
        
    },
    checked : {
        backgroundColor:'black'
    },
    checkIcon : {
        color : 'white',
        textAlign : 'center',
        fontSize : 17,
    },
    checkText : {
        color : 'black',
        fontFamily : 'nanumbarungothic',
        fontSize : 17,
    }
})