import React, {Fragment} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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

export default class FaleConosco extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      heightLoading: 0,
      imagemEscolhida: 'Anexar Imagem',
      loading: 'none',
      marginMensagemComentario: new Animated.Value(-300),
      marginMensagemErro: new Animated.Value(-300),
      width: 0
    }
  }  

  componentDidMount = async () => {
      this.TamanhoAparelho()
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

  Enviar = async () => {
     
      var Token = await AsyncStorage.getItem('@Token');
        
      if(this.state.comentario == null || this.state.comentario == undefined || this.state.comentario == '' ){
          return (
            Alert.alert(
              'Ops!',
              'O campo mensagem está vazio', 
            )
          )
      }
      /*
      if(this.state.assunto == null || this.state.assunto == undefined || this.state.assunto == '' ){
          return (
            Alert.alert(
              'Ops!',
              'O campo assunto está vazio', 
            )
          )
      }
      */
      this.setState({
		loading: 'flex',
        heightLoading: this.state.height
	  });
      var params = {
          "issue": [
            {
                "attachment": this.state.image,
                "message": this.state.comentario,
                "subject": 5,
                "priority": 3,
            }
          ]
      }
      
      fetch( url + 'api/v1/issues', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
         body: JSON.stringify(params),
         }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({loading: 'none', heightLoading: 0});
                console.log(responseJson)
                if(!responseJson.error){
                    Animated.timing(this.state.marginMensagemComentario, {
                        duration: 500,
                        toValue: -10,
                    }).start();
                    var timer1 = setInterval(async() => {
                       Animated.timing(this.state.marginMensagemComentario, {
                            duration: 500,
                            toValue: -300,
                       }).start();
                       clearInterval(timer1);
                    }, 4000);   
                    this.setState({comentario: '', assunto: ''});
                }else{
                    Animated.timing(this.state.marginMensagemErro, {
                        duration: 500,
                        toValue: -10,
                    }).start();
                    var timer2 = setInterval(async() => {
                       Animated.timing(this.state.marginMensagemErro, {
                            duration: 500,
                            toValue: -300,
                       }).start();
                       clearInterval(timer2);
                    }, 4000); 
                }
            })
      .catch(async(error) => {
           this.setState({loading: 'none'});
           console.log(error)
      });
      
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
      quality: 0.5,
      base64: true, 
    });

    image = result.base64

    if (!result.cancelled) {
      this.setState({
          image: 'data:image/jpg;base64,'+ image ,
          imagemEscolhida: 'Imagem escolhida'
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
                         <TouchableOpacity style={styles.paddingLeft} onPress={() => navigate('Configurações')}>
                              <SimpleLineIcons name="arrow-left" size={20} color='white' />   
                         </TouchableOpacity>
                     </View>
                     <View style={styles.name}>
                         <Text style={styles.styleName}>Fale Conosco</Text>
                     </View>
                     <View style={styles.icon1}>
                         <TouchableOpacity style={styles.paddingRight}>
                             <SimpleLineIcons name="menu" size={25} color='white' />   
                         </TouchableOpacity>
                     </View>
                 </View>
                 {/*FIM MENU*/}
                 <View style={{ flex: 1, backgroundColor: 'white'}}>
                    <ScrollView contentContainerStyle={{backgroundColor: 'white', width: '100%', alignItems: 'center'}}>
                          <View style={{paddingTop: '10%'}}/>
                          <Image
                              style={{height: 60, width: 60}}
                              source={require('../assets/images/21.png')}
                          /> 

                          <View style={{paddingTop: '4%'}}/>

                          <View style={{flexDirection: 'column', padding: 10, flex: 1, width: '100%'}}>
                              {/*
                              <TextInput autoCapitalize="none" autoCorrect={false} style={{shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 6, backgroundColor: 'white', color: 'gray', padding: 15,  width: '100%', borderRadius: 5, borderWidth: 0.5, borderColor: '#eeeeee'}} placeholder="Assunto" keyboardType="default" underlineColorAndroid='transparent' onChangeText={(assunto) => this.setState({assunto})} value={this.state.assunto}  placeholderTextColor="#bdbdbd" /> 
                             */}
                              <View style={{paddingTop: 10}}/>

                              <TextInput multiline  maxLength={360} autoCapitalize="none" autoCorrect={false} style={{shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 6, backgroundColor: 'white', color: 'gray', padding: 17,  width: '100%', borderRadius: 5, borderWidth: 0.5, borderColor: '#eeeeee', height: 170}} placeholder="Mensagem..." keyboardType="default" underlineColorAndroid='transparent' onChangeText={(comentario) => this.setState({comentario})} value={this.state.comentario}  placeholderTextColor="#bdbdbd" />   

                              <View style={{paddingTop: '5%'}}/>
                        
                              <View style={{width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                                  <View style={{flex: 5}}>
                                      <TouchableOpacity style={{width:'100%', justifyContent: 'center', alignItems:'center', borderRadius: 5, backgroundColor: '#2196f3', padding: 15, shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 5}} onPress={() => this.EscolherFoto()}>
                                          <Text style={{color: 'white'}}>{this.state.imagemEscolhida}</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{flex: 1, alignItems: 'center',  justifyContent: 'center',}}>
                                      <View style={{marginLeft: 5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                          <Image
                                              style={{height: 50, width: 50, borderRadius: 25}}
                                              source={{uri: this.state.image}}
                                          />   
                                      </View>
                                   </View>
                                  
                              </View>
                              <View style={{paddingTop: 10}}/>

                              <TouchableOpacity style={{width:'100%', justifyContent: 'center', alignItems:'center', borderRadius: 5, backgroundColor: '#66bb6a', padding: 15, shadowColor: 'gray', shadowOffset: { width: 0, height: 0}, shadowOpacity: 0.2, shadowRadius: 5}} onPress={() => this.Enviar()}>
                                  <Text style={{color: 'white'}}>Enviar</Text>
                              </TouchableOpacity>

                          </View>
                    </ScrollView>
                 </View>
                 
                 <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemComentario, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
                      <View style={{width: this.state.width - 20, padding: 13, backgroundColor: '#009688', borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 17, color: 'white', textAlign: 'center'}}>
                             Rebemos sua mensagem e retornaremos em breve.
                        </Text>
                      </View>
                 </Animated.View>  
                 <Animated.View style={{position: 'absolute', bottom: this.state.marginMensagemErro, width: this.state.width, alignItems: 'center', justifyContent: 'center', zIndex: 9999999999,  paddingBottom: 20, paddingRight: '5%', paddingLeft: '5%', paddingTop: 3}}>
                      <View style={{width: this.state.width - 20, padding: 13, backgroundColor: 'tomato', borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 17, color: 'white', textAlign: 'center'}}>
                             Houve algum erro ao enviar sua mensagem.
                        </Text>
                      </View>
                 </Animated.View>  
            </View>
        </SafeAreaView>
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