import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Alert, AsyncStorage, SafeAreaView, Modal, StatusBar, ScrollView, ImageBackground, FlatList, RefreshControl} from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import ReactDOM from "react-dom";
import * as WebBrowser from 'expo-web-browser';
import SideMenu from "react-native-side-menu";
import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native';
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


export default class Rank extends React.Component {
    
  constructor() {
    super()
    this.state = {
      widthMenu: 0,
      heightMenu: 0,
      height: 0,
      width: 0,
      modalRankingCompleto: false,
      loadingRankingCompleto: true,
      posicaoAtual: '...',
      posicaoAnterior: '...',
      page: 1,
      loadingMore: 'none',
      loadingRankingGeral: 'flex'
    }
  }  
    
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {  
     return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50; 
  }        
    
  RankingAtual = async () => {
      const { navigate } = this.props.navigation;
  	  var Token = await AsyncStorage.getItem('@Token');
      var userid = await AsyncStorage.getItem('@Userid');
      
      fetch( url+ 'api/v1/participants/'+userid+'/rankings', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
      }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({loadingRankingCompleto: true});
                //console.log(responseJson)
                if(responseJson.position){
                    
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
                    
                    this.setState({pointAtual: pontos, posicaoAtual: responseJson.position})
                }
                if(responseJson.error == 'Not Found'){
                    this.setState({pointAtual: 0, posicaoAtual: 0})
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
    
  RankingGeral  = async () => {
      
      const { navigate } = this.props.navigation;
      this.setState({loadingRankingCompleto: true})
  	  var Token = await AsyncStorage.getItem('@Token');
      ///page=3&per_page=20
      fetch( url+ 'api/v1/rankings', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + Token,
         },
      }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({loadingRankingCompleto: false, })
                if(!responseJson.error){
                    this.setState({ dataRanking: responseJson, loadingRankingGeral: 'none', page: 1})
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
     
       fetch( url + 'api/v1/rankings?page='+page+'&per_page=20',{
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
                    this.setState({ dataRanking: [...this.state.dataRanking, ...responseJson]})
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
      this.RankingAtual()
  }
  
  TamanhoAparelho  = () => {
  	 let response = Dimensions.get('window')
	 
	 width = response.width
	 height = response.height

     if(width > 375){
         fonteRanking = 18
         fonteRankingAtual = 40
     }else{
         fonteRanking = 13
         fonteRankingAtual = 35
     }
         
	 this.setState({
		width: width,
		height: height,
        fontRanking: fonteRankingAtual,
        fontRanking2Meses: fonteRanking,
        fontRanking3Meses: fonteRanking,
	 });

  }   
   
  componentWillMount () {
  
  }

  AbreRankingCompleto = async () => {
     this.RankingGeral()
     this.setState({
         modalRankingCompleto: true,
     });
  } 
  FechaRankingCompleto = async () => {
     this.setState({
         modalRankingCompleto: false,
     });
  } 
 
  renderItemRanking = ({item, index}) => {    
       pontos = item.points
       //pontos = parseInt(pontos)
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
      
       if(item.position == this.state.posicaoAtual){
           data = [
                <View key={item.id} style={{padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    
                    <View style={{elevation: 3, alignItems: 'center', backgroundColor: 'white', width: '100%', flexDirection: 'row', borderRadius: 10, flex: 1, height: 45}}>
                        <Image source={require('../assets/images/20.jpg')} style={{width: '100%', height: 45, borderRadius: 10, position: 'absolute'}}/>
                        <View style={{backgroundColor: 'rgba(128,203,196, 0.8)', flexDirection: 'row', borderRadius: 10, flex: 1, width: '100%', height: 45, alignItems: 'center', padding: 10,}}>
                            <View style={{alignItems: 'flex-start', flex: 3}}>
                                <Text numberOfLines={1} style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>{item.position}º {item.participant.data.name}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 1}}>
                                <Text numberOfLines={1} style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>{pontos}</Text>
                            </View>
                        </View>
                    </View>
                </View>
           ];
       }else{
           data = [
                <View key={item.id} style={{padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <View style={{elevation: 3, padding: 10, alignItems: 'center', backgroundColor: 'white', width: '100%', flexDirection: 'row', borderRadius: 10, flex: 1, height: 45}}>
                        <View style={{alignItems: 'flex-start', flex: 3}}>
                            <Text numberOfLines={1} style={{fontSize: 17, color: 'gray', fontWeight: 'bold'}}>{item.position}º {item.participant.data.name}</Text>
                        </View>
                        <View style={{alignItems: 'flex-end', flex: 1}}>
                            <Text numberOfLines={1} style={{fontSize: 17, color: 'gray', fontWeight: 'bold'}}>{pontos}</Text>
                        </View>
                    </View>
                </View>
           ];
       }
      
       return(
         <View>
            {data}
        </View>
     )
  } 
  
  SeparadorRanking = () => {
    return (
      <View
        style={{
          marginTop: 5,
        }}
      />
    ); 
  }
  
  render() {
    const { navigate } = this.props.navigation;
    
    return (
    <SafeAreaView style={styles.container}>
      {/*MODAL RANKING COMPLETO*/}
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalRankingCompleto}
          >
          <SafeAreaView style={{flex: 1}}>
             <StatusBar barStyle="dark-content" />
             <View style={{width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#eeeeee', position: 'absolute', zIndex: 99999999999, justifyContent: 'center', alignItems: 'center', flexDirection:'row', padding: 7}}>
                <View style={{flex: 1, height: '100%'}}></View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Text style={{fontSize: 17, color: 'gray'}}>
                        Ranking Completo
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <TouchableOpacity style={{padding: 10}} onPress={this.FechaRankingCompleto}>
                         <Feather name="chevron-down" size={25} color='gray' />     
                    </TouchableOpacity>
                </View>
             </View>   
             <View style={{paddingTop: '18%'}}/>
             <Progress.Bar borderWidth={0} unfilledColor="#e0e0e0" borderRadius={100} progress={1} width={this.state.width + 100} indeterminate={true} indeterminateAnimationDuration={1000} color="white" style={{marginLeft: -50, display: this.state.loadingRankingGeral}}/>
             <ScrollView  showsVerticalScrollIndicator={false}  
                onScroll={({ nativeEvent }) => {if (this.isCloseToBottom(nativeEvent) && this.state.page) {this.LoadingMore()}}}
                refreshControl={
                  <RefreshControl    
                     refreshing={this.state.loadingRankingCompleto}
                     onRefresh={this.RankingGeral.bind(this)}
                     tintColor="#bdbdbd"
                     titleColor="gray"
                  />
                       
             }>
                     <FlatList showsVerticalScrollIndicator={false} scrollEnabled={false}
                        data={this.state.dataRanking} 
                        extraData={this.state}
                        keyExtractor={(x,i) => i.toString()} 
                        renderItem={this.renderItemRanking}
                        ItemSeparatorComponent={this.SeparadorRanking}
                        initialNumToRender={2} 
                        removeClippedSubviews={false}
                        onScrollBeginDrag={this.Recenter}
                        onScroll={({ nativeEvent }) => {
                          if (this.isCloseToBottom(nativeEvent) && this.state.page) {                
                               this.LoadingMore()}}}
                        onEndReachedThreshold={1}
                        selected={this.state.selected} >
                        <StatusBar barStyle="dark-content" />
                     </FlatList>
                     <View style={{height: 60, width: '100%', justfyContent: 'center', alignItems: 'center'}}>
                        <DotIndicator count={3} color='gray' size={15} style={{padding: 20, display: this.state.loadingMore}}/>
                     </View>
                     <View style={{paddingTop: '3%'}}/>
                  </ScrollView>
          </SafeAreaView>
      </Modal>
      {/*FIM RANKING COMPLETO*/}
      <View style={styles.container2}>
         {/*MENU*/}
         <View style={styles.header}>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingLeft}>
                     <SimpleLineIcons name="menu" size={25} color='white' />   
                 </TouchableOpacity>
             </View>
             <View style={styles.name}>
                 <Text style={styles.styleName}>Ranking</Text>
             </View>
             <View style={styles.icon1}>
                 <TouchableOpacity style={styles.paddingRight}>
                      <MaterialCommunityIcons name="trophy-award" size={25} color='white' />     
                 </TouchableOpacity>
             </View>
          </View>
         {/*FIM MENU*/}
         <View style={{ flex: 1, backgroundColor: 'white',}}>
             <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>

                 <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <Image source={require('../assets/images/19.png')} style={{width: this.state.height/7, height: this.state.height/7, }}/>
                 </View>
                 <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row'}}>
                    
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <Text style={{fontSize: 15, color: 'gray'}}>
                            Seu ranking
                        </Text>
                        <View style={{padding: 5}}/>
                        <View style={{padding: 10, height: this.state.height/4, width: this.state.height/4, borderRadius: 1000, backgroundColor: 'white', elevation: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <View style={{padding: 5}}/>
                            <Text style={{fontSize: this.state.fontRanking, color: '#80cbc4', fontWeight: 'bold'}}>
                                {this.state.pointAtual}
                            </Text>  
                            <View style={{paddingTop: 5}}/>   
                            <Text style={{fontSize: 20, color: 'gray'}}>
                                {this.state.posicaoAtual}º
                            </Text>
                            <View style={{padding: 5}}/>
                        </View>
                    </View>

                 </View>
                 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 250, borderRadius: 100, backgroundColor: '#92278f', elevation: 3, padding: 12}} onPress={this.AbreRankingCompleto}>
                        <Text style={{color: 'white'}}>Ranking Completo</Text>
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