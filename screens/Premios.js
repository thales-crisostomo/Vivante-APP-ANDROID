import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, FlatList, RefreshControl, Easing} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

//const PercentageCircle

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

export default class Premios extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      Filtro: false,
      points: '...',
      conteudo: 'none',
      loadingGeral: 'flex',
      loadingFiltro: 'none',
      loadingPremios: false,
      page: 1,
      loadingMore: 'none',
      pageFiltro: 1,
    }
  }  
    
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {  
     return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50; 
  }    
    
  Pontos = async () => {
      const { navigate } = this.props.navigation;
      this.setState({points: '...'})
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
                 if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                 }
                 if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                 }
             })
      .catch(async(error) => {
            console.log(error)
      });
      
  }      
  
  Premios = async () => {
      const { navigate } = this.props.navigation;
      this.Pontos()
      this.setState({ loadingPremios: true })
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/awards?page=0&per_page=12', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({ loadingPremios: false })
                if(!responseJson.error){
                    responseJson = responseJson.awards.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                    });
                    this.setState({ dataPremios: responseJson, conteudo: 'flex', loadingGeral: 'none', loadingFiltro: 'none'})
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }   
  
  
  LoadingMoreFiltro = async () => {
       const { navigate } = this.props.navigation;
       pageFiltro = this.state.pageFiltro + 1
       id = this.state.idFiltro

       var Token = await AsyncStorage.getItem('@Token');
              
       fetch( url + 'api/v1/awards/categories/'+id+'?page='+pageFiltro+'&per_page=12', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({ loadingMore: 'none', pageFiltro: pageFiltro })
           
                if(!responseJson.error){
                    responseJson = responseJson.awards.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                    });
            
                    this.setState({ dataPremios: [...this.state.dataPremios, ...responseJson]})
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
         .catch(async(error) => {
            console.log(error)
         });
      
  }
  
  LoadingMore = async () => {
    const { navigate } = this.props.navigation;
    if (this.state.loadingMore == 'flex') { return; }
     
       if(this.state.fazerFiltro == true) {
           this.setState({ loadingMore: 'flex' });
           return this.LoadingMoreFiltro();
       }
      
       this.setState({ loadingMore: 'flex' });
        
       page = this.state.page + 1
       
       var Token = await AsyncStorage.getItem('@Token');
      
       fetch( url + 'api/v1/awards?page='+page+'&per_page=12', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({ loadingMore: 'none', page: page })
           
                if(!responseJson.error){
                    responseJson = responseJson.awards.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                    });
            
                    this.setState({ dataPremios: [...this.state.dataPremios, ...responseJson]})
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
         .catch(async(error) => {
            console.log(error)
         });
  }   
      
  Favoritar = async (id) => {
      const { navigate } = this.props.navigation;
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/awards/'+id+'/favorites', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         body: JSON.stringify({
           id: id,
         }),
         }).then((response) => response.json())
            .then(async (responseJson) => {
                //console.log(responseJson)
                if(!responseJson.error){
                    
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }   
  
  Categorias = async () => {
      const { navigate } = this.props.navigation;
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/awards/categories', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                //console.log(responseJson)
                if(!responseJson.error){
                    
                     this.setState({ dataCategories: responseJson })
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }   
    
  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Pontos()
     this.Premios()
     this.Categorias()
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
  
  SeparadorCategories = () => {
    return (
      <View
        style={{
          padding: 2,
        }}
      />
    ); 
  } 
  
  selectItem = (Item, index, icon) => {

    Item.isSelect = Item.isSelect;
      
    if(icon == 'favorite'){
        if(Item.isSelect == true){
            Item.isSelect = false;
            Item.selectedClass = Item.isSelect?
            styles.selected: styles.normal;
            Item.icon = 'hearto'
        }else{
            Item.isSelect = true;
            Item.selectedClass = Item.isSelect?
            styles.selected: styles.selected;
            Item.icon = 'heart'
        }
    }
      
    this.Favoritar(Item.id)
      
    this.state.dataPremios[index] = Item;
    this.setState({
      dataPremios: this.state.dataPremios,
    });
  };
 
  FazPedido = (image, points, name, description, id) => {
     const { navigate } = this.props.navigation;
     pontos = points
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
     navigate('FazPedido', { image: image, points: pontos, name: name, id: id, description: description})
  }
  
  Filtro = async (id) => {
      this.setState({
         loadingFiltro: 'flex',
         dataPremios: '',
         fazerFiltro: true,
         idFiltro: id,
         page: 1
      });
      const { navigate } = this.props.navigation;
      var Token = await AsyncStorage.getItem('@Token');
      fetch( url+ 'api/v1/awards/categories/'+id, {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                //console.log(responseJson)
                if(!responseJson.error){
                    responseJson = responseJson.awards.map(item => {
                       item.isSelectFavorite = false;
                       item.isSelectDisFavorite = false
                       item.icon = 'hearto'
                       item.selectedClassFavorite = styles.normal;                  
                       item.selectedClass = styles.normal;
                       return item;
                    });
                    this.setState({ dataPremios: responseJson, loadingFiltro: 'none'})
                }
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
             })
        .catch(async(error) => {
            console.log(error)
        });
  }
 
  Todos = () => {
    this.setState({
      fazerFiltro: false,
      dataPremios: '',
      loadingFiltro: 'flex',
      idFiltro: '',
      pageFiltro: 1
    });
    this.Premios()
  }
  
  
  renderItem = ({item, index}) => {    
       
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
      
       //radius={69} borderWidth={5} percent={porcentagem} color="#92278f" 
      
       return(
        <View style={{padding: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={1} style={{width: this.state.width/2 - 10, justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 3, paddingTop: 25, paddingBottom: 25}} onPress={() => this.FazPedido(item.photo, item.price, item.name, item.description, item.id)}>
                     <TouchableOpacity style={{position: 'absolute', right: 1, top: 1, padding: 5, justifyContent: 'center', alignItems: 'center', elevation: 3}} onPress={() => this.selectItem(item, index, 'favorite')}>
                            <AntDesign name={item.icon} size={25}  style={[styles.normal, item.selectedClass]}/>   
                     </TouchableOpacity>
                     <View style={{borderWidth: 4, borderRadius: 1000, borderColor: '#92278f'}}>
                         <View style={{justifyContent: 'center', alignItems: 'center', width: this.state.width/3, height:  this.state.width/3, borderRadius: this.state.width/3, backgroundColor: 'white', elevation: 2}}>
                            <DotIndicator count={3} color='#92278f' size={8} style={{position: 'absolute'}}/>
                            <Image
                              resizeMode="center"
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
     )
 } 
 
 renderItemCategories = ({item, index}) => {    
       
       return(
        <View>
            <TouchableOpacity style={{padding: 3}} onPress={() => this.Filtro(item.id)}>
                <View style={{padding: 10, backgroundColor: '#fafafa', borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'gray'}}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
     )
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
                 <Text style={styles.styleName}>Prêmios</Text>
             </View>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingRight}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
             </View>
          </View>
          
          {/*INICIO MODAL VERSÃO*/}
          <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.Filtro}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
              <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity activeOpacity={1} style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}} onPress={() => this.setState({ Filtro: false})}>
                  <SafeAreaView style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                     <View style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 15, justifyContent: 'center'}}>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: '5%'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                            </View>
                            <View style={{padding: '2%'}}/>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                            </View>
                            <View style={{padding: '2%'}}/>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                                    <View style={{height: this.state.width/5, width: this.state.width/5, borderRadius: this.state.width/5, backgroundColor: 'pink'}}>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingBottom: '10%'}}/>
                     </View>
                  </SafeAreaView>
               </TouchableOpacity>
             </View>
          </Modal>
          {/*FIM MODAL VERSÃO*/}
        
          {/*FIM MENU*/}
          <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', alignItems: 'center', flexDirection: 'column'}}>
             <ScrollView  showsVerticalScrollIndicator={false}  
                onScroll={({ nativeEvent }) => {
                  if (this.isCloseToBottom(nativeEvent) && this.state.page) {                
                       this.LoadingMore()}}}
                refreshControl={
                  <RefreshControl    
                     refreshing={this.state.loadingPremios}
                     onRefresh={this.Premios.bind(this)}
                     tintColor="#bdbdbd"
                     titleColor="gray"
                  />
               }>
                   <View style={{paddingTop: '2%'}}/>
                    
                   <View style={{display: this.state.loadingGeral, height: this.state.height/1.3, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                       <MaterialIndicator size={60} color='#92278f' trackWidth={3} />
                   </View>

                   <View style={{display: this.state.conteudo}}>
                       
                       <View style={{padding: 5, width: '100%'}}>
                            <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10, flexDirection: 'column'}}>
                                <Text>
                                    Saldo
                                </Text>
                                <View style={{padding: 5}}/>
                                <Text style={{fontSize: 20, color: '#4db6ac'}}>
                                    {this.state.points} Pontos
                                </Text> 
                            </View>
                       </View>
                       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEnabled={true}>
                           <TouchableOpacity style={{padding: 3}} onPress={() => this.Todos()}>
                                <View style={{padding: 10, backgroundColor: '#fafafa', borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: 'gray'}}>
                                        Todos
                                    </Text>
                                </View>
                           </TouchableOpacity>
                           <FlatList showsHorizontalScrollIndicator={false} scrollEnabled={false} nestedScrollEnabled={false} horizontal={true}
                                  data={this.state.dataCategories} 
                                  extraData={this.state}
                                  keyExtractor={(x,i) => i.toString()} 
                                  renderItem={this.renderItemCategories}
                                  ItemSeparatorComponent={this.SeparadorCategories}
                                  initialNumToRender={6} 
                                  removeClippedSubviews={false}
                                  onScrollBeginDrag={this.Recenter}
                                  onEndReachedThreshold={1}
                            >
                           </FlatList>
                       </ScrollView>
                       <FlatList showsVerticalScrollIndicator={false} scrollEnabled={true} 
                              numColumns={2}
                              data={this.state.dataPremios} 
                              extraData={this.state}
                              keyExtractor={(x,i) => i.toString()} 
                              renderItem={this.renderItem}
                              ItemSeparatorComponent={this.Separador}
                              initialNumToRender={8} 
                              removeClippedSubviews={false}
                              onScrollBeginDrag={this.Recenter}
                              selected={this.state.selected}>
                       </FlatList>
                       <View style={{paddingTop: '3%'}}/>
                       <View style={{height: 60, width: '100%', justfyContent: 'center', alignItems: 'center'}}>
                            <DotIndicator count={3} color='#92278f' size={15} style={{padding: 20, display: this.state.loadingMore}}/>
                       </View>
                       <View style={{paddingTop: '3%'}}/>
                       <View style={{jsutifyContent: 'center', alignItems: 'center', display: this.state.loadingFiltro, height: this.state.height/3, width: '100%'}}>
                             <MaterialIndicator size={60} color='#92278f' trackWidth={3} />
                       </View>
                   </View>
             </ScrollView>
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