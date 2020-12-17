import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, FlatList, RefreshControl} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
import SideMenu from "react-native-side-menu";
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';
//import PercentageCircle from 'react-native-percentage-circle';
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


export default class Favoritos extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      loadingFavoritos: false,
      loadingGeral: 'flex',
      conteudo: 'none'
    }
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Pontos()
     this.Favoritos()
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
   
  Pontos = async () => {
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
                 if(responseJson.points){
                     
                     pontos = responseJson.points
                     tem = pontos.includes('.')
                     var sim = false
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
  
  Favoritos = async (id) => {
      this.setState({ loadingFavoritos: true })
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/favorites', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({ loadingFavoritos: false, conteudo: 'flex', loadingGeral: 'none'})
                if(responseJson.length < 1){
                    responseJson = [
                      {
                        sem_dados: true
                      }
                    ]
                }
                if(!responseJson.error){
                    responseJson = responseJson.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                     });

                    this.setState({ dataFavoritos: responseJson })
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }
  
  componentWillMount () {
  
  }
 
  LoadingMore = () => {
    
      alert('dasdsa')
      
  };

  SeparadorFavoritos = () => {
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
  
  FazPedido = (image, points, name, technical) => {
     const { navigate } = this.props.navigation;
     navigate('FazPedido', { image: image, points: points, name: name, technical: technical})
  }
  
  deleteFavoritos = id => {
      const filteredData = this.state.dataFavoritos.filter(item => item.id !== id);
      this.setState({ dataFavoritos: filteredData });
  }

  renderItemFavoritos = ({item, index}) => {    
       
      var data
      
      if(item.sem_dados){
         data = [
             
             <View key={'z123'} style={{paddingTop: '45%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: this.state.width/1.04, overflow: 'hidden', display: 'flex'}}>
                <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>Nenhum favorito até o momento.</Text>
                <View key={'z123'} style={{paddingTop: '10%'}}/>
                <Image
                  resizeMode="center"
                  style={{width: this.state.width/3.2, height:  this.state.width/3.2, borderRadius: this.state.width/6.4}}
                  source={require('../assets/images/23.png')}
                />
             </View>
             
         ]
      }
      else{

           meus_pontos = this.state.points
           pontos = item.price
           pontos = pontos.toString()

           tem = pontos.includes('.')
           var sim = false
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

           meus_pontos = parseInt(meus_pontos) 
           porcentagem = (meus_pontos / pontos) * 100

           if(porcentagem > 100){
               porcentagem = 100
           }
           
           data = [
               <View style={{ }} key={'z123123'}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TouchableOpacity activeOpacity={1} style={{width: this.state.width/2 - 10, justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', padding: 10, borderRadius: 5,  elevation: 3, paddingTop: 25, paddingBottom: 25}} onPress={() => this.FazPedido(item.photo, item.price, item.name, item.technical_information)}>
                             {/*
                             <TouchableOpacity style={{backgroundColor: 'white', position: 'absolute', right: 2, top: 2, padding: 5, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.deleteFavoritos(item.id, index)}>
                                    <AntDesign name='close' size={25}  style={{color: '#e0e0e0'}}/>   
                             </TouchableOpacity>
                             */}
                            <View style={{borderWidth: 4, borderRadius: 1000, borderColor: '#92278f'}}>
                                 <View style={{justifyContent: 'center', alignItems: 'center', width: this.state.width/3, height:  this.state.width/3, borderRadius: 1000, backgroundColor: 'white', elevation: 3}}>
                                    <DotIndicator count={3} color='#92278f' size={8} style={{position: 'absolute'}}/>
                                    <Image
                                      style={{width: this.state.width/3.2, height:  this.state.width/3.2, borderRadius: 1000}}
                                      source={{uri: item.photo}}
                                    />
                                 </View>
                             </View>  
                             <View style={{padding: 5}}/>
                             <Text numberOfLines={1} style={{fontSize: 14, color: 'gray'}}>{item.name}</Text>
                             <View style={{padding: 2}}/>
                             <Text style={{fontSize: 14, color: '#4fc3f7'}}>{pontos} Pontos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           ]
           
       }  
          
       return(
        <View style={{padding: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {data}
            </View>
        </View>
     )
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
                         <Text style={styles.styleName}>Lista de Desejos</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                  </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column'}}>
                    <View style={{display: this.state.loadingGeral, height: this.state.height/1.4, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                       <MaterialIndicator size={60} color='#92278f' trackWidth={3} />
                    </View>
                    <View style={{display: this.state.conteudo}}>
                        <FlatList showsVerticalScrollIndicator={false} scrollEnabled={true}
                              numColumns={2}
                              data={this.state.dataFavoritos} 
                              extraData={this.state}
                              keyExtractor={(x,i) => i.toString()} 
                              renderItem={this.renderItemFavoritos}
                              ItemSeparatorComponent={this.SeparadorFavoritos}
                              initialNumToRender={6} 
                              removeClippedSubviews={false}
                              onScrollBeginDrag={this.Recenter}
                              onEndReachedThreshold={1}
                              selected={this.state.selected} 
                              refreshControl={
                                  <RefreshControl    
                                     refreshing={this.state.loadingFavoritos}
                                     onRefresh={this.Favoritos.bind(this)}
                                     tintColor="#bdbdbd"
                                     titleColor="gray"
                                  />
                               }>
                         </FlatList>
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
  },
  paddingRight:{
    paddingRight: 15,
    opacity: 0,
  },
  styleName:{
      color: 'white',
      fontSize: 18,
  },
  normal: {
    color: '#bdbdbd',
  },
  selected: {
    color: 'tomato',
  },
  selectedDisFavorite: {
    color: '#bdbdbd',
  }
});