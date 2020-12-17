import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
import SideMenu from "react-native-side-menu";
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';

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


export default class Notificacoes extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0
    }
  }  

  componentDidMount = async () => {
    
  }
  
  TamanhoAparelho  = () => {
  	 let response = Dimensions.get('window')
	 
	 width = response.width
	 height = response.height


	 this.setState({
		width: width,
		height: height
	 });

  }   
   
  componentWillMount () {
  
  }
 
 
  render() {
    const { navigate } = this.props.navigation;
    
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
         {/*MENU*/}
         <View style={styles.header}>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingLeft}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
             </View>
             <View style={styles.name}>
                 <Text style={styles.styleName}>Notificações</Text>
             </View>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingRight}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
             </View>
          </View>
         {/*FIM MENU*/}
         <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', alignItems: 'center', padding: 10, flexDirection: 'column', alignItems: 'center'}}>
             
              <View style={{paddingTop: '15%'}}></View>
              
              
              <Image
                  style={{height: 100, width: 100}}
                  source={require('../assets/images/14.png')}
              /> 
       
              <View style={{paddingTop: '5%'}}></View>
            

              <View style={{flexDirection: 'column', paddingLeft: '3%', paddingRight: '3%'}}>
                  <Text style={{fontSize: 20, color: '#424242', textAlign: 'center'}}>Não há notificações!</Text>
                  <View style={{paddingTop: '3%'}}></View>
                  <Text style={{fontSize: 17, color: 'gray', textAlign: 'center'}}>Assim que tiver alguma coisa, mostraremos para você.</Text>
              </View>
                
         </View>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92278f',
  },
  container2: {
    flex: 1,
    backgroundColor: '#92278f',
  },
  header: {
    flexDirection: 'row',
    height: '8%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#92278f',
  },
  icon1: {
    paddingRight: 10,
  },
  name: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 1,
  },
  icon2:{
      flex: 1,
      alignItems: 'flex-end',
  },
  paddingLeft:{
    padding: 15,
    opacity: 0,
  },
  paddingRight:{
    paddingRight: 15,
    opacity: 0,
  },
  styleName:{
      color: 'white',
      fontSize: 18,
  }
});