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

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
//testes
///var url = 'http://staging.sermaisvivante.com.br/'
//produção
var url = 'http://sermaisvivante.com.br/'

var verPedido = false
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


export default class FazPedidos extends React.Component {
    
  constructor() {
    super()
    this.state = {
      loading: 'none',
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      quantidadePremio: 1,
      colorRestantes: 'gray',
      points: '...',
      originalValue: 0,
      loadingheight: 0,
      marginMensagemComentario: new Animated.Value(-300),
      marginMensagemComentarioError: new Animated.Value(-300),
    }
  }  
    
  Pontos = async () => {
      //alert('aqui')
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
                 
                     meus_pontos = responseJson.points
                     
                     var sim = false
                     
                     tem = meus_pontos.includes('.')
                     if(tem == true){
                           meus_pontos = meus_pontos.replace('.','')
                           sim = true
                     }

                     tem = meus_pontos.includes(',')
                     if(tem == true){
                           meus_pontos = meus_pontos.replace(',','')
                           sim = true
                     }

                     if(sim == true){
                           meus_pontos = (parseInt(meus_pontos) / 100).toFixed(0);
                     }
                     
                     pontos = this.props.navigation.state.params.points
                     
                     meus_pontos = parseInt(meus_pontos)
                     pontos = parseInt(pontos)
                     
                     texto  = this.props.navigation.state.params.description  
                     texto = entities.decode(texto)
                     
                     /*
                     texto = texto.toString()
                     texto = texto.replace('\n', '')
                     texto = texto.replace(/<[^>]*>?/gm, '')
                     texto = texto.replace(/\s+/g, ' ')
                     */
                     
                     this.setState({
                        valorTotal: pontos,
                        originalValue: pontos,
                        technical: texto,
                        points: meus_pontos,
                     });

                     if(pontos > meus_pontos){
                         this.setState({
                            Restantes:  'Saldo insuficiente',
                            colorRestantes: 'tomato',
                         });
                     }else{
                         this.setState({
                            colorRestantes: 'gray',
                            Restantes:  'Depois do resgate sobrará: ' + (meus_pontos - pontos) + ' Pontos'
                         });
                     }
                     
                 }
             })
      .catch(async(error) => {
            console.log(error)
      });
      
  }       
  
  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Pontos()
     this.ZeraCarrinho() 
     pontos = this.props.navigation.state.params.points
     pontos = pontos.replace(',','.')
     this.setState({
		loading: 'none',
	 });
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
  
  MaisPremios  = (operacao) => {
       
        meusPontos = this.state.points
        
        total = this.state.quantidadePremio  
        
        if(operacao == 'mais'){
            this.setState({
                quantidadePremio: this.state.quantidadePremio + 1,
            });
            total = this.state.quantidadePremio + 1
        }else{
            if(total > 1){
                this.setState({
                    quantidadePremio: this.state.quantidadePremio - 1,
                });
                total = this.state.quantidadePremio - 1
            }
        }
      
        //SOMA ADICÃO
        if(total >= 1){
            
            valorTotal =  this.state.originalValue * total
            meusPontos =  this.state.points - valorTotal
            color = ''
            if(meusPontos <= 0){
                 restante = 'Saldo insuficiente'
                 color = 'tomato'
            }else{
                restante = 'Depois do resgate sobrará: ' + meusPontos.toFixed(0) + ' Pontos'
                color = 'gray'
            }
            
            this.setState({
                valorTotal: valorTotal.toFixed(0),
                Restantes:  restante,
                colorRestantes: color
            });
        }
  }
 
  FazPedido  = () => {
       restante = this.state.Restantes
       
       if(restante == 'Saldo insuficiente'){
            Alert.alert(
              'Ops!',
              'Você não tem saldo suficiente para fazer essa compra.',
            );
       }else{
           Alert.alert(
              'Comprar',
              'Tem certeza da aquisição deste protudo?',
              [
                {text: 'Sim', onPress: () => this.FinalizarPedido()},
                {text: 'Cancelar', style: 'cancel'},
              ],
              { cancelable: false }
           );
       }
  }
  
  ZeraCarrinho  = async () => {
      
      var Token = await AsyncStorage.getItem('@Token');
      
      var params = {
          "shopping_cart": [
            {
                "product_id": 0,
                "amount": 0
            }
          ]
      }
      
      fetch( url + 'api/v1/shopping_carts', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         body: JSON.stringify(params),
         }).then((response) => response.json())
            .then(async (responseJson) => {
        
                total = responseJson.shopping_cart.length
                var params = {
                    "shopping_cart": [
                        {
                            "product_id": 0,
                            "amount": 0
                        }
                    ]
                }
                
                for(i = 0; i < total; i++){
                    var ids = {
                        product_id: responseJson.shopping_cart[i].product.id,
                        amount: 0
                    }
                    params.shopping_cart.push(ids)
                }
          
                fetch( url + 'api/v1/shopping_carts', {
                     method: 'POST',
                     headers: {
                        Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + Token,
                     },
                     body: JSON.stringify(params),
                     }).then((response) => response.json())
                        .then(async (responseJson) => {
                            //console.log(responseJson)
                        })
                .catch(async(error) => {
                       console.log(error)
                });
            })
      .catch(async(error) => {
           console.log(error)
      });
  }
  
  FinalizarPedido  = async () => {
     
      Alert.alert(
        'Ops!',
        'O resgate está desabilitado no momento.',
      );
      return ;
      
      this.setState({
          loading: 'flex',
          loadingheight: this.state.height
      });               
      
      var Token = await AsyncStorage.getItem('@Token');
      var params = {
          "shopping_cart": [
            {
                "product_id": this.props.navigation.state.params.id,
                "amount": this.state.quantidadePremio
            }
          ]
      }
      
      //params = JSON.stringify(params)
     // console.log(params)
      fetch( url + 'api/v1/shopping_carts', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         body: JSON.stringify(params),
         }).then((response) => response.json())
            .then(async (responseJson) => {
                //console.log(responseJson)
                if(responseJson.message == "Seu carrinho têm mais de 9 unidades, por favor exclua a quantidade excedente para finalizar o pedido"){
                   this.setState({
                        loading: 'none'
                   }); 
                   return ( Alert.alert(
                      'Ops!',
                      'Você só pode comprar no máximo 9 unidades por vez.',
                    ));
                }
          
                return this.Resgata()
                
            })
      .catch(async(error) => {
           this.setState({
                  loading: 'none'
           }); 
           console.log(error)
      });
      
  }
  
  Resgata  = async () => {
       const { navigate } = this.props.navigation;
       const { goBack } = this.props.navigation;
      
       var Token = await AsyncStorage.getItem('@Token');
       
       fetch( url + 'api/v1/shopping_carts/checkout', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                  loading: 'none',
                  loadingheight: 0
                }); 
                //console.log(responseJson)
                if(responseJson.status.address){
                   return ( 
                        Alert.alert(
                          'Você precisa atualizar seu endereço.',
                          'Quer atualizar agora?',
                          [
                            {text: 'Sim', onPress: () => navigate('Configurações', { perfil: true, date: new Date()})},
                            {text: 'Cancelar', style: 'cancel'},
                          ],
                        { cancelable: false }
                        )
                   );
                }
           
                if(responseJson.status.base){
                   
                    Animated.timing(this.state.marginMensagemComentarioError, {
                        duration: 500,
                        toValue: -10,
                     }).start();

                     var timer4 = setInterval(async() => {
                       Animated.timing(this.state.marginMensagemComentarioError, {
                            duration: 500,
                            toValue: -300,
                       }).start();
                       clearInterval(timer4);
                     }, 4000);  
                    
                    return  ;  
                }
            
                Animated.timing(this.state.marginMensagemComentario, {
                    duration: 500,
                    toValue: -10,
                }).start();

                var timer4 = setInterval(async() => {
                   Animated.timing(this.state.marginMensagemComentario, {
                        duration: 500,
                        toValue: -300,
                   }).start();
                    //alert(verPedido)
                   clearInterval(timer4);
                }, 4000);   
           
               //  var timer5 = setInterval(async() => {
                //   clearInterval(timer5);
                  // goBack(null)
                //}, 4600);   
           
            })
            .catch(async(error) => {
            this.setState({
                  loading: 'none'
            }); 
            console.log(error)
       });
  }
  
  
  Pedidos = async () => {
      verPedido = true
      const { navigate } = this.props.navigation;
      navigate('Extrato'); 
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
                     <Text numberOfLines={1} style={styles.styleName}>{this.props.navigation.state.params.name}</Text>
                 </View>
                 <View style={styles.icon1}>
                     <TouchableOpacity style={styles.paddingRight}>
                         <SimpleLineIcons name="menu" size={25} color='white' />   
                     </TouchableOpacity>
                 </View>
              </View>
             {/*FIM MENU*/}
             <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column'}}>
                
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', width: '100%', padding: 10, paddingBottom: '20%'}}>
                    <View style={{paddingTop: '2%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                            <Text>
                                Saldo
                            </Text>
                            <View style={{padding: 5}}/>
                            <Text style={{fontSize: 20, color: '#4db6ac'}}>
                                {this.state.points} Pontos
                            </Text> 
                        </View>
                    </View>

                    <View style={{paddingTop: '4%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                            <Text numberOfLines={1} style={{fontSize: 20, marginTop: -4}}>Prêmio</Text>
                            <View style={{padding: 5}}/>
                            <View style={{flexDirection: 'row',  width: '100%', alignItems: 'center'}}>
                                <View style={{width: this.state.width/6, height:  this.state.width/6, borderadius: this.state.width/12, elevation: 2}}>
                                    <DotIndicator count={3} color='#92278f' size={5} style={{position: 'absolute', marginTop: '33%', marginLeft: '20%'}}/>
                                    <Image
                                       style={{width: this.state.width/6, height:  this.state.width/6, borderRadius: this.state.width/12}}
                                       source={{uri: this.props.navigation.state.params.image}}
                                    />
                                </View>
                                <Text style={{color: 'gray', marginLeft: 10, paddingRight: this.state.width/5}}>{this.props.navigation.state.params.name}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingTop: '4%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                            <Text numberOfLines={1} style={{fontSize: 20}}>Detalhes</Text>
                            <View style={{paddingTop: '4%'}}/>
                            
                            <Text style={{color: 'gray', textAlign: 'left'}}> 
                                {this.state.technical}
                            </Text>
                        
                        </View>
                    </View>

                    <View style={{paddingTop: '4%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                            <Text numberOfLines={1} style={{fontSize: 20}}>Pontos necessários</Text>
                            <View style={{paddingTop: '4%'}}/>
                            <Text style={{color: 'gray', fontSize: 20}}>
                                {this.state.originalValue}
                            </Text>
                        </View>
                    </View>

                    <View style={{paddingTop: '4%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                             <Text numberOfLines={1} style={{fontSize: 20}}>Quantidade</Text>
                             <View style={{paddingTop: '4%'}}/>
                             <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity style={{width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 2}} onPress={() => this.MaisPremios('menos')}>
                                    <AntDesign name="minus" size={17} color='gray' />   
                                </TouchableOpacity>
                                <View style={{padding: 5}}>
                                    <Text style={{color: 'gray', fontSize: 20}}>
                                        {this.state.quantidadePremio}
                                    </Text>
                                </View>
                                <TouchableOpacity style={{width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center',  backgroundColor: 'white', elevation: 2}} onPress={() => this.MaisPremios('mais')}>
                                    <AntDesign name="plus" size={17} color='gray' />   
                                </TouchableOpacity>
                             </View>
                        </View>
                    </View>

                    <View style={{paddingTop: '4%'}}/>

                    <View style={{padding: 0, width: '100%'}}>
                        <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                             <Text numberOfLines={1} style={{fontSize: 20}}>Resumo</Text>
                             <View style={{paddingTop: '4%'}}/>
                             <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                     <Text style={{color: 'gray', fontSize: 20}}>
                                        Total
                                    </Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{color: 'black', fontSize: 20}}>
                                        {this.state.valorTotal} Pontos
                                    </Text>
                                </View>
                             </View>
                        </View>
                     </View>

                     <View style={{paddingTop: '4%'}}/>

                     <View style={{padding: 0, width: '100%'}}>
                         <View style={{backgroundColor: '#fafafa', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 5, flexDirection: 'column'}}>
                             <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                     <Text style={{color: this.state.colorRestantes, fontSize: 15}}>
                                        {this.state.Restantes}
                                    </Text>
                                </View>
                             </View>
                         </View>
                     </View>

                     <View style={{paddingTop: '9%'}}/>

                     <TouchableOpacity style={{borderRadius: 100, backgroundColor: '#92278f', padding: 15, justifyContent: 'center', alignItems: 'center', elevation: 3}} onPress={this.FazPedido}>
                        <Text style={{color: 'white'}}>Fazer Pedido</Text>
                     </TouchableOpacity>

                     <View style={{paddingTop: '15%'}}/>
                </ScrollView>
             </View>
             <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentario, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
                <View style={{width: '100%', padding: 13, backgroundColor: '#009688', borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{fontSize: 17, color: 'white'}}>
                         Seu pedido está sendo processado
                    </Text>
                    <TouchableOpacity style={{padding: 10, textAlign: 'center', backgroundColor: '#4db6ac', marginTop: 10, borderRadius: 100, paddingLeft: 15, paddingRight: 15}} onPress={() => this.Pedidos()}>
                        <Text style={{color: 'white', fontSize: 16}}>Ver Pedido</Text>
                    </TouchableOpacity>
                </View>
             </Animated.View> 
             <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentarioError, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
                <View style={{width: '100%', padding: 13, backgroundColor: 'tomato', borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{fontSize: 17, color: 'white'}}>
                         Houve um erro ao processar seu pedido.
                    </Text>
                </View>
             </Animated.View> 
          </View>
        </SafeAreaView>
        <View style={{height: this.state.loadingheight, position: 'absolute', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: this.state.loading, justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0}}>
            <View style={{padding: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 120, width: 120, borderRadius: 10, display: this.state.loading}}>
                <MaterialIndicator size={60} color='gray' trackWidth={3} />
            </View>
        </View>
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
  }
});