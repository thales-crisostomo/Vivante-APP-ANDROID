import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, FlatList, RefreshControl} from 'react-native';
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
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

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



export default class Regulamento extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      height: 0,
      loadingRegulamento: false,
      loadingGeral: 'flex',
      conteudo: 'none'
    }
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Regulamento()
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
 
  Regulamento = async () => {
      
  	 var Token = await AsyncStorage.getItem('@Token');
      
     fetch( url+ 'api/v1/campaigns/regulations', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                if(!responseJson.error){
                     this.setState({
                        dataRegulamento: responseJson,
                        loadingRegulamento: false,
                        conteudo: 'flex',
                        loadingGeral: 'none'
                     });
                }
            })
         .catch(async(error) => {
            console.log(error)
         });

  }   

  Atualizar = () => {
     this.setState({
        loadingRegulamento: true,
     });
     this.Regulamento()
  }
  
  renderItem = ({item, index}) => { 
      
       texto = item.content
       texto = texto.replace(/<[^>]*>?/gm, '');
       texto = entities.decode(texto)
      
       return(
        <View style={{padding: 5, paddingLeft: '5%', paddingRight: '5%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 26, color: 'black', marginTop: 20}}>{item.start_at}</Text>
           
                <Text style={{fontSize: 16, color: 'gray', marginTop: 20}}>{texto}</Text>
            </View>
        </View>
     )
  } 
  
  Separador = () => {
    return (
      <View
        style={{
          marginTop: 5,
          backgroundColor: 'white', 
          width: '100%',
        }}
      />
    ); 
  } 
  
  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
    <Fragment>
        <SafeAreaView style ={{flex: 0, backgroundColor: '#92278f'}} /> 
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
                         <Text style={styles.styleName}>Regulamento</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                 </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white'}}>
                     
                    <View style={{display: this.state.conteudo}}>
                        <FlatList
                              data={this.state.dataRegulamento} 
                              extraData={this.state}
                              keyExtractor={(x,i) => i.toString()} 
                              renderItem={this.renderItem}
                              ItemSeparatorComponent={this.Separador}
                              initialNumToRender={6} 
                              removeClippedSubviews={false}
                              onScrollBeginDrag={this.Recenter}
                              onEndReachedThreshold={1}
                              selected={this.state.selected} 
                              refreshControl={
                                  <RefreshControl    
                                     refreshing={this.state.loadingRegulamento}
                                     onRefresh={this.Atualizar.bind(this)}
                                     tintColor="#bdbdbd"
                                     titleColor="gray"
                                  />
                               }>
                       </FlatList> 
                   </View>
                   <View style={{display: this.state.loadingGeral, height: this.state.height/1.3, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                       <MaterialIndicator size={60} color='#92278f' trackWidth={3} />
                   </View>
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
    backgroundColor: '#92278f',
  },
  header: {
    flexDirection: 'row',
    height: '7.5%',
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
    opacity: 1,
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