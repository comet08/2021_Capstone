import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import DeprecatedEdgeInsetsPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedEdgeInsetsPropType';
import url from '../../url';
import {bold , plane} from '../../font'


const Rank = ({navigation}) => {
  const [data, setData] = useState(['1', '2', '3', '4']);
  const [isLoad, setisLoad] = useState(false);
  const [rankLoad, setrankLoad] = useState(true);

  const [myrank, setMyrank] = useState('랭크 표시');
  const [myid, setMyid] = useState('아이디 표시');
  const [uname, setUname] = useState('이름 표시');
  const [nname, setNname] = useState('닉네임 표시');
  const [message, setMessage] = useState('메시지 표시');

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

        setMyid(json[0].id);
        setUname(json[0].name);
        setNname(json[0].nickname);
        setMessage(json[0].message);
      });

    fetch(`http://${url}/rank`, {
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
        console.log(json);
        setData(json);
      });
  };

  /*
const findmyrank = data.map((d, idx) => {
  console.log(d.id);
  if(d.id == myid){
    setMyrank(d.rank)
    //break;
  }
    return d.rank;
});
*/

  /*
    const findmyrank = () => {
      console.log("로그확인")
      console.log(data.length)
      for(let i = 0; i < data.length; i++){
        console.log(i)
        console.log(data)
        if(data[i].id == myid){
          setMyrank(data[i].rank)
          console.log(data[i].rank)
          break;
        }
      }
    }*/

  if (!isLoad) {
    road();
    setisLoad(true);
    setrankLoad(false);
  }

  if (!rankLoad) {
    const findmyrank = data.map((d, idx) => {
      //console.log(d.id);
      if (d.id == myid) {
        setMyrank(d.rank);
        setrankLoad(true);
        //return d.rank;
      }
      //return d.rank;
    });
  }



  //const amountList = amount.map((amountM, index) => ({amountM}))
  const dataList = data.map(d => (
<View>
    <View key={d.rank} style={styles.rankbox}>

      <View style={styles.row}>
  
        <Text style={styles.ranknum}> {d.rank} 위 </Text>
 
          <Text style={styles.amountlist}>
            {' '}
            {'\t\t\t'} {d.amount}{' '}
          </Text>


          <Text>
            {' '}
            {'\t\t\t'} {d.nickname}{' '}
          </Text>

 
          <Text>
            {' '}
            {'\t\t\t'} {d.message}{' '}
          </Text>

      </View>
    </View>

</View>

  ));

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>순위</Text>

      <View style={styles.myFrame}>
        <Text style={styles.myranktitle}> {nname} </Text>
        <Text style={styles.uname}>
          <Text style={styles.urank}> ▪ {myrank} 위 ▪ </Text>
        </Text>
      </View>

      <View style={styles.frame}>
      <View style={styles.titlerow}>
        <Text style={styles.myranktitle}> 
         순위 {'\t\t\t\t'} 
         에너지 {'\t\t\t\t\t'} 
         닉네임 {'\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'} 
         메시지</Text>

      </View>
        <ScrollView>{dataList}</ScrollView>
      </View>
    </View>
  );
};

export default Rank;

const styles = StyleSheet.create({
  titlerow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  row: {
    flex: 1,
    flexDirection:'row',
    //justifyContent: 'space-between'
    //justifyContent: 'center',
  },
  amountlist: {
    width: 40,
  },
  namelist:{
    width: 80,
  },
  container: {
    backgroundColor: 'rgb(64,183,173)',
    flex: 1,
    //alignItems : 'center',
    //flexDirection : 'column'
  },
  //타이틀
  appTitle: {
    color: 'black',
    fontSize: 36,
    marginTop: 20,
    marginVertical : 20,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily : bold
  },
  myFrame: {
    backgroundColor: '#ddd',
    flex: 1,
    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    marginLeft: 15,
    marginRight: 15,
    flexDirection : 'column',

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

  myranktitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily : plane
  },
  rankbox: {
    backgroundColor : 'white',
    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flex: 1,
    borderColor: '#bbb',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    fontFamily : plane,
    //justifyContent: 'space-between'
  },
  ranknum: {
    padding: 0,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    //borderBottomColor: '#ddd',
    //borderBottomWidth: 1,
    //borderRightWidth: 1,
    //borderRightColor: '#ddd',
    //textAlign: 'center',
    //justifyContent : 'center'
  },
  uname: {
    padding: 10,
    borderBottomColor: '#bbb',
    textAlign: 'center',
    fontFamily : plane
  },
  urank: {
    padding: 10,
    borderBottomColor: '#bbb',
    textAlign: 'center',
    fontSize: 35,
    fontFamily : plane
  },
});
