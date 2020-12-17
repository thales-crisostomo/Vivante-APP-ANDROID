import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
import SideMenu from "react-native-side-menu";
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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


export default class Pedidos extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      quantidadePremio: 1,
      colorRestantes: 'gray'
    }
  }  

  Premios = async () => {
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/awards', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson)
                if(!responseJson.error){
                    this.setState({ dataPosts: responseJson })
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }    
    
    
    
  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Premios()
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
   
  componentWillMount = async () => {
     
  }
  
  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
    <Fragment>
        <SafeAreaView style ={{flex: 0, backgroundColor: 'rgba(41,43,51, 1)'}} /> 
            <SafeAreaView style={styles.container}>
              <View style={styles.container2}>
                 {/*MENU*/}
                 <View style={styles.header}>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingLeft} onPress={() => goBack(null)}>
                              <SimpleLineIcons name="arrow-left" size={20} color='white' />   
                         </TouchableOpacity>
                     </View>
                     <View style={styles.name}>
                         <Text numberOfLines={1} style={styles.styleName}>Pedidos</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                  </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column'}}>

                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', width: '100%', padding: 5, paddingBottom: '20%'}}>
                        <View style={{paddingTop: '2%'}}/>

                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto2.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="inbox" size={25} color='#ba68c8' />   
                                  <Text style={{color: '#ba68c8', paddingLeft: 4}}>
                                      Preparando
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto7.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <MaterialCommunityIcons name="truck-delivery" size={25} color='#ffc107' />   
                                  <Text style={{color: '#ffc107', paddingLeft: 4}}>
                                      A caminho
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto5.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="check" size={25} color='#26a69a' />   
                                  <Text style={{color: '#26a69a', paddingLeft: 4}}>
                                      Entregue
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto4.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <MaterialCommunityIcons name="truck-delivery" size={25} color='#ffc107' />   
                                  <Text style={{color: '#ffc107', paddingLeft: 4}}>
                                      A caminho
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto1.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="inbox" size={25} color='#ba68c8' />   
                                  <Text style={{color: '#ba68c8', paddingLeft: 4}}>
                                      Preparando
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto2.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="inbox" size={25} color='#ba68c8' />   
                                  <Text style={{color: '#ba68c8', paddingLeft: 4}}>
                                      Preparando
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto2.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="inbox" size={25} color='#ba68c8' />   
                                  <Text style={{color: '#ba68c8', paddingLeft: 4}}>
                                      Preparando
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto5.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="check" size={25} color='#26a69a' />   
                                  <Text style={{color: '#26a69a', paddingLeft: 4}}>
                                      Entregue
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto8.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="check" size={25} color='#26a69a' />   
                                  <Text style={{color: '#26a69a', paddingLeft: 4}}>
                                      Entregue
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto9.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="check" size={25} color='#26a69a' />   
                                  <Text style={{color: '#26a69a', paddingLeft: 4}}>
                                      Entregue
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '2%'}}/>
                        <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                             <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%', paddingRight: '10%'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5,}}>
                                    <Image
                                       style={{width: 40, height: 40, borderRadius: 20}}
                                       source={require('../assets/images/produto10.jpg')}
                                    />
                                </View>
                                <Text numberOfLines={1} style={{color: 'gray', paddingLeft: 13}}>
                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique bland
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
                                  <AntDesign name="check" size={25} color='#26a69a' />   
                                  <Text style={{color: '#26a69a', paddingLeft: 4}}>
                                      Entregue
                                  </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingTop: '4%'}}/>
                    </ScrollView>
                 </View>
            </View>
        </SafeAreaView>
    </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgba(41,43,51, 1)',
  },
  header: {
    flexDirection: 'row',
    height: '7.5%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(41,43,51, 1)',
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
  },
  paddingRight:{
    paddingRight: 15,
    opacity: 0,
  },
  styleName:{
      color: 'white',
      fontSize: 20,
  }
});