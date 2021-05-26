  
import React, { useState } from 'react';

import {SafeAreaView, StyleSheet, View, Text, TextInput, Button, ScrollView
} from 'react-native';


const Rank = ({navigation}) =>{

  /*const [amount, setUname] = useState("이름 표시");
  const [nickname, setNname] = useState("닉네임 표시");
  const [message, setPh]= useState('메시지 표시');
  */

  const amount = ['1', '2', '3', '4']
  const nickname = ['1', '2', '3', '4']
  const message = ['1', '2', '3', '4']

  const road = () => {
    fetch("http://3.15.230.223/rank", {
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
      //data: json[0].amount,


  })
}




    return(
           <View style={styles.container}>
              <Text style={styles.appTitle}>순위</Text>



              <View style={styles.myFrame}>
          <Text style={styles.uname}> 이름 
            <Text style={styles.urank}> [내 순위] </Text>
          </Text>
        </View>

        <View style={styles.frame}>
        <ScrollView>
          <Text style={styles.ranklist}> [순위 리스트 표시] </Text>
          <Text style={styles.ranklist}> {amount[0]} </Text>
          <Text style={styles.ranklist}> {nickname[0]} </Text>
          <Text style={styles.ranklist}> {message[0]} </Text>



          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>
          <Text style={styles.ranklist}> 스크롤 뷰 확인용 </Text>


          <Text style={styles.ranklist}> 값 표시 </Text>
          <Text style={styles.ranklist}> 값 표시가 왜 안될까 </Text>

          </ScrollView>
        </View>




              <Text>Rank</Text>
           </View> 
    )
}
  

export default Rank;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'green',
        flex:1,
       //alignItems : 'center',
        //flexDirection : 'column'
    },
   
  //타이틀
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
  myFrame: {
    backgroundColor: '#ddd',
    flex: 1,
    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    marginLeft: 15,
    marginRight: 15,

    maxHeight: 100,
    padding: 15,
    justifyContent: 'center',

  },
  frame: {
    backgroundColor: '#eee',
    flex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,

    padding: 15,
    justifyContent: 'center',

  },
  uname: {
    padding: 10,
    borderBottomColor: '#bbb',
    textAlign: 'center',
  },
  urank: {
    padding: 10,
    borderBottomColor: '#bbb',
    textAlign: 'center',
    fontSize: 35,
  },

})
