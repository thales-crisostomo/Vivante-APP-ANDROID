import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

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

export default class RecuperarSenha extends React.Component {
    
  constructor() {
    super()
    this.state = {
       TypeInputPassword: true,
       size: 0,
       heightLoading: new Animated.Value(0),
       Loading: new Animated.Value(1),
    }
    this.keyboardHeight = new Animated.Value(1);
  }     
    
  TamanhoAparelho  = () => {
  	 let response = Dimensions.get('window')
	 
	 width = response.width
	 height = response.height

     if(width > 375){
         padding = 16
     }else{
         padding = 12
     }

	 this.setState({
		width: width,
		height: height,
        paddingInput: padding
	 });
  }     
    
  componentDidMount () {
     this.TamanhoAparelho()
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
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }).start();
  };

  keyboardWillHide = (event) => {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 1,
      }).start();
  };  
     

  onChanged (cpf) {
    this.setState({
        cpf: cpf.replace(/[^0-9]/g, ''),
    });
      
  }

  Recuperar = async () => {
      Keyboard.dismiss()
      user = this.state.cpf
      
      if(user == null || user == ''){
           Alert.alert(
              'Ops!',
              'O campo está vazio.',
           );
      }else{
           this.AnimaLoading()
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
      var timer = setInterval(async() => {
		  Animated.timing(this.state.heightLoading, {
            duration: 300,
            toValue: 0,
          }).start();
          navigate('Home')
          this.setState({
            size: 0,
          });
	  clearInterval(timer);
	  }, 4600);
  };
    

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior="padding"
    >
        <Animated.View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(41,43,51, 0.9)', zIndex: 9999999,height: this.state.heightLoading, width: '100%'}}>
            <DotIndicator count={3} color='white' size={this.state.size} />
        </Animated.View>
        <View style={{paddingTop: '10%', width: '100%', position: 'absolute', zIndex: 9999, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <TouchableOpacity onPress={() => goBack(null)} style={{padding: 20}}>
                 <SimpleLineIcons name="arrow-left" style={{fontSize: 30}} color="white" />
            </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             
          <View style={{ flex: 1}}>
            <Image resizeMode='cover' style={{height: '100%', width: '100%', position: 'absolute', }} source={require('../assets/images/9.jpg')} />
            <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999}} />
            <View style={{zIndex: 9999, flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                    <Image style={{height: 100, width: 100}} source={require('../assets/images/logo-stars-estrela.png')} />
                </View>
                <View style={{flex: 2, paddingLeft: '5%', paddingRight: '5%'}}> 
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 50, paddingLeft: '7%', shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 5}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <FontAwesome name="user-o" size={20} color="black" />
                        </View>
                        <View style={{width: '100%', }}>
                            <TextInput autoCapitalize="none" autoCorrect={false} style={{padding: this.state.paddingInput,  width: '100%'}} placeholder="CPF que deseja recuperar" keyboardType="numeric" underlineColorAndroid='transparent' onChangeText={(cpf) => this.onChanged(cpf)} value={this.state.cpf} /> 
                        </View>
                    </View>
                    <View style={{padding: '2%'}}/>
                    <View style={{padding: '10%'}}/>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 50}} onPress={this.Recuperar} > 
                             <Text style={{fontSize: 35, color: 'white'}}>Recuperar</Text>
                             <View style={{paddingLeft: '8%'}}/>
                             <View style={{paddingLeft: 20,paddingRight: 20, backgroundColor: '#292b33', borderRadius: 100, marginTop: 6, paddingTop: 10, paddingBottom: 10, shadowColor: 'black', shadowOpacity: 0.7, shadowRadius: 10}}>
                                <SimpleLineIcons name="arrow-right" style={{fontSize: 20}} color="white" />
                             </View>
                        </TouchableOpacity>
                    </View>
                </View>
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