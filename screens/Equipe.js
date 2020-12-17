import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, FlatList, RefreshControl} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
import SideMenu from "react-native-side-menu";
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';

var url = 'http://staging.sermaisvivante.com.br/'

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


export default class Equipe extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      loadingEquipe: true,
      DetalhePerfil: '...',
      modalDetalhe: 'false',
    }
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
    // this.Favoritos()
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
   
  Equipe = async (id) => {
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
                console.log(responseJson)
                this.setState({ loadingEquipe: false })
                if(!responseJson.error){
                    responseJson = responseJson.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                     });

                    this.setState({ dataEquipe: responseJson })
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }
  
  componentWillMount () {
  
  }
 
  LoadingMore = () => {
    this.setState({
        loadingPremios: false,
    });
  };

  SeparadorEquipe = () => {
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
  
  Detalhes = (image, points, name, technical) => {
    this.setState({ modalDetalhe: true });
  }

  renderItemEquipe = ({item, index}) => {    
       
       return(
        <View style={{padding: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} style={{width: '100%', justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', padding: 10, borderRadius: 5,  shadowColor: 'gray', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 4, paddingTop: 25, paddingBottom: 25}} onPress={() => this.Detalhes()}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image
                          style={{width: 50, height: 50, borderRadius: 25}}
                          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                        />
                    </View>
                    <View style={{marginLeft: '-6%', flex: 3, flexDirection: 'column'}}>
                        <Text style={{color: 'black'}}>Thales Crisostomo</Text>
                        <Text style={{color: 'gray'}}>Participante</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <Text style={{color: 'black'}}>Thales Crisostomo</Text>
                        <Text style={{color: 'gray'}}>Participante</Text>
                    </View>
                            
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{padding: 10, backgroundColor: 'red'}}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
     )
 } 

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
    <Fragment>
         {/*MODAL DETALHES*/}
         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalDetalhe}
              >
              <SafeAreaView style={{flex: 1}}>
                  <View style={{height: '5%', backgroundColor: 'white', position: 'absolute', zIndex: 99999999999, width: '100%'}}/>
                  <View style={{top: '5%', width: '100%', backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 5}, shadowOpacity: 0.1, shadowRadius: 0,  position: 'absolute', zIndex: 99999999999, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection:'row', height: '7%'}}>
                        <View style={{flex: 1, height: '100%'}}></View>
                        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <Text numberOfLines={1} style={{fontSize: 20, color: 'gray'}}>
                                {this.state.DetalhePerfil}
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <TouchableOpacity style={{padding: 10}} onPress={() => this.setState({ modalDetalhe: false })}>
                                <Feather name="chevron-down" size={25} color='gray' />     
                            </TouchableOpacity>
                        </View>
                  </View>    
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1}>
                        <View>
                            <StatusBar barStyle="dark-content" />
                            
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                 <View style={{paddingTop: '16%'}}/>
                                 <View style={{justifyContent: 'center', alignItems: 'center', height: this.state.height /4, backgroundColor: 'white', width: this.state.width}}>
                                     <TouchableOpacity style={{width: this.state.width /5, height: this.state.width/ 5, borderRadius: this.state.width/5, justifyContent: 'center', alignItems: 'center', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5}} onPress={() => this.EscolherFoto()}>
                                         <Image
                                               style={{width: this.state.width/5, height:  this.state.width/5, borderRadius: this.state.width/10, position: 'absolute', zIndex: this.state.IndexImage}}
                                               source={{uri: this.state.photo}}
                                         />
                                         <Image
                                               style={{width: this.state.width/5, height:  this.state.width/5, borderRadius: this.state.width/10, position: 'absolute', zIndex: this.state.IndexPerfil}}
                                               source={{uri: this.state.base64Perfil}}
                                        />
                                        </TouchableOpacity>
                                        <View style={{paddingTop: '5%'}}/>
                                        <Text style={{color: 'gray', fontSize: 20}}>{this.state.username}</Text>
                                  </View>                       
                            </View>
                            <View style={{padding: '2%'}}/>
                        </View>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, borderTopWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.username}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.birthday}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.gender}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.email}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.phone}</Text>
                            </View>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.address}</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                                <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>{this.state.access}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text style={{color: 'gray', fontSize: 17}}>Administrador</Text>
                            </View>
                        </TouchableOpacity>
                     </TouchableOpacity>
                    <Animated.View style={{padding: '8%'}}/>
                </ScrollView>
            </SafeAreaView>      
        </Modal>
        {/*FIM MODAL PERFIL*/}
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
                         <Text style={styles.styleName}>Minha Equipe</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                  </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
                        <View style={{padding: 5,  width: this.state.width}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', width: '100%', flex: 1,  justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', padding: 10, borderRadius: 5,  shadowColor: 'gray', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 4}} onPress={() => this.Detalhes()}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <View style={{width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', shadowColor: 'gray', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, shadowRadius: 6}}>
                                            <Image
                                              style={{width: 50, height: 50, borderRadius: 25}}
                                              source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex: 3, flexDirection: 'column'}}>
                                        <Text numberOfLines={1} style={{color: 'black'}}>Thales Crisostomo</Text>
                                        <Text style={{color: 'gray'}}>Participante</Text>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'column'}}>
                                        <Text numberOfLines={1} style={{color: 'black'}}>60 Pontos</Text>
                                        <Text numberOfLines={1} style={{color: 'gray'}}>CC: 550</Text>
                                    </View>

                                    <View style={{ alignItems: 'center', padding: 5}}>
                                        <View style={{padding: 10, backgroundColor: 'tomato', borderRadius: 999}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>  
                        <View style={{padding: 5,  width: this.state.width}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', width: '100%', flex: 1,  justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', padding: 10, borderRadius: 5,  shadowColor: 'gray', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 4}} onPress={() => this.Detalhes()}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <View style={{width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', shadowColor: 'gray', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4, shadowRadius: 6}}>
                                            <Image
                                              style={{width: 50, height: 50, borderRadius: 25}}
                                              source={{uri: 'data:image/jpeg;base64,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'}}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex: 3, flexDirection: 'column'}}>
                                        <Text numberOfLines={1} style={{color: 'black'}}>Thales Crisostomo Gonçalves disajdsja</Text>
                                        <Text style={{color: 'gray'}}>Administrador</Text>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'column'}}>
                                        <Text numberOfLines={1} style={{color: 'black'}}>60 Pontos</Text>
                                        <Text numberOfLines={1} style={{color: 'gray'}}>CC: 550</Text>
                                    </View>

                                    <View style={{alignItems: 'center', padding: 5}}>
                                        <View style={{padding: 10, backgroundColor: '#009688', borderRadius: 999}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>  
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