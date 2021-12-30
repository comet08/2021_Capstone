import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Dimensions
} from 'react-native';
import DeprecatedEdgeInsetsPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedEdgeInsetsPropType';
import url from '../../url';
import {bold , plane} from '../../font'

import RankInfo from './RankInfo'

const {width, height} = Dimensions.get('window')

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
        setData(json);
      });
  };


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
  useEffect(()=>{
    road();
  }, [])


  return ( 
    <View style={styles.container}>
      <Text style={styles.appTitle}>순위</Text>

      <View style={styles.myFrame}> 
        <Text style={styles.myrank}> 내 순위 {myrank} 위 </Text>
      </View>

      <View style={styles.frame}>
 
        <ScrollView>
          {
            data.map((d, index) => (
              <RankInfo d={d} key={index} />
             ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default Rank;

const styles = StyleSheet.create({
  titlerow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    
  },
  amountlist: {
    width: 40,
  },
  namelist:{
    width: 80,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    width : width
    //alignItems : 'center',
    //flexDirection : 'column'
  },
  //타이틀
  appTitle: {
    color: 'black',
    fontSize: width/11,
    marginTop: 20,
    marginVertical : 20,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily : bold
  },
  myFrame: {
    backgroundColor: 'rgb(64,183,173)',
    flex: 1,
    borderTopLeftRadius: 5, //각
    borderTopRightRadius: 5, //각
    marginHorizontal : 5,
    flexDirection : 'column',

    maxHeight: 80,

    justifyContent: 'center',
    
  },
  frame: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal : 5,
    marginBottom: 15,
    textAlign: 'center',
    padding: 15,
    
  },
  myrank:{
    fontSize: width/20,
    color: "black",
    textAlign: 'center',
    fontFamily: bold
  },

  myranktitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily : plane,
    fontSize: width/25,
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
    fontSize: width/9,
    fontFamily : plane
  },

});