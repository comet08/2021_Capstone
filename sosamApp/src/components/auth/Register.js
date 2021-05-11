import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Register = () =>{
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [passwdcheck, setPasswdCheck] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [nick, setNick] = useState('');
    const [errmessage, setErr] = useState('');

 

    const onSignIn = ()=>{
        if(passwdcheck != passwd){
            setErr("비밀번호가 일치하지 않습니다.")
            console.log("비밀번호 불일치")
            return;
        }
        body = {
            'id' : id,
            'passwd': passwd,
            'name'  :name,
            'address' : address,
            'phone' : phone,
            'age': age,
            'nick' : nick
        }


        
    }

    return(
           <View style={styles.container}>
               <Text>회원가입</Text>
                <TextInput placeholder='ID' onChange={n=>setId(n)}/>
                <TextInput placeholder='Password'onChange={n=>setPasswd(n)}/>
                <TextInput placeholder='Password check'onChange={n=>setPasswdCheck(n)}/>
                <TextInput placeholder='Name'onChange={n=>setName(n)}/>
                <TextInput placeholder='nick'onChange={n=>setNick(n)}/>
                <TextInput placeholder='Phone Number'onChange={n=>setPhone(n)}/>
                <TextInput placeholder='Address' onChange={n=>setAddress(n)}/>
                <TextInput placeholder='age' onChange={n=>setAge(n)}/>
                
                <View style = {styles.button} >
                    <Button title="회원가입"  style = {styles.button}
                    onPress={onSignIn}/>
                </View>
                <View>
                    <Text>{errmessage}</Text>
                </View>
           </View> 
    )
}
  


export default Register;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgb(7, 101, 38)',
        flex : 1,
        alignItems : 'center'
    },
    button : {
        backgroundColor : 'black',
        color: 'black',
       
        fontSize : 20
    }
})