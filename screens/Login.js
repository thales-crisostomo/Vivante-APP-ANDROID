import React from 'react';

import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import MainTabNavigator from './MainTabNavigator';
////import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
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

export default class Login extends React.Component {
    
  constructor() {
    super()
    this.state = {
       TypeInputPassword: true,
       size: 0,
       heightLoading: new Animated.Value(0),
       Loading: new Animated.Value(1),
       KeyboardAppearing: false
    }
    this.keyboardHeight = new Animated.Value(1);
  }     
    
  TamanhoAparelho  = () => {
  	 let response = Dimensions.get('window')
	 
	 width = response.width
    
	 height = response.height
     if(width > 375){
         padding = 10
         tamanhoEntrar = 26
     }else{
         padding = 7
         tamanhoEntrar = 22
     }
    
	 this.setState({
		width: width,
		height: height,
        paddingInput: padding,
        EntrarSize: tamanhoEntrar,
	 });

  }     
    
  componentDidMount = async () => {
     this.TamanhoAparelho()
     cpf = await AsyncStorage.getItem('@UserLogin');
     this.setState({cpf: cpf})
  }
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
    
  keyboardWillShow = (event) => {
      this.setState({
         KeyboardAppearing: true
      });
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }).start();
  };

  keyboardWillHide = (event) => {
      this.setState({
         KeyboardAppearing: false
      });
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 1,
      }).start();
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
    
  onChanged (cpf) {
    this.setState({
        cpf: cpf.replace(/[^0-9]/g, ''),
    });
      
  }

  Perfil = async () => {
        const { navigate } = this.props.navigation;  
        var Token = await AsyncStorage.getItem('@Token');
        fetch( url+ 'api/v1/profile', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         }).then((response) => response.json())
            .then(async (responseJson) => {
                if(responseJson.error){
                    
                }else{
                    var userid = responseJson.id
                    userid = userid.toString()
                    await AsyncStorage.setItem('@UserName', responseJson.data.name);
                    await AsyncStorage.setItem('@Userid', userid);
                }
             })
        .catch(async(error) => {
             console.log(error)
        });  
  }
  
  Login = async () => {
      const { navigate } = this.props.navigation;
      Keyboard.dismiss()
      user = this.state.cpf
      pass = this.state.password
      
      if(user == null || user == '' || pass == null || pass == ''){
           Alert.alert(
              'Eii!',
              'Algum campo está vazio!',
           );
      }else{
          
          this.AnimaLoading()
           
          var Token = await AsyncStorage.getItem('@Token');

          fetch( url + 'api/v1/login', {
             method: 'POST',
             headers: {
                Accept: 'application/json',
               'Content-Type': 'application/json',
               //'Authorization': 'Bearer ' + Token,
             },
             body: JSON.stringify({
               username: user,
               password: pass,
               campaign_id: 35  
             }),
             }).then((response) => response.json())
                .then(async (responseJson) => {
                    if(responseJson.error == 'Invalid Email or Password.'){
                       this.FechaLoading()
                       Alert.alert(
                          'Ops!',
                          'Senha inválida', 
                       );
                    }
                    if(responseJson.token){
                        this.Perfil()
                        AsyncStorage.setItem('@Token', responseJson.token);
                        AsyncStorage.setItem('@UserLogin', this.state.cpf);
                        var timer = setInterval(async() => {
                             navigate('Home')
                        clearInterval(timer);
                        }, 900);
                        var timer2 = setInterval(async() => {
                             this.FechaLoading()
                            clearInterval(timer2);
                        }, 1500);
                      
                    }
              })
          .catch(async(error) => {
               console.log(error)
          });
          
      }
  }
  AnimaLoading = () => {
      const { navigate } = this.props.navigation;
      this.setState({
        size: 30,
      });
      Animated.timing(this.state.heightLoading, {
        duration: 300,
        toValue: this.state.height,
      }).start();
  };
  
  FechaLoading = () => {
   
      Animated.timing(this.state.heightLoading, {
        duration: 300,
        toValue: 0,
      }).start();
     
      
      this.setState({
        size: 0,
      });
	  
  };
    

   Facebook = () => {
      Appearing = this.state.KeyboardAppearing
      if(Appearing == false){
            WebBrowser.openBrowserAsync(
             'https://www.facebook.com/StarsPremium/'
            );
      }else{
            Keyboard.dismiss()
      }
   }
   Twitter = () => {
      Appearing = this.state.KeyboardAppearing
      if(Appearing == false){
            WebBrowser.openBrowserAsync(
             'https://twitter.com/StarsPremium'
            );
      }else{
            Keyboard.dismiss()
      }
   }
   Linkedin = () => {
      Appearing = this.state.KeyboardAppearing
      if(Appearing == false){
            WebBrowser.openBrowserAsync(
             'https://www.linkedin.com/company/starspremium/about/'
            );
      }else{
            Keyboard.dismiss()
      }
   }
   Recuperar = () => {
       const { navigate } = this.props.navigation;
       navigate('Recuperar')
   }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior="padding"
    >
        <Animated.View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(146,39,143, 0.6)', zIndex: 9999999,height: this.state.heightLoading, width: '100%'}}>
            <DotIndicator count={3} color='white' size={this.state.size} />
        </Animated.View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1}}>
            <Image resizeMode="cover" resizeMethod="scale" style={{height: '100%', width: '100%', position: 'absolute'}} source={require('../assets/images/vivante-5.jpg')} />
            <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999}} />
            <View style={{zIndex: 9999, flex: 1}}>
                
                <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}> 
                    <Image style={{height: 160, width: 160, marginTop: '10%'}} source={require('../assets/images/vivante_novo_2.png')} />
                </View>
               
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, paddingLeft: '10%', paddingRight: '10%'}}> 
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 50, paddingLeft: '7%', shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 5}}>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <FontAwesome name="user-o" size={20} color="black" />
                            </View>
                            <View style={{width: '100%', }}>
                                <TextInput autoCapitalize="none" autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%'}} placeholder="Usuário" keyboardType="numeric" underlineColorAndroid='transparent' onChangeText={(cpf) => this.onChanged(cpf)} value={this.state.cpf} /> 
                            </View>
                        </View>
                        <View style={{padding: 4}}/>
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 50, backgroundColor: 'white', paddingLeft: '7%', shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 5}}>
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.ChangeInputType}>
                                <MaterialCommunityIcons name="eye-off-outline" size={20} color="black" />
                            </TouchableOpacity>
                            <View style={{width: '100%'}}>
                                <TextInput autoCapitalize="none" autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%'}} placeholder="Senha"  secureTextEntry={this.state.TypeInputPassword} underlineColorAndroid='transparent' onChangeText={(password) => this.setState({password})} value={this.state.password} /> 
                            </View>
                        </View>
                         <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', paddingTop: '5%'}}>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 50}} onPress={this.Login} > 
                                 <Text style={{fontSize: this.state.EntrarSize, color: 'white'}}>Entrar</Text>
                                 <View style={{paddingLeft: '8%'}}/>
                                 <View style={{paddingLeft: 20,paddingRight: 20, backgroundColor: '#92278f', borderRadius: 100, marginTop: 6, paddingTop: 10, paddingBottom: 10, shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 10}}>
                                    <SimpleLineIcons name="arrow-right" style={{fontSize: 20}} color="white" />
                                 </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
               
                <View style={{flex: 0.5}}/>
                 {/*
                <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', opacity: this.keyboardHeight}}>
                   
                    <TouchableOpacity style={{height: 60, width: 60, borderRadius: 60, backgroundColor: '#292b33', justifyContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 10}} onPress={this.Facebook}>
                        <MaterialCommunityIcons name="facebook" size={20} color="white" />
                    </TouchableOpacity>
                    <View style={{padding: 10}}/>
                    <TouchableOpacity style={{height: 60, width: 60, borderRadius: 60, backgroundColor: '#292b33', justifyContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 10}} onPress={this.Twitter}>
                        <MaterialCommunityIcons name="twitter" size={20} color="white" />
                    </TouchableOpacity>
                    <View style={{padding: 10}}/>
                    <TouchableOpacity style={{height: 60, width: 60, borderRadius: 60, backgroundColor: '#292b33', justifyContent: 'center', alignItems: 'center', shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 10}} onPress={this.Linkedin}>
                        <MaterialCommunityIcons name="linkedin" size={20} color="white" />
                    </TouchableOpacity>
                   
                </Animated.View>
                 */}
              
            </View>
         </View>
     </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});