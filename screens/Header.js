import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet} from 'react-native';
import { createBottomTabNavigator, createAppContainer, tabBarIcon } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';  
import { SimpleLineIcons } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons';  
import { Octicons } from '@expo/vector-icons';  
import { Fontisto } from '@expo/vector-icons';  



export default class Header extends React.Component {
  render() {
    return(
      <View style={styles.header}>
         <View style={styles.icon1}>
             <TouchableOpacity style={styles.paddingLeft}>
                 <SimpleLineIcons name="menu" size={25} color='white' />   
             </TouchableOpacity>
         </View>
         <View style={styles.name}>
             <Text style={styles.styleName}>{this.props.name}</Text>
         </View>
         <View style={styles.icon2}>
             <TouchableOpacity style={styles.paddingRight}>
                 <SimpleLineIcons name="menu" size={25} color='white' />   
             </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: '5%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(41,43,51, 1)',
  },
  icon1: {
    flex: 1
  },
  name: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 3,
  },
  icon2:{
      flex: 1,
      alignItems: 'flex-end',
  },
  paddingLeft:{
    paddingLeft: 15,
  },
  paddingRight:{
    paddingRight: 15,
  },
  styleName:{
      color: 'white',
      fontSize: 25,
  }
});

