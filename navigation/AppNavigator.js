import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import App from '../screens/Home';
import Recuperar from '../screens/RecuperarSenha';
import PreLoading from '../screens/PreLoading';
import { FontAwesome } from '@expo/vector-icons';

import Feed from '../screens/Feed';
import Rank from '../screens/Rank';
import Premios from '../screens/Premios';
import Notificacoes from '../screens/Notificacoes';
import Configuracoes from '../screens/Configuracoes';
import FaleConosco from '../screens/FaleConosco';
import Regulamento from '../screens/Regulamento';
import FazPedido from '../screens/FazPedido';
import Favoritos from '../screens/Favoritos';
//import Pedidos from '../screens/Pedidos';
import Extrato from '../screens/Extrato';
//import Equipe from '../screens/Equipe';
import DadosPessoais from '../screens/DadosPessoais';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';  
import { SimpleLineIcons } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons';  
import { Octicons } from '@expo/vector-icons';  
import { Fontisto } from '@expo/vector-icons';  


const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="home" size={25} color={tintColor} />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
           scene.navigation.navigate("Home", { date: new Date() })
        },
        /*
        tabBarOnPress: (scene, jumpToIndex) => {
           tela = (scene.navigation.state.routeName);
           console.log(tela)
           if(tela == 'Home'){
               console.log('igual')
           }else{
               scene.navigation.navigate('Home')
           }
        },
        */
      }
    },
    
    Rank: {
      screen: Rank,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="trophy" size={25} color={tintColor} />
        )
      }
    },
    
    Premios: {
      screen: Premios,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View style={{elevation: 2, backgroundColor: 'white', borderRadius: 1000, height: 70, width: 70, marginTop: -35, justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name="gift" size={45} color={tintColor} />
          </View>
        ),
      }
    },
    
    Notificações: {
      screen: Notificacoes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="notification" size={25} color={tintColor} />
        )
      }
    },
    Configurações: {
      screen: Configuracoes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="setting" size={25} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: '#92278f',
      showLabel: false,
      style:{
            borderTopWidth: 0,
            borderTopColor:'#eeeeee'
      },
      indicatorStyle: {
            backgroundColor: 'white',
      },
    }
  },
);
const AppContainer = createAppContainer(bottomTabNavigator);

const AppNavigator = createStackNavigator(
  {
      
      PreLoading:{
        screen: PreLoading,
      },
      Login: {
        screen: Login,
      },
      /*
      Recuperar: {
        screen: Recuperar,
      },
      */
      Home: {
        screen: AppContainer,
      },
      
      FaleConosco: {
        screen: FaleConosco,
      },
      Regulamento: {
        screen: Regulamento,
      },
      
      FazPedido: {
        screen: FazPedido,
      },
   
      Favoritos: {
        screen: Favoritos,
      },
      /*
      Pedidos: {
        screen: Pedidos,
      },
      */
      Extrato: {
        screen: Extrato,
      },
      /*
      Equipe: {
        screen: Equipe,
      },
      */
      DadosPessoais: {
        screen: DadosPessoais,
      },
    
  },
  {
    headerMode: 'none',
    mode: 'card',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }                                     
);

export default createAppContainer(AppNavigator);
