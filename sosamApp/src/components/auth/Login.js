import React, { useState } from 'react';

import {Text,TextInput,View, Button, StyleSheet
} from 'react-native';



const Login = ({navigation}) =>{
    const [id, setId] = useState('');
    const [passwd, setpasswd] = useState('');

    return(
           <View style={styles.container}>
               <TextInput placeholder="ID" onChange={n=>setId(n)}/>
               <TextInput placeholder="Passwd" onChange={n=>setPasswd(n)}/>
               <View style={styles.login} >
                <Button title="Login" 
                onPress = {()=>{
                    
                }} />
               </View>
               <Button title="회원가입"
               onPress = {()=>{
                   navigation.navigate("Register");
               }} />
               
           </View> 
    )
}
  


export default Login;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgb(7, 101, 38)',
        flex:1,
       alignItems : 'center',
        flexDirection : 'column'
    },
    login : {
        color : 'black',
        flexDirection : 'row',
        borderRadius : 50,
    }
})