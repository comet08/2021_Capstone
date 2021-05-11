import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './AppTabs/Profile';
import Home from './AppTabs/Home';
import Rank from './AppTabs/Rank';
import Discount from './AppTabs/Discount';
import Donate from './AppTabs/Donate';

const Tab = createBottomTabNavigator();

export default function MainTab(){

    return( 
    <Tab.Navigator
    initialRouteName = "Home"
    tabBarOptions= {{
        showLabel  :false,
        showIcon : true,
        activeTintColor: '#000',
        inactiveTintColor : '#d1cece',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'white',
        },
      }}
      >
    <Tab.Screen name="Donate" component = {Donate} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home' color={color} size={26} />
                )}
        }/>
        <Tab.Screen name="Discount" component = {Discount} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home' color={color} size={26} />
                )}
        }/>
        <Tab.Screen name="Home" component = {Home} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home' color={color} size={26} />
                )}
        }/>
        <Tab.Screen name="Rank" component = {Rank} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home' color={color} size={26} />
                )}
        }/>
        <Tab.Screen name="Profile" component = {Profile} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='home' color={color} size={26} />
                )}
        }/>
     </Tab.Navigator>

    );
}

