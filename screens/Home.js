import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet} from 'react-native';
import { createBottomTabNavigator, createAppContainer, tabBarIcon } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';  
import { SimpleLineIcons } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons';  
import { Octicons } from '@expo/vector-icons';  
import { Fontisto } from '@expo/vector-icons';  
import Feed from '../screens/Feed';
import Rank from '../screens/Rank';
//import Premios from '../screens/Premios';
//import Notificacoes from '../screens/Notificacoes';


export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="home" size={25} color={tintColor} />
        ),
      }
    },
    Rank: {
      screen: Rank,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="trophy" size={25} color={tintColor} />
        )
      }
    },
    /*
    Premios: {
      screen: Premios,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <View style={{backgroundColor: 'red', borderRadius: 1000, padding: 20, height: 50, width: 50, paddingBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
               <Image resizeMode='cover' source={require('../assets/images/20.png')}  style={{height: 25, width: 25, }} /> 
            </View>
        ),
      }
    },
    Algum: {
      screen: Rank,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="gift" size={25} color={tintColor} />
        )
      }
    },
    Notificações: {
      screen: Notificacoes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="notification" size={25} color={tintColor} />
        )
      }
    },
    */
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: '#2196f3',
      showLabel: false,
      style:{
            borderTopWidth: 0,
            borderTopColor:'#eeeeee'
      },
      indicatorStyle: {
            backgroundColor: 'red',
      },
    }
  },
  
);



const AppContainer = createAppContainer(bottomTabNavigator);

