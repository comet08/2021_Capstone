import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'; 

import MainTab from './src/components/MainTab';

import Discount from './src/components/AppTabs/Discount'
import Donate from './src/components/AppTabs/Donate'
import Home from './src/components/AppTabs/Donate'
import Profile from './src/components/AppTabs/Profile'
import Rank from './src/components/AppTabs/Rank'

import Login from './src/components/auth/Login'
import Register from './src/components/auth/Register'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        loggedIn : false
    }
  }

  render(){
      const {loggedIn} = this.state;
      if(loggedIn){
        return(
          <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName='Login' headerMode = 'None'>
              <Stack.Screen name='Login' component={Login} navigation = {this.props.navigation} />
              <Stack.Screen name='Register' component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
      else{
        return(
          <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName='Main' headerMode = 'None'>
              <Stack.Screen name='Main' component={MainTab} />
              <Stack.Screen name='Discount' component={Discount} />
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Donate' component={Donate} />
              <Stack.Screen name='Profile' component={Profile} />
              <Stack.Screen name='Rank' component={Rank} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }

    

  }
 
}

export default App;
const styles = StyleSheet.create({
  container : {
      backgroundColor : 'green'
  }
})