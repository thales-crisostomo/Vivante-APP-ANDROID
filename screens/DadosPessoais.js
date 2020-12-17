import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, FlatList, RefreshControl, Picker} from 'react-native';
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
import { Feather } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNPickerSelect from 'react-native-picker-select';  
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//testes
///var url = 'http://staging.sermaisvivante.com.br/'
//produção
var url = 'http://sermaisvivante.com.br/'

let xhr = new XMLHttpRequest();

const responseC = Dimensions.get('window')
const widthC = responseC.width / 1.1

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 15,
		paddingHorizontal: 15,
		paddingBottom: 15,
        width: widthC,
	},
	inputAndroid: {
		color: 'black',
		paddingTop: 15,
		paddingHorizontal: 15,
		paddingBottom: 15,
        width: widthC,
	},
	placeholderColor: 'black',
	underline: { borderTopWidth: 1 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#000',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
  };

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

export default class DadosPessoais extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      heightLoading: 0,
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
      loading: 'none',
      complemento: '',
      marginMensagemComentario: new Animated.Value(-300),
      marginMensagemComentarioError: new Animated.Value(-300),
      number: '0',
    }
    this.heightSenha = new Animated.Value(300);
  }  

  componentDidMount = async () => {
     this.TamanhoAparelho()
     this.Perfil()
      
     var timer100 = setInterval(async() => {
        this.CEPaddress()
        clearInterval(timer100);
     }, 1000);
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
                
                if(!responseJson.error){
                    genero = responseJson.data.gender
                    
                    var nascimento
                    
                    if(responseJson.address){
                        if(responseJson.address.street){
                            endereco = responseJson.address.street
                        }
                    }
                    else{
                        endereco = 'Sem endereço'
                    }
                    
                    if(responseJson.data.birth_date){
                        ano = responseJson.data.birth_date.split('-')[0]
                        mes = responseJson.data.birth_date.split('-')[1]
                        dia = responseJson.data.birth_date.split('-')[2]
                        nascimento = dia + '-' + mes + '-' + ano
                    }
                    
                    var number = responseJson.address.number
                    if(number){
                        number = number.toString()
                    }
                    
                    this.setState({ 
                        document:  responseJson.data.document,
                        username: responseJson.data.name,
                        photo: responseJson.photo + '?' + new Date(),
                        cep: responseJson.address.zip,
                        bairro: responseJson.address.district,
                        //cidade: responseJson.address.city_name,
                        birthday: nascimento,
                        gender: genero,
                        access: responseJson.username,
                        email: responseJson.email,
                        phone: responseJson.main_phone.number,
                        logradouro: endereco,
                        number: number,
                        complemento: responseJson.address.complement,
                        perfil: responseJson.profile,
                        cpf: responseJson.username,
                        email: responseJson.email,
                        idusuario: responseJson.id,
                        ddd: responseJson.main_phone.ddd,
                        idphone: responseJson.main_phone.id,
                        dataid: responseJson.data.id,
                        enderecoid: responseJson.address.id,
                        phoneid: responseJson.main_phone.id,
                        
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
  
  CEP = () => {
      /*
      fetch('https://viacep.com.br/ws/'+this.state.cep+'/json/unicode/', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    logradouro: responseJson.logradouro,
                    bairro: responseJson.bairro,
                    cidade: responseJson.localidade,
                    estado: responseJson.uf
                })
             })
        .catch(async(error) => {
            console.log(error)
        });
        */
  } 
  
  CEPaddress = async () => {
      var Token = await AsyncStorage.getItem('@Token');
      fetch(url + '/api/v1/address/' + this.state.cep, {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    logradouro: responseJson.logradouro,
                    bairro: responseJson.bairro,
                    cidade: responseJson.app_info.city_name,
                    estado: responseJson.estado_info.nome,
                    cidadeid: responseJson.app_info.city_id,
                })
             })
        .catch(async(error) => {
            console.log(error)
        });
  } 
  
  
  VerificaCep = () => {
      this.CEP()
      this.CEPaddress()
  }
  
  Salvar = async () => {
      var Token = await AsyncStorage.getItem('@Token');
      
      if(!this.state.birthday){
          Alert.alert(
            'Ops!',
            'Nascimento não pode ficar vazio.',
          );
          return ;
      }
      if(!this.state.username){
          Alert.alert(
            'Ops!',
            'Nome não pode ficar vazio.',
          );
          return  ;
      }
      
      
      dia = this.state.birthday.split('-')[0]
      mes = this.state.birthday.split('-')[1]
      ano = this.state.birthday.split('-')[2]
      
      nascimento = ano + '-' + mes + '-' + dia
      
      let formdata = new FormData(); 
     
      formdata.append("participant[email]", this.state.email)
      formdata.append("participant[username]", this.state.cpf)
      formdata.append("participant[photo]", this.state.photo)
      formdata.append("participant[data_attributes][id]", this.state.dataid)
      formdata.append("participant[data_attributes][name]", this.state.username)
      formdata.append("participant[data_attributes][birth_date]", nascimento)
      formdata.append("participant[data_attributes][gender]", this.state.gender)
      
      var number = this.state.number
      if(!number){
          number = 0
      }
      
      var cidadeid = this.state.cidadeid
      if(!cidadeid){
          cidadeid = 0
      }
      
      formdata.append("participant[address_attributes][id]", this.state.enderecoid)
      formdata.append("participant[address_attributes][street]", this.state.logradouro)
      formdata.append("participant[address_attributes][number]", number)
     
      formdata.append("participant[address_attributes][complement]", this.state.complemento)
      formdata.append("participant[address_attributes][city_id]", cidadeid)
      
      formdata.append("participant[address_attributes][zip]", this.state.cep)
      formdata.append("participant[address_attributes][district]", this.state.bairro)
     
      
      formdata.append("participant[main_phone_attributes][id]", this.state.idphone)
      formdata.append("participant[main_phone_attributes][ddd]", this.state.ddd)
      formdata.append("participant[main_phone_attributes][number]", this.state.phone)
  
      this.setState({loading: 'flex', heightLoading: this.state.height})
      
      
      //console.log(formdata)
       
        
      xhr.open('PUT', url + 'api/v1/participants/' + this.state.idusuario);
      xhr.setRequestHeader('Authorization', 'Bearer ' + Token);
        // image from CameraRoll.getPhotos(
      xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            //console.log(xhr.getAllResponseHeaders());
        }
      }
      xhr.send(formdata);
      
      var timer10 = setInterval(async() => {
          Animated.timing(this.state.marginMensagemComentario, {
            duration: 500,
            toValue: 10,
          }).start();
          this.setState({loading: 'none', heightLoading: 0})
         clearInterval(timer10);
      }, 4000);  
      
      var timer4 = setInterval(async() => {
         Animated.timing(this.state.marginMensagemComentario, {
              duration: 500, 
              toValue: -300,
         }).start();
         clearInterval(timer4);
      }, 8000);   

      this.Perfil()
      this.CEPaddress()
      
      /*
      fetch( url + 'api/v1/participants/' + this.state.idusuario , {
         method: 'PUT',
         headers: {
           'Accept': "application/json",
           'Authorization': 'Bearer ' + Token,
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
           'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
           'Accept': 'application/x-www-form-urlencoded',
           'Content-Type':'application/x-www-form-urlencoded'
         },
         body: formdata, 
         }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson)
                this.setState({loading: 'none', heightLoading: 0})
                if(responseJson.error){
                   
                    Animated.timing(this.state.marginMensagemComentarioError, {
                        duration: 500,
                        toValue: 10,
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
          
                if(responseJson.error == "Token Expired"){
                     return navigate('Login')
                }
                if(responseJson.error == "Invalid Token"){
                     return navigate('Login')
                }
          
                Animated.timing(this.state.marginMensagemComentario, {
                    duration: 500,
                    toValue: 10,
                }).start();

                var timer4 = setInterval(async() => {
                   Animated.timing(this.state.marginMensagemComentario, {
                        duration: 500,
                        toValue: -300,
                   }).start();
                   clearInterval(timer4);
                }, 4000);   
                
                this.Perfil()
                this.CEPaddress()
             })
        .catch(async(error) => { 
            this.setState({loading: 'none', heightLoading: 0})
            Animated.timing(this.state.marginMensagemComentarioError, {
                duration: 500,
                toValue: 10,
            }).start();

            var timer4 = setInterval(async() => {
               Animated.timing(this.state.marginMensagemComentarioError, {
                    duration: 500,
                    toValue: -300,
               }).start();
               clearInterval(timer4);
            }, 4000);  
            console.log(error)
        });
        */
        
  } 
  
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
      quality: 0.1,
      base64: true, 
    });

    image = result.base64

    if (!result.cancelled) {
      this.setState({
            photo: 'data:image/jpg;base64,'+ image,
            IndexPerfil: 9999,
            IndexImage: 0,
      });
    }
  };
  
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
                         <TouchableOpacity style={styles.paddingLeft} onPress={() => navigate('Configurações', {date: new Date()})}>
                              <SimpleLineIcons name="arrow-left" size={20} color='white' />   
                         </TouchableOpacity>
                     </View>
                     <View style={styles.name}>
                         <Text style={styles.styleName}>Editar dados</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                 </View>
                 {/*FIM MENU*/}
                 <View style={{backgroundColor: 'white'}}>
                     <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', height: '100%', paddingLeft: 10, paddingRight: 10 }}>
                        <TouchableOpacity activeOpacity={1}>
                            <View>
                                <StatusBar barStyle="light-content" />
                                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                     <View style={{paddingTop: '16%'}}/>
                                     <View style={{justifyContent: 'center', alignItems: 'center', height: this.state.height /4, backgroundColor: 'white', width: this.state.width}}>
                                         <TouchableOpacity style={{width: this.state.width /5, height: this.state.width/ 5, borderRadius: 1000, justifyContent: 'center', alignItems: 'center', elevation: 2}} onPress={() => this.EscolherFoto()}>
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
                            <View style={{padding: 2}}>
                                <View style={{padding: 0, backgroundColor: 'white',  flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none" autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15}} placeholder="Nome" underlineColorAndroid='transparent'  onChangeText={(e) => this.setState({username: e})} value={this.state.username} /> 
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0, backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInputMask
                                        style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: '#bdbdbd'}}
                                        placeholder="CPF" keyboardType="numeric"
                                        underlineColorAndroid='transparent' 
                                        value={this.state.cpf}
                                        editable={false}
                                        onChangeText={(cpf) => this.setState({cpf: cpf})}
                                        type={'custom'}
                                        options={{
                                            mask: '999 999 999 99'
                                        }}
                                    />
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none" editable={false} autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: '#bdbdbd'}} placeholder="Email" underlineColorAndroid='transparent' onChangeText={(email) => this.onChanged(email)} value={this.state.email} /> 
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0, backgroundColor: 'white', flexDirection: 'row', display: 'flex'}}>
                                   <View style={{ backgroundColor: 'white', display: 'flex', flex: 1, elevation: 3, borderRadius: 3}}>
                                       <TextInputMask
                                            style={{width: '100%', padding: this.state.paddingInput, padding: 15}}
                                            placeholder="Telefone" keyboardType="numeric"
                                            underlineColorAndroid='transparent' 
                                            value={this.state.ddd}
                                            onChangeText={(e) => this.setState({ddd: e})}
                                            type={'custom'}
                                            options={{
                                                mask: '99'
                                            }}
                                       />
                                   </View>
                                   <View style={{padding: 5}}/>
                                   <View style={{ backgroundColor: 'white', display: 'flex', elevation: 3, borderRadius: 3, flex: 7}}>
                                       <TextInputMask
                                            style={{ padding: this.state.paddingInput,  padding: 15, width: '100%'}}
                                            placeholder="Telefone" keyboardType="numeric"
                                            underlineColorAndroid='transparent' 
                                            value={this.state.phone}
                                            onChangeText={(e) => this.setState({phone: e})}
                                            type={'custom'}
                                            options={{
                                                mask: '99999-9999'
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInputMask
                                        style={{ padding: this.state.paddingInput,  padding: 15, width: '100%'}}
                                        placeholder="Telefone" keyboardType="numeric"
                                        underlineColorAndroid='transparent' 
                                        value={this.state.birthday}
                                        onChangeText={(e) => this.setState({birthday: e})}
                                        type={'custom'}
                                        options={{
                                            mask: '99-99-9999'
                                        }}
                                    />
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                
                                     <RNPickerSelect
                                        placeholderTextColor="black"
                                        style={pickerStyle}
                                        onValueChange={(value) => this.setState({gender: value})}
                                        value={this.state.gender}
                                        placeholder={{label: 'Sexo', value: 0}}
                                        items={[
                                            { label: 'Masculino', value: 2 },
                                            { label: 'Feminino', value: 1 }
                                        ]}
                                    />
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none" editable={false} autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: '#bdbdbd'}} placeholder="Perfil" underlineColorAndroid='transparent' onChangeText={(e) => his.setState({perfil: e})} value={this.state.perfil} /> 
                                </View>
                                
                                <View style={{padding: '5%'}}/> 

                                <View style={{padding: 5}}/>
                                <View style={{padding: 0, backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInputMask
                                        onBlur={() => this.VerificaCep()}
                                        style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: 'black'}}
                                        placeholder="CEP" keyboardType="numeric"
                                        underlineColorAndroid='transparent' 
                                        value={this.state.cep}
                                        onChangeText={(e) => this.setState({cep: e})}
                                        type={'custom'}
                                        options={{
                                            mask: '99999-999'
                                        }}
                                    />
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0, backgroundColor: 'white', flexDirection: 'row', display: 'flex'}}>
                                   <View style={{ backgroundColor: 'white', display: 'flex', flex: 3, elevation: 3, borderRadius: 3}}>
                                       <TextInput
                                            style={{width: '100%', padding: this.state.paddingInput, padding: 15}}
                                            placeholder="Endereço"
                                            underlineColorAndroid='transparent' 
                                            value={this.state.logradouro}
                                            onChangeText={(e) => this.setState({logradouro: e})}
                                       />
                                   </View>
                                   <View style={{padding: 5}}/>
                                   <View style={{ backgroundColor: 'white', display: 'flex', elevation: 3, borderRadius: 3, flex: 1}}>
                                       <TextInput
                                            style={{ padding: this.state.paddingInput,  padding: 15, width: '100%', color: 'black'}}
                                            placeholder="Número" 
                                            underlineColorAndroid='transparent' 
                                            value={this.state.number}
                                            onChangeText={(e) => this.setState({number: e})}
                                        />
                                    </View>
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none"  autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: 'black'}} placeholder="Bairro" underlineColorAndroid='transparent' onChangeText={(e) => this.setState({bairro: e})} value={this.state.bairro} /> 
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none"  autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: 'black'}} placeholder="Cidade" underlineColorAndroid='transparent' onChangeText={(e) => this.setState({cidade: e})} value={this.state.cidade} /> 
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none"  autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: 'black'}} placeholder="Estado" underlineColorAndroid='transparent' onChangeText={(e) => this.setState({estado: e})} value={this.state.estado} /> 
                                </View>
                                <View style={{padding: 5}}/>
                                <View style={{padding: 0,  backgroundColor: 'white', flexDirection: 'row', elevation: 3, borderRadius: 3}}>
                                   <TextInput autoCapitalize="none" autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%', padding: 15, color: 'black'}} placeholder="Complemento" underlineColorAndroid='transparent' onChangeText={(e) => this.setState({complemento: e})} value={this.state.complemento} /> 
                                </View>
                                <View style={{padding: '8%'}}/>
                                
                                <TouchableOpacity style={{borderRadius: 5, backgroundColor: '#92278f', padding: 15, justifyContent: 'center', alignItems: 'center', elevation: 2}} onPress={this.Salvar}>
                                    <Text style={{color: 'white'}}>Salvar</Text>
                                </TouchableOpacity>

                            </View>
                         </TouchableOpacity>
                        <Animated.View style={{padding: '8%'}}/>
                      </ScrollView>
                      <KeyboardSpacer topSpacing={10} style={{padding: 5}}/>  
                  </View>
              </View>
        </SafeAreaView>
        <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentario, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
            <View style={{width: '100%', padding: 13, backgroundColor: '#009688', borderRadius: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 17, color: 'white'}}>
                     Dados salvos com sucesso!
                </Text>
            </View>
        </Animated.View> 
        <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentarioError, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
            <View style={{width: '100%', padding: 13, backgroundColor: 'tomato', borderRadius: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 17, color: 'white'}}>
                     Houve um erro ao salvar seus dados.
                </Text>
            </View>
        </Animated.View> 
        <View style={{height: this.state.heightLoading, position: 'absolute', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0}}>
            <View style={{display: this.state.loading, padding: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 120, width: 120, borderRadius: 10}}>
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