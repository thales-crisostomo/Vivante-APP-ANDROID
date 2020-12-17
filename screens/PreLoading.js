import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, StatusBar} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import MainTabNavigator from './MainTabNavigator';
////import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';

//testes
///var url = 'http://staging.sermaisvivante.com.br/'
//produção
var url = 'http://sermaisvivante.com.br/'

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class PreLoading extends React.Component {
    
  constructor() {
    super()
    this.state = {
       
    }
  }     
    
  componentDidMount = async () => {
    const { navigate } = this.props.navigation;  
    var Token = await AsyncStorage.getItem('@Token');
    fetch( url+ 'api/v1/profile', {
     method: 'GET',
     headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + Token,
     },
     }).then((response) => response.json())
        .then(async (responseJson) => {
            if(responseJson.error){
                var timer1 = setInterval(async() => {
                   navigate('Login')
                   clearInterval(timer1);
                }, 2000); 
            }else{
                 var timer2 = setInterval(async() => {
                   navigate('Home');
                   clearInterval(timer2);
                }, 2000); 
                var userid = responseJson.id
                userid = userid.toString()
                await AsyncStorage.setItem('@UserName', responseJson.data.name);
                await AsyncStorage.setItem('@Userid', userid);
            }
         })
    .catch(async(error) => {
         console.log(error)
         navigate('Login')
    });  
  }

  componentWillMount () {
  
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style={styles.container}>
        <StatusBar backgroundColor="transparent"  barStyle = "dark-content" />
        <DotIndicator count={3} color='#92278f' size={15} />
        <View style={{position: 'absolute', bottom: '4%'}}>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#92278f', fontSize: 13, fontWeight: 'bold'}}>
                    Powered by 
                </Text>
            </View>
            <Image
               style={{width: 100, height:  50, paddingTop: '5%'}}
               source={require('../assets/images/logo-stars-completo.png')}
            />
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});