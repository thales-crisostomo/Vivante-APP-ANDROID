import React from 'react';
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


export default class Configuracoes extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      width: 0,
      height: 0,
      IndexPerfil: 0,
      IndexImage: 0,
      base64Perfil: null,
      Ajuda: false,
      Versao: false,
      Senha: false,
      Perfil: false,
      TypeInputPassword: true,
      KeyboardAppearing: false,
      password: null,
      date: new Date(),
    }
    this.heightSenha = new Animated.Value(300);
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.DadosPerfil()
     this.Pontos()
     this.setState({
		equipe: 'none',
	 });
     /*
     const { navigate } = this.props.navigation;
     console.log(this.props.navigation.state.params.perfil)
     if(this.props.navigation.state.params.perfil){
         this.setState({
            Perfil: true,
         });
     }
     */
  }
 
  async  componentWillReceiveProps()  {
       this.componentDidMount()
       this.setState({date: new Date()});
  } 

  
  TamanhoAparelho  = () => {
  	 let response = Dimensions.get('window')
	 
	 width = response.width
	 height = response.height

	 this.setState({
		width: width,
		height: height,
        heightSenha: height / 2,
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
  
  DadosPerfil = async () => {
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
                if(!responseJson.error){
                    genero = responseJson.data.gender
                    if(genero == 1){
                        genero = 'Feminino'
                    }else{
                        genero = 'Masculino'
                    }
                    nascimento = responseJson.data.birth_date
                    if(nascimento){
                        nascimento = responseJson.data.birth_date
                        nascimento = nascimento.split('-')
                        nascimento = nascimento[2] + '/' + nascimento[1] +'/'+ nascimento[0]
                    }else{
                        nascimento = 'Sem nascimento'
                    }
                    
                    if(responseJson.address){
                        if(responseJson.address.street){
                            endereco = responseJson.address.street
                        }
                    }
                    else{
                        endereco = 'Sem endereço'
                    }
                    
                    this.setState({ 
                        username: responseJson.data.name,
                        photo: responseJson.photo + '?' + new Date(),
                        birthday: nascimento,
                        gender: genero,
                        access: responseJson.username,
                        email: responseJson.email,
                        phone: responseJson.main_phone.number,
                        address: endereco,
                        userPerfil: responseJson.profile
                    })
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
  
  
   
  componentWillMount = async () => {
      /*
      base64 = await AsyncStorage.getItem('@FotoPerfil')
      
      if(base64 == null || base64 == ''){
         this.setState({
            IndexImage: 99999,
         });
      }else{
         this.setState({
            base64Perfil: 'data:image/jpg;base64,'+ base64 ,
            IndexPerfil: 99999,
         });
      }
      */
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }
 
  ComponentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
    
  keyboardWillShow = (e) => {
    const { height, screenX, screenY, width } = e.endCoordinates
   
    Animated.timing(this.heightSenha, {
        duration: e.duration,
        toValue: (this.state.height / 2.5) + height,
    }).start();

  }
  
  keyboardWillHide = (e) => {
    Animated.timing(this.heightSenha, {
        duration: e.duration,
        toValue: this.state.height /3,
    }).start();
  }
  
  Senha1 = async () => {
    
     if(this.state.password == null || this.state.password == '' || this.state.password == undefined){
        
     }else{
        Alert.alert(
          'Ops!',
          'Já já terminaremos essa parte.',
        );
     }  
  }
  
  
  Sair = async () => {
     const { navigate } = this.props.navigation;
     navigate("Login", { date: new Date()})
     await AsyncStorage.setItem('@Token', '');
  } 
  
  ///PEGAR PERMISSÃO PARA ACESSO A GALERIA 
  
  EscolherFoto = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Verifique se a autorizacão foi permitida e tente novamente.');
      }else{
          this._pickImage()
      }
  }
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, 
    });

    image = result.base64

    if (!result.cancelled) {
      //this.setState({ FotoPerfil: 'uri: data:image/jpg;base64,'+ image });
      //await AsyncStorage.setItem('@FotoPerfil', image)  
      this.setState({
            base64Perfil: 'data:image/jpg;base64,'+ image ,
            IndexPerfil: 9999,
            IndexImage: 0,
      });
    }
  };
  
  ChangeInputType = () => {
    
    if(this.state.TypeInputPassword != true){
        this.setState({
            TypeInputPassword: true
        });
    }else{
       this.setState({
            TypeInputPassword: false
       }); 
    }
  }
  
  FecharPerfil = () => {
    
       this.setState({
            Perfil: false
       }); 
  }
  
  DadosPessoais = () => {
      const { navigate } = this.props.navigation;
      this.setState({Perfil: false})
	  var timer = setInterval(async() => {
           navigate('DadosPessoais');
           clearInterval(timer);
      }, 600);
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
                 <Text style={styles.styleName}>Configurações</Text>
             </View>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingRight}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
             </View>
          </View>
         {/*FIM MENU*/}
         {/*INICIO MODAL AJUDA*/}
          <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.Ajuda}
          >
              <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity activeOpacity={1} style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}} onPress={() => this.setState({ Ajuda: false})}>
                  <SafeAreaView style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                     <View style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 15, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 23, textAlign: 'center', paddingTop: '5%'}}>
                                Em caso de dúvidas ou reclamações{'\n'}{'\n'} 
                            </Text>
                            
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10}}>
                                <Feather name="mail" size={25} color='black' />   
                                <Text  style={{fontSize: 18, marginLeft: 5, color: 'gray'}}>
                                    suporte@starspremium.com.br
                                </Text>
                            </View>
        
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10}}>
                                <MaterialCommunityIcons name="whatsapp" size={25} color='black' />   
                                <Text  style={{fontSize: 18, marginLeft: 5, color: 'gray'}}>
                                    (11) 97011-8272
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{paddingBottom: '10%'}}/>
                     </View>
                  </SafeAreaView>
               </TouchableOpacity>
             </View>
         </Modal>
         {/*FIM MODAL AJUDA*/}
         {/*INICIO MODAL VERSÃO*/}
         <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.Versao}
          
          >
              <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity activeOpacity={1} style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}} onPress={() => this.setState({ Versao: false})}>
                  <SafeAreaView style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                     <View style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 15, justifyContent: 'center'}}>
                            <Image
                               style={{width: 210, height:  80, paddingTop: '5%'}}
                               source={require('../assets/images/logo-vivante.png')}
                            />
                            
                            <Text style={{color: 'gray', fontSize: 23, textAlign: 'center', paddingTop: '5%'}}>
                                Versão do aplicativo{'\n'}{'\n'} 
                                <Text  style={{fontSize: 20}}>
                                    1.0.0
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <View style={{paddingBottom: '10%'}}/>
                     </View>
                  </SafeAreaView>
               </TouchableOpacity>
             </View>
         </Modal>
         {/*FIM MODAL VERSÃO*/}
         {/*INICIO MODAL SENHA*/}
         <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.Senha}
         
          >
              <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity activeOpacity={1} style ={{flex:1, alignItems: 'center', justifyContent: 'flex-end', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}} onPress={() => this.setState({ Senha: false})}>
                  <SafeAreaView style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                     <View style={{backgroundColor: 'white', width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <TouchableOpacity activeOpacity={1}>
                            <Animated.View  style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 15, height: this.heightSenha}}>
                                    <View style={{paddingTop: '5%', flexDirection: 'column', alignItems: 'center'}}>
                                        <Text  style={{fontSize: 20}}>
                                            Mudar senha 
                                        </Text>
                                        <View style={{paddingBottom: '4%'}}/>
                                        <Text style={{fontSize: 18, color: 'gray'}}>
                                            Digite sua senha atual
                                        </Text>
                                    </View>

                                    <View style={{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextInput returnKeyType='done' returnKeyLabel='Done' autoCapitalize="none" autoCorrect={false} style={{shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 6, backgroundColor: 'white', color: 'gray', padding: 15,  width: '100%', borderRadius: 5, borderWidth: 0.5, borderColor: '#eeeeee'}} placeholder="Senha atual" secureTextEntry={this.state.TypeInputPassword} underlineColorAndroid='transparent' onChangeText={(password) => this.setState({password})} value={this.state.password} placeholderTextColor="#bdbdbd" onSubmitEditing={this.Senha1}  /> 
                                    </View>
                            </Animated.View>
                        </TouchableOpacity>
                     </View>
                  </SafeAreaView>
               </TouchableOpacity>
             </View>
         </Modal>
         {/*FIM MODAL SENHA*/}
         {/*MODAL PERFIL*/}
         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.Perfil}
              >
              <SafeAreaView style={{flex: 1}}>
                  <View style={{height: '5%', backgroundColor: 'white', position: 'absolute', zIndex: 99999999999, width: '100%'}}/>
                  <View style={{top: '5%', width: '100%', backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 5}, shadowOpacity: 0.1, shadowRadius: 0,  position: 'absolute', zIndex: 99999999999, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection:'row', height: '7%'}}>
                        <View style={{flex: 1, height: '100%'}}></View>
                        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <Text style={{fontSize: 18, color: 'gray'}}>
                                Informações Pessoais
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <TouchableOpacity style={{padding: 10}} onPress={this.FecharPerfil}>
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
                                     <TouchableOpacity style={{width: this.state.width /5, height: this.state.width/ 5, borderRadius: this.state.width/5, justifyContent: 'center', alignItems: 'center', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5}} onPress={() => this.DadosPessoais()}>
                                         <DotIndicator count={3} color='#92278f' size={5} style={{position: 'absolute'}}/>
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
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, borderTopWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.username}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />              
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.birthday}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />      
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.gender}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />          
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.email}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />     
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.phone}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />  
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}}  onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>Foto</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />          
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.address}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />      
                            </View>
                        </TouchableOpacity>
                        {/*
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={()=> this.setState({ Perfil: false, Senha: true})}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>Senha</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />          
                            </View>
                        </TouchableOpacity>
                        */}
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.DadosPessoais()}>
                             <View style={{flex: 3, justifyContent: 'center'}}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.access}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />  
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} >
                            <View style={{flex: 3, justifyContent: 'center'}} onPress={() => this.DadosPessoais()}>
                                 <Text numberOfLines={1} style={{color: 'gray', fontSize: 17}}>{this.state.userPerfil}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                 <Feather name="chevron-right" size={25} color='#92278f' />  
                            </View>
                        </TouchableOpacity>
                     </TouchableOpacity>
                    <Animated.View style={{padding: '8%'}}/>
                  </ScrollView>
              </SafeAreaView>
              
         </Modal>
         {/*FIM MODAL PERFIL*/}
        
         <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', alignItems: 'center', flexDirection: 'column'}}>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', height: this.state.height / 3, backgroundColor: 'white', width: this.state.width}}>
                     {/*FIM MODAL PERFIL
                    <View style={{backgroundColor: '#f5f5f5', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 3, position: 'absolute', right: 10, top: 10, width: 60, height: 60, borderRadius: 60,  borderRadius: 1000, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <Text style={{ color: '#009688'}}>500</Text>
                        <Text style={{fontSize: 7, color: 'gray'}}>Pontos</Text>
                    </View>
                    */}
                    <TouchableOpacity style={{backgroundColor: 'white', width: this.state.width /5, height: this.state.width/ 5, borderRadius: this.state.width/5, justifyContent: 'center', alignItems: 'center', shadowColor: 'gray', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5}} onPress={() => this.DadosPessoais()}>
                        <DotIndicator count={3} color='#92278f' size={5} style={{position: 'absolute'}}/>
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
                    <View style={{paddingTop: '1%'}}/>
                    <Text style={{color: '#80cbc4', fontSize: 17}}>{this.state.points} Pontos</Text>
                </View>            
                
                <View style={{flex: 1, height: '100%', backgroundColor: 'white'}}>
                           
                    <View style={{padding: 15, backgroundColor: '#f5f5f5'}}>
                        <Text style={{color: '#bdbdbd'}}>Geral</Text>
                    </View>

                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Home')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Home</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="home" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Rank')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Ranking</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <SimpleLineIcons name="trophy" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Premios')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Prêmios</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="gift" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Notificações')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Notificações</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="notification" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Regulamento')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Regulamento</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="form" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{display: this.state.equipe, padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Equipe')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Minha Equipe</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <MaterialCommunityIcons name="account-group-outline" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('FaleConosco')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Fale Conosco</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <MaterialIcons name="chat-bubble-outline" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Extrato')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Extrato</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="filetext1" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Pedidos')}>
                            <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Meus Pedidos</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="inbox" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white',borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => navigate('Favoritos')}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Lista de Desejos</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="hearto" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    
                    <View style={{padding: 15, backgroundColor: '#f5f5f5'}}>
                        <Text style={{color: '#bdbdbd'}}>Sua conta</Text>
                    </View>
                    {/*
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.setState({ Senha: true})}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Segurança</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="lock" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.setState({ Perfil: true})}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Informações Pessoais</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <AntDesign name="user" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
               

                    <View style={{padding: 15, backgroundColor: '#f5f5f5'}}>
                        <Text style={{color: '#bdbdbd'}}>Sobre</Text>
                    </View>
    
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.setState({Ajuda: true})}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Ajuda</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <FontAwesome name="handshake-o" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}} onPress={() => this.setState({ Versao: true})}>
                         <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Informações do App</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <Feather name="smartphone" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5, backgroundColor: 'white', borderColor: '#e0e0e0', flexDirection: 'row'}}>
                        <View style={{flex: 3, justifyContent: 'center'}}>
                             <Text style={{color: 'gray', fontSize: 17}}>Qualificar na App Store</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <FontAwesome5 name="app-store" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 15, backgroundColor: 'white', flexDirection: 'row'}} onPress={this.Sair}>
                         <View style={{flex: 3, justifyContent: 'center'}}>
                              <Text style={{color: 'gray', fontSize: 17}}>Sair</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                             <MaterialCommunityIcons name="exit-run" size={25} color='#92278f' />          
                        </View>
                    </TouchableOpacity>
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
      fontSize: 18,
  }
});