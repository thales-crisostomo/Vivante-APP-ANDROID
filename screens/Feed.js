import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar,  FlatList, RefreshControl, ScrollView, Easing} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import { Linking } from 'react-native';
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

export default class Feed extends React.Component {
    
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      modalComentarios: false,
      widthMenu: 0,
      heightMenu: 0,
      refreshing: false,
      loadingPosts: true,
      color: 'gray', 
      comentario: null,
      margintInputComentario: new Animated.Value(0),
      marginMensagemComentario: new Animated.Value(-100),
      colorLike: 'gray',
      colorLikeComentario: 'gray',
      heightScroll: 999,
      EstaNoUltimo: false,
      buttonSendColor: '#92278f',
      iconSended: 'none',
      iconSend: 'flex',
      iconLoading: 'none',
      iconError: 'none',
      points: '...',
      userName: '...',
      date: new Date()
      //paddingTopComentarios: new Animated.Value(300)
    }
    
  }  
    
  async  componentWillReceiveProps()  {
       this.setState({date: new Date()});
       this.Perfil()
       data = await AsyncStorage.getItem('@UserData')  
  }     
    
  Perfil = async () => {
     
      var Token = await AsyncStorage.getItem('@Token');
      const { navigate } = this.props.navigation;
      
      fetch( url+ 'api/v1/profile', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
      }).then((response) => response.json())
            .then(async (responseJson) => {
                 if(responseJson.photo){
                     this.setState({
                         userImage: responseJson.photo + '?' + new Date(),
                         userName: responseJson.data.name,
                     });
                     var userid = responseJson.id
                     userid = userid.toString()
                     await AsyncStorage.setItem('@Userid', userid);
                     await AsyncStorage.setItem('@UserData', JSON.stringify(responseJson));
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
  
  Pontos = async () => {
     var Token = await AsyncStorage.getItem('@Token');
     const { navigate } = this.props.navigation;
      
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
  
  Feed = async () => {
      const { navigate } = this.props.navigation;
      this.setState({points: '...'})
      this.Pontos()
      
      var Token = await AsyncStorage.getItem('@Token');
      
      fetch( url+ 'api/v1/posts', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({ loadingPosts: false })
                if(!responseJson.error){
                    responseJson = responseJson.map(item => {
                       item.isSelect = false;
                       item.isSelectDisLike = false
                       item.selectedClassDisLike = styles.normal;
                       item.selectedClass = styles.normal;
                       return item;
                    });
                    this.setState({ dataPosts: responseJson})
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
    this.Feed();
    
    this.TamanhoAparelho()
    const { navigate } = this.props.navigation;
    data = await AsyncStorage.getItem('@UserData')  
      
    /*
    image = await AsyncStorage.getItem('@FotoPerfil')  
    // name = await AsyncStorage.getItem('@UserName')  
      
    this.setState({
		userImage: 'data:image/jpg;base64,'+ image,
        //userName: name
    });
    */
    this.Perfil();
    //this.Pontos();
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
 
  MenuOpen = () => {
    this.setState({
        modalVisible: true,
        widthMenu: this.state.width,
        heightMenu: this.state.height,
    });
  };
 MenuClose = () => {
    this.setState({
        modalVisible: false,
    });
 };
 CurtirComentario = () => {
    if(this.state.colorLikeComentario == 'gray'){
        this.setState({
            colorLikeComentario: '#2196f3',
        });
    }else{
        this.setState({
            colorLikeComentario: 'gray',
        });
    }
 };
 AbreComentarios = (id, perfil, texto, nome, image, comentarios) => {
 
      link = entities.decode(texto)
      link = link.replace(/<[^>]*>?/gm, '');
      link = link.split('Caso não consiga visualizar clique aqui:')[1]
      //link = link.replace(' ', '')
      link = link.trim()
      //link = 'https://google.com.br'
     
      texto = entities.decode(texto)
      texto = texto.replace(/<[^>]*>?/gm, '');
      retira = texto.split('Caso não consiga visualizar clique aqui')[1]
      retira = 'Caso não consiga visualizar clique aqui' + retira
      texto = texto.replace(retira, '')
     
      if(image == null || image == '' || image == undefined){
           postagem = [        
                <View key='23kss21312s' style={{width: '100%', padding: 5}}>
                    <TouchableOpacity style={{ width: '100%', borderRadius: 15, elevation: 3, backgroundColor: 'white', padding: 10}}>
                       <View style={{flexDirection: 'row', alignItems: 'center'}}>
                           <View style={{height: 50, width: 50, borderRadius: 25, elevation: 3, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                  style={{height: 35, width: 35, borderRadius: 25}}
                                  source={{ uri: perfil}}
                                />
                           </View>
                           <View style={{padding: 5}}/>
                           <Text style={{color: 'gray'}}>{nome}</Text>
                       </View>
                       <View style={{padding: 5}}/>
                       <Text>{texto}</Text>
                       <Text style={{color: '#42a5f5'}} onPress={() => Linking.openURL(link)}>
                          <Text style={{color: 'gray'}}>Caso não consiga ver: </Text> {link}
                       </Text>
                    </TouchableOpacity>
                </View>
            ]
       }else{
           
           postagem = [        
                <View key='23kss21312s' style={{ width: '100%', padding: 5}}>
                    <TouchableOpacity style={{ width: '100%', borderRadius: 15, elevation: 3, backgroundColor: 'white', padding: 10}}>
                       <View style={{flexDirection: 'row', alignItems: 'center'}}>
                           <View style={{height: 50, width: 50, borderRadius: 25, elevation: 3, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                  resizeMode={ImageResizeMode.center}
                                  style={{height: 35, width: 35}}
                                  source={{ uri: perfil}}
                                />
                           </View>
                           <View style={{padding: 5}}/>
                           <Text style={{color: 'gray'}}>{nome}</Text>
                       </View>
                       <View style={{padding: 5}}/>
                       <Text>{texto}</Text>
                       <Text style={{color: '#42a5f5'}} onPress={() => Linking.openURL(link)}>
                          <Text style={{color: 'gray'}}>Caso não consiga ver: </Text> {link}
                       </Text>
                       <View style={{padding: 5}}/>
                       <View key={'213asd12099213sad'} style={{paddingBottom: 150}}/>
                    </TouchableOpacity>
                    <View style={{ marginTop: -150, justifyContent: 'center', alignItems:'center'}}>
                            <View key={'2132131mxmzzsad'} style={{height: 250, width: '96%', backgroundColor: 'white', borderRadius: 15,            elevation: 3, justifyContent: 'center', alignItems:'center'}}>
                               <DotIndicator count={3} color='#92278f' size={10} style={{position: 'absolute', marginLeft: '33%', marginTop: '22%'}}/>
                               <Image
                                  resizeMode={ImageResizeMode.center}
                                  style={{height: 250, width: '100%', borderRadius: 15}}
                                  source={{ uri: image}}
                               />
                           </View>
                     </View>
                     
                </View>
            ];
       }
        
     ///PEGA OS COMENTARIOS
      
     this.setState({
        modalComentarios: true,
        postagem: postagem,
        dataComentarios: comentarios,
        idPostagem: id
     });  
  };
  FechaComentarios = () => {
     this.Feed()
     this.setState({
        modalComentarios: false,
        colorLikeComentario: 'gray',
     });  
  };
 
  renderItem = ({item, index}) => {    
      
       image = item.attached_image
       perfilPostador = item.campaign.logo.large
       coments = item.post_comments.length
       nomeUsuario = item.author.name
       comentario = item.message
       comentario = comentario.replace(/<[^>]*>?/gm, '');
       comentario = entities.decode(comentario)
      
       texto = comentario.split('Caso não consiga visualizar clique aqui:')[1]
      
       text = 'Caso não consiga visualizar clique aqui:' + texto
       comentario = comentario.replace(text, '')
       
       if(image == null || image == '' || image == undefined){
           conteudo = [
              <View key={'213213sad'}/>
           ];
           espacamento_imagem = [
              <View key={'213213sad13'} style={{paddingBottom: 0}}/>
           ];
           icons_only_text = [
               <View key={'213213123sad'}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                       <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <TouchableOpacity style={{padding: 5}} onPress={() => this.selectItem(item, index, 'like')}>
                                <AntDesign name="like2" size={25} color='gray' style={[styles.normal, item.selectedClass]}/> 
                            </TouchableOpacity>
                       </View>
                       <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => this.AbreComentarios(item.id, perfilPostador, comentario, nomeUsuario, item.attached_image, item.post_comments)}>
                                <Text style={{color: 'gray'}}>{coments}</Text>
                                <View style={{padding: 3}}/>
                                <MaterialIcons name="chat-bubble-outline" size={25} color='gray'/>
                           </TouchableOpacity>
                       </View>
                    </View>
                </View>
            ]
            icons = [ <View key={'213213s2132111ad'}/>]
       }else{
            icons = [
                <View key={'213212312312333sad'}>
                    <View style={{padding: 10}}/>
                    <View style={{padding: 10, alignItems: 'center', flexDirection: 'row'}}>
                       <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <TouchableOpacity style={{padding: 5}} onPress={() => this.selectItem(item, index, 'like')}>
                                <AntDesign name="like2" size={25} color='gray' style={[styles.normal, item.selectedClass]}/> 
                            </TouchableOpacity>
                       </View>
                       <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => this.AbreComentarios(item.id, perfilPostador, item.message, nomeUsuario, item.attached_image, item.post_comments)}>
                                <Text style={{color: 'gray'}}>{coments}</Text>
                                <View style={{padding: 3}}/>
                                <MaterialIcons name="chat-bubble-outline" size={25} color='gray'/>
                           </TouchableOpacity>
                       </View>
                    </View>
                </View>
            ]
            icons_only_text = [ <View key={'213213s123213mmmmmad'}/>]
            conteudo = [
                <TouchableOpacity activeOpacity={1} key={'2132131mxmzzsad'} style={{height: 170, width: '100%'}} onPress={() => this.AbreComentarios(item.id, perfilPostador, item.message, nomeUsuario, item.attached_image, item.post_comments)}>
                   <View style={{elevation: 3, backgroundColor: 'white', borderRadius: 15}}>
                        <DotIndicator count={3} color='#92278f' size={10} style={{position: 'absolute', marginLeft: '33%', marginTop: '22%'}}/>
                        <Image
                        resizeMode={ImageResizeMode.center}
                        style={{height: 250, width: '100%', borderRadius: 15}}
                        source={{ uri: image}}/>
                   </View>
               </TouchableOpacity>
            ];
           
            espacamento_imagem = [
                <View key={'213asd12099213sad'} style={{paddingBottom: 50}}/>
            ];
       }
       return(
        <View style={{paddingTop: '3%', paddingBottom: '3%', padding: 5}}>
            <TouchableWithoutFeedback style={{paddingLeft: 5, paddingRight: 5, paddingTop: 10}} onPress={() => this.AbreComentarios(item.id, perfilPostador, item.message, nomeUsuario, item.attached_image, item.post_comments)}>
               <View>
                <View style={{ width: '100%', borderRadius: 15, elevation: 3, backgroundColor: 'white', padding: 10}} >
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <View style={{height: 50, width: 50, borderRadius: 25, elevation: 3, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                           <Image
                            style={{height: 35, width: 35}}
                            source={{uri: perfilPostador}}/>
                       </View>
                       <View style={{padding: 5}}/>
                       <Text style={{color: 'gray'}}>{nomeUsuario}</Text>
                   </View>
                   <View style={{padding: 5}}/>
                   <Text>{comentario}</Text>
                   <View style={{padding: 5}}/>
                   {conteudo}
                   {icons_only_text}
                </View>
                {espacamento_imagem}
                {icons}
               </View>
            </TouchableWithoutFeedback>
        </View>
     )
 } 
 
 renderItemComentarios = ({item, index}) => {    
       return(
         <View>
            <View style={{paddingLeft: 5, paddingRight: 5, paddingTop: 10, paddingBottom: 10}}>
                <View style={{ width: '100%', borderRadius: 15, elevation: 3, backgroundColor: 'white', padding: 10}}>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <View style={{height: 50, width: 50, borderRadius: 25, elevation: 2, backgroundColor: 'white'}}>
                            <Image
                                  style={{height: 50, width: 50, borderRadius: 25}}
                                  source={{uri: item.author.photo}}
                             />
                       </View>
                       <View style={{padding: 5}}/>
                       <Text style={{color: 'gray'}}>{item.author.name}</Text>
                    </View>
                    <View style={{padding: 5}}/>
                    <Text>{item.message}</Text>
                    <View style={{padding: 5}}/>
                </View>
            </View>
        </View>
     )
 } 
 
 Separador = () => {
    return (
      <View
        style={{
          marginTop: 10,
          backgroundColor: '#fafafa', padding: 4, width: '100%'
        }}
      />
    ); 
  } 
  SeparadorComentarios = () => {
    return (
      <View
        style={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      />
    ); 
  } 
 
 
  selectItem = (Item, index, icon) => {

    Item.isSelect = Item.isSelect;
      
    if(icon == 'like'){
        if(Item.isSelect == true){
            Item.isSelect = false;
            Item.selectedClass = Item.isSelect?
            styles.selected: styles.normal;
        }else{
            Item.isSelect = true;
            Item.selectedClass = Item.isSelect?
            styles.selected: styles.selected;
        }
    }
      
    this.state.dataPosts[index] = Item;
    this.setState({
      dataPosts: this.state.dataPosts,
    });
  };
 
  Sair = async () => {
     const { navigate } = this.props.navigation;
     navigate("Login", { date: new Date()})
     AsyncStorage.setItem('@Token', '');
     this.FechaPerfil()
  } 
  FechaPerfil = async () => {
     this.setState({
         modalVisible: false,
     });
     const { navigate } = this.props.navigation;
  } 
  
  TrocaTela = async (tela) => {
     const { navigate } = this.props.navigation;
     this.FechaPerfil()
     navigate(tela)
  }
  
  RolaScroll = () => {
     var timer = setInterval(async() => {
		  this.listView.scrollToEnd()
	  clearInterval(timer);
	  }, 900);
  };

  FechaTeclado = () => {
     Keyboard.dismiss()
  };
 
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
 
  keyboardWillShow = (e) => {
    const { height, screenX, screenY, width } = e.endCoordinates
    
    Animated.timing(this.state.margintInputComentario, {
         duration: e.duration,
         toValue: height-15,
    }).start();
    
    this.setState({
         heightScroll: this.state.heightScroll + height + 20,
         heightScrollAdded:  height + 40,
    });
    
  }
  keyboardWillHide = (e) => {
    Animated.timing(this.state.margintInputComentario, {
        duration: e.duration -70,
        toValue: 0,
    }).start();
    var timer = setInterval(async() => {
        this.setState({
            heightScroll: (this.state.heightScroll + 20) - this.state.heightScrollAdded,
        });
        clearInterval(timer);
    }, 500); 
  }
  
  TamanhoLista = (w,h) => {
     this.setState({
         heightScroll: h + 700,
     });
  }
  
  Comentar = async () => {
     var Token = await AsyncStorage.getItem('@Token');  
     comentario = this.state.comentario
     comentario = comentario.trim()
  
     if(comentario.length >= 1){
        this.setState({
            iconSend: 'none',
            iconSended: 'none',
            iconLoading: 'flex',
        });
         
        let formdata = new FormData(); 
        formdata.append("comment[message]", this.state.comentario)
        formdata.append("id", this.state.idPostagem)
        
  
        fetch( url + 'api/v1/posts/' + this.state.idPostagem + '/comments', {
         method: 'post',
         headers: {
           'Content-Type': 'multipart/form-data',
           'Authorization': 'Bearer ' + Token,
         },
         body: formdata, 
         }).then((response) => response.json())
            .then(async (responseJson) => {
                if(!responseJson.error){
                    this.setState({
                     buttonSendColor: '#009688',
                     iconSend: 'none',
                     iconLoading: 'none',
                     iconSended: 'flex',
                     comentario: null,
                   });
                    
                   var timer = setInterval(async() => {
                      this.FechaTeclado()
                   clearInterval(timer);
                   }, 1000);
                
                   var timer2 = setInterval(async() => {
                       this.setState({
                         buttonSendColor: 'gray',
                         iconSend: 'flex',
                         iconLoading: 'none',
                         iconSended: 'none',
                       });
                       this.FechaTeclado()
                   clearInterval(timer2);
                   }, 2000);

                   var timer3 = setInterval(async() => {
                       Animated.timing(this.state.marginMensagemComentario, {
                            duration: 500,
                            toValue: 0,
                       }).start();
                   clearInterval(timer3);
                   }, 2500);

                   var timer4 = setInterval(async() => {
                       Animated.timing(this.state.marginMensagemComentario, {
                            duration: 500,
                            toValue: -100,
                       }).start();
                   clearInterval(timer4);
                   }, 5000);    
                }else{
                    this.setState({
                        buttonSendColor: 'tomato',
                        iconSend: 'none',
                        iconLoading: 'none',
                        iconSended: 'none',
                        iconError: 'flex',
                    });
                    
                    var timer5 = setInterval(async() => {
                       this.setState({
                         buttonSendColor: 'gray',
                         iconSend: 'flex',
                         iconLoading: 'none',
                         iconSended: 'none',
                         iconError: 'none'
                       });
                       this.FechaTeclado()
                   clearInterval(timer5);
                   }, 1500);
                }
            })
        .catch(async(error) => {
            console.log(error)
        });
     }
  }
  
  render() {
    const { navigate } = this.props.navigation;
    var _scrollToBottomY    
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
         {/*MODAL COMENTARIOS*/}
         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalComentarios}
              >
              <SafeAreaView style={{flex: 1}}>
                  <Animated.View style={{position: 'absolute', bottom: this.state.margintInputComentario, padding: 10, width: '100%', flexDirection: 'row',  alignItems: 'center', alignSelf:'flex-end', zIndex: 9999999999, backgroundColor: 'white'}}>
                        <View style={{paddingBottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                            <View style={{flex: 4, }}>
                                <TextInput multiline autoCapitalize="none" autoCorrect={false} style={{color: 'gray', padding: 17,  width: '100%', borderRadius: 5, borderWidth: 0.5, borderColor: '#eeeeee'}} placeholder="Fazer um comentário" keyboardType="default" underlineColorAndroid='transparent' onChangeText={(comentario) => this.setState({comentario})} value={this.state.comentario}  placeholderTextColor="#bdbdbd" />   
                            </View>
                            <View style={{padding: 5}}/>
                            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: this.state.buttonSendColor, height: 40}} onPress={()=> this.Comentar()}>
                                <MaterialCommunityIcons name="send" size={25} color='white'  style={{display: this.state.iconSend}}/>  
                                <MaterialCommunityIcons name="check" size={25} color='white' style={{display: this.state.iconSended}}/>
                                <AntDesign name="close" size={25} color='white' style={{display: this.state.iconError}}/>
                                <DotIndicator count={3} color='white' size={10}  style={{display: this.state.iconLoading}}/>
                            </TouchableOpacity>
                        </View>
                  </Animated.View>  
                
                  <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentario, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
                        <View style={{width: '100%', padding: 13, backgroundColor: '#009688', borderRadius: 10, alignItems: 'center'}}>
                            <Text style={{fontSize: 17, color: 'white'}}>
                                Seu comentário está sob análise e ficará disponível em alguns instantes! 
                            </Text>
                        </View>
                  </Animated.View>  
                  
                  <View style={{width: '100%', backgroundColor: 'white',  position: 'absolute', zIndex: 99999999999, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection:'row', padding: 7, borderBottomWidth: 1, borderColor: '#eeeeee', }}>
                        <View style={{flex: 1, height: '100%', backgroundColor: 'white'}}></View>
                        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'white'}}>
                            <Text style={{fontSize: 17, color: 'gray'}}>
                                Comentários
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'white'}}>
                            <TouchableOpacity style={{padding: 10}} onPress={this.FechaComentarios}>
                                <Feather name="chevron-down" size={25} color='gray' />     
                            </TouchableOpacity>
                        </View>
                  </View>    
                  <View>
                  <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        ref="Comentarios" 
                        contentContainerStyle={{height: this.state.heightScroll}} 
                        >
                    <TouchableWithoutFeedback onPress={this.FechaTeclado}>
                        <View>
                            <StatusBar barStyle="dark-content" />
                            <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                                    <View style={{paddingTop: '20%'}}/>
                                    {this.state.postagem}
                                    <View style={{paddingTop: '2%'}}/>
                                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10}}>
                                        <TouchableOpacity style={{padding: 5}}  onPress={this.CurtirComentario}>
                                            <AntDesign name="like2" size={25}  style={{color: this.state.colorLikeComentario}} />  
                                        </TouchableOpacity>    
                                    </View>
                                    <View style={{paddingTop: '7%'}}/>
                                   
                                    <View style={{padding: 2, backgroundColor: '#eeeeee', width: '80%', borderRadius: 100}}/>
                                    <View style={{paddingTop: '5%'}}/>
    
                                    <View style={{width: '100%'}}>
                                        <FlatList showsVerticalScrollIndicator={false} scrollEnabled={true} onContentSizeChange={(w, h) => {
                                            this.TamanhoLista(w,h)
                                         }}
                                            data={this.state.dataComentarios} 
                                            extraData={this.state}
                                            keyExtractor={(x,i) => i.toString()} 
                                            renderItem={this.renderItemComentarios}
                                            ItemSeparatorComponent={this.SeparadorComentarios}
                                            initialNumToRender={2} 
                                            removeClippedSubviews={false}
                                            onScrollBeginDrag={this.Recenter}
                                            onEndReachedThreshold={1}
                                            selected={this.state.selected} >
                                        </FlatList>     
                                    </View>
                                    <View style={{paddingTop: '5%'}}/>
                            </View>
                        </View>
                     </TouchableWithoutFeedback>
                    <Animated.View style={{padding: '8%'}}/>
                  </ScrollView>
                  </View>
              </SafeAreaView>
              
         </Modal>
         {/*FIM MODAL COMENTARIOS*/}
        
         {/*MENU*/}
         <View style={styles.header}>
             <StatusBar backgroundColor='#92278f' barStyle = "light-content" />
             <View style={styles.icon1}>
                 {/*
                 <TouchableOpacity style={styles.paddingLeft} onPress={this.MenuOpen}>
                     <Feather name="menu" size={25} color='white' />   
                 </TouchableOpacity>
                 */}
             </View>
             <View style={styles.name}>
                 <Text style={styles.styleName}>Vivante</Text>
             </View>
             <View style={styles.icon1}>
                 {/*
                 <TouchableOpacity style={styles.paddingRight}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
                */}
             </View>
          </View>
         {/*FIM MENU*/}
         <View style={{flex: 1, backgroundColor: 'white'}}>
             <ScrollView showsVerticalScrollIndicator={false} ref="ListFeed"  scrollEnabled={true}  
                refreshControl={
                  <RefreshControl    
                     refreshing={this.state.loadingPosts}
                     onRefresh={this.Feed.bind(this)}
                     tintColor="#bdbdbd"
                     titleColor="gray"
                  />
               }>
                   <View style={{paddingTop: '2%'}}/>
                   <View style={{ padding: 5, width: '100%'}}>
                       <View style={{elevation: 2, flex: 1,  backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingTop: 5, paddingBottom: 5}}>
                           <View style={{flex: 1, marginLeft: 10}}>
                               <View style={{height: 50, width: 50, borderRadius: 50, elevation: 2, backgroundColor: 'white'}}>
                                    <Image
                                      style={{height: 50, width: 50, borderRadius: 25}}
                                      source={{uri: this.state.userImage}}
                                    />       
                               </View>
                           </View>
                           <View style={{flex: 3}}>
                               <Text numberOfLines={1} style={{marginLeft: '-7%'}}>
                                    {this.state.userName}
                               </Text>
                           </View>
                           <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                               <Text numberOfLines={1} style={{color: '#4db6ac'}}>
                                    {this.state.points}
                               </Text>
                               <Text style={{color: 'gray'}}>Pontos</Text>
                           </View>
                       </View>
                   </View>
                   <FlatList showsVerticalScrollIndicator={false} scrollEnabled={false} nestedScrollEnabled={false}
                      data={this.state.dataPosts} 
                      extraData={this.state}
                      keyExtractor={(x,i) => i.toString()} 
                      renderItem={this.renderItem}
                      ItemSeparatorComponent={this.Separador}
                      initialNumToRender={6} 
                      removeClippedSubviews={false}
                      onScrollBeginDrag={this.Recenter}
                      onEndReachedThreshold={1}
                      selected={this.state.selected}>
                   </FlatList>
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
    height: '7%',
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
    color: 'gray',
  },
  selected: {
    color: '#2196f3',
  },
  selectedDisLike: {
    color: 'tomato',
  }
});