import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Fontisto';
import FoIcon from 'react-native-vector-icons/FontAwesome';


import Profile from './AppTabs/Profile';
import Home from './AppTabs/Home';
import Rank from './AppTabs/Rank';
import Discount from './AppTabs/Discount';
import Donate from './AppTabs/Donate';

const Tab = createBottomTabNavigator();
const iconSize = 35

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
                        <MIcon name='hand-heart' color={color} size={iconSize} />
                )}
    }/>
        <Tab.Screen name="Discount" component = {Discount} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <FIcon name='shopping-sale' color={color} size={iconSize} />
                )}
        }/>
        <Tab.Screen name="Home" component = {Home} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MIcon name='home' color={color} size={iconSize} />
                )}
        }/>
        <Tab.Screen name="Rank" component = {Rank} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <FoIcon name='trophy' color={color} size={iconSize} />
                )}
        }/>
        <Tab.Screen name="Profile" component = {Profile} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MIcon name='account-circle' color={color} size={iconSize} />
                )}
        }/>
     </Tab.Navigator>

    );
}

