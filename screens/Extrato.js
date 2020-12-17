import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, RefreshControl, FlatList} from 'react-native';
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

//testes
///var url = 'http://staging.sermaisvivante.com.br/'
//produção
var url = 'http://sermaisvivante.com.br/'

export default class Extrato extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      quantidadePremio: 1,
      colorRestantes: 'gray',
      loadingExtrato: true,
      points: '...',
    }
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Extrato()
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
  
  Pontos = async () => {
      //alert('aqui')
      this.setState({
		loadingExtrato: true,
	  });
      var Token = await AsyncStorage.getItem('@Token');
      
      fetch( url+ 'api/v1/points', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
      }).then((response) => response.json())
            .then(async (responseJson) => {
                 this.setState({
                    loadingExtrato: false,
                 });
                 if(responseJson.points){
                     var sim = false
                     pontos = responseJson.points
                     tem = pontos.includes('.')
                     if(tem == true){
                           pontos = pontos.replace('.','')
                           sim = true
                     }
                     tem = pontos.includes(',')
                     if(tem == true){
                           pontos = pontos.replace(',','')
                           sim = true
                     }
                     if(sim == true){
                           pontos = (parseInt(pontos) / 100).toFixed(0);
                     }  
                     this.setState({points: pontos})
                 }
             })
      .catch(async(error) => {
            console.log(error)
      });
      
  }       
  
  Extrato = async () => {
     this.setState({
        loadingExtrato: true,
        points: '...'
     });
     this.Pontos()
     
  	 var Token = await AsyncStorage.getItem('@Token');
      
     fetch( url+ 'api/v1/transactions', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                //fconsole.log(responseJson)
                if(!responseJson.error){
                     this.setState({
                        dataExtrato: responseJson.transactions,
                        loadingExtrato: false,
                     });
                }
            })
         .catch(async(error) => {
            console.log(error)
         });

  }   

  renderItem = ({item, index}) => { 
       var icon = []
       if(item.type == 'credit'){
          pontos = item.points
          pontos = pontos.toString()
          var sim = false
          tem = pontos.includes('.')
          if(tem == true){
               pontos = pontos.replace('.','')
               sim = true
          }
          tem = pontos.includes(',')
          if(tem == true){
               pontos = pontos.replace(',','')
               sim = true
          } 
          if(sim == true){
               pontos = (parseInt(pontos) / 100).toFixed(0);
          }
           
          data = item.compensated_at.split(' ')[0]
           
          if(item.compensated == true){
               icon =  [
                    <View key={item.id} style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                        <AntDesign name="check" size={15} color='#4db6ac' />   
                    </View>
               ]
          } 
          
          if(item.compensated == false){
              icon =  [
                    <View key={item.id} style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                        <MaterialCommunityIcons name="truck-fast" size={15} color='#92278f' />   
                    </View>
               ]
          }
          
           
          dados = [
              
            <View key={item.id}>
                <View>
                    <View style={{backgroundColor: '#fafafa', padding: 10}}>
                        <Text>
                            {data}
                        </Text> 
                    </View>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', padding: 8, flexDirection: 'row'}}>
                        <View style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                           {icon}
                        </View>
                        <View style={{padding: 5, flexDirection: 'column'}}>
                            <Text style={{color: 'gray'}}>
                                {item.description}
                            </Text> 
                            <View style={{padding: 5, borderRadius: 5, backgroundColor: '#b2dfdb', justifyContent: 'center', alignItems: 'flex-start', minWidth: 50}}>
                                <Text style={{color: '#4db6ac'}}>
                                    {pontos}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
              
          ]
       }
      
       if(item.type == 'purchase'){
          pontos = item.points
          pontos = pontos.toString()
          var sim = false
          tem = pontos.includes('.')
          if(tem == true){
               pontos = pontos.replace('.','')
               sim = true
          }
          tem = pontos.includes(',')
          if(tem == true){
               pontos = pontos.replace(',','')
               sim = true
          } 
          if(sim == true){
               pontos = (parseInt(pontos) / 100).toFixed(0);
          }
           
          data = item.compensated_at.split(' ')[0]
           
          if(item.compensated == true){
               icon =  [
                    <View key={item.id} style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                        <AntDesign name="check" size={15} color='tomato' />   
                    </View>
               ]
          } 
          
          if(item.compensated == false){
              icon =  [
                    <View key={item.id} style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                        <MaterialCommunityIcons name="truck-fast" size={15} color='#92278f' />   
                    </View>
               ]
          }
          
           
          dados = [
              
            <View key={item.id}>
                <View>
                    <View style={{backgroundColor: '#fafafa', padding: 10}}>
                        <Text>
                            {data}
                        </Text> 
                    </View>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', padding: 8, flexDirection: 'row'}}>
                        <View style={{height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                           {icon}
                        </View>
                        <View style={{padding: 5, flexDirection: 'column'}}>
                            <Text style={{color: 'gray'}}>
                                {item.description}
                            </Text> 
                            <View style={{padding: 5, borderRadius: 5, backgroundColor: '#ffcdd2', justifyContent: 'center', alignItems: 'flex-start', minWidth: 50}}>
                                <Text style={{color: 'tomato'}}>
                                    {pontos}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
              
          ]
       }
      
       return(
        <View style={{}}>
            {dados}
        </View>
     )
  } 
  
  Separador = () => {
    return (
      <View
        style={{
          marginTop: 3,
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
                         <Text numberOfLines={1} style={styles.styleName}>Extrato</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                 </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column'}}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', width: '100%', paddingBottom: '20%'}}
                     refreshControl={
                      <RefreshControl    
                         refreshing={this.state.loadingExtrato}
                         onRefresh={this.Extrato.bind(this)}
                         tintColor="#bdbdbd"
                         titleColor="gray"
                       />
                      }>
                        <View style={{paddingTop: '2%'}}/>
                        <View style={{padding: 0, width: '100%'}}>
                            <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 0, flexDirection: 'column'}}>
                                <Text>
                                    Saldo
                                </Text>
                                <View style={{padding: 5}}/>
                                <Text style={{fontSize: 20, color: '#4db6ac'}}>
                                    {this.state.points} Pontos
                                </Text> 
                            </View>
                        </View>
                        <View style={{paddingTop: '5%'}}/>
                        <View>
                            <FlatList showsHorizontalScrollIndicator={false} scrollEnabled={false} nestedScrollEnabled={false} 
                                  data={this.state.dataExtrato} 
                                  extraData={this.state}
                                  keyExtractor={(x,i) => i.toString()} 
                                  renderItem={this.renderItem}
                                  ItemSeparatorComponent={this.Separador}
                                  initialNumToRender={6} 
                                  removeClippedSubviews={false}
                                  onScrollBeginDrag={this.Recenter}
                                  onEndReachedThreshold={1}
                                  selected={this.state.selected} >
                            </FlatList> 
                        </View>
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