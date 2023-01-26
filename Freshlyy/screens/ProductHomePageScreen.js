import { contains } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { H1, H2 ,H7,H6} from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import ENV from '../constants/env';


export default function () {
  const likeCount=100
  React.useEffect(() => {
    fetch(ENV.backend + '/customer/main-page/', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
          console.log(res)
        })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      
      <ScrollView>
      <View style={styles.screen}>
      <View style={styles.searchCont}>
        <AntDesign name="search1" size={20} color="black" style={styles.searchico}/>
        <TextInput placeholder='Search produce' style={styles.searchinput}/>
      </View>
      
      <View style={styles.filterCont} >
          <TouchableOpacity>
          <View style={styles.filterSelect}>
            <AntDesign name="arrowdown" size={24} color="black" />
            <H6>Best match</H6>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity>
          <View  style={styles.filterSelect}>
          <Ionicons name="swap-vertical" size={24} color="black" />
          <H6>Price</H6>
          </View>
          </TouchableOpacity>
        
          <TouchableOpacity>
          <View  style={styles.filterSelect} >
          <Ionicons name="swap-vertical" size={24} color="black" />
          <H6>Distance</H6> 
          </View>
          </TouchableOpacity>
         
         <TouchableOpacity>
         <View style={styles.filterSelect}>
            <Ionicons name="filter" size={24} color="black" /> 
          </View>
         </TouchableOpacity>
         
        
      </View>
        <View style={styles.prodCont}>
            <ProductCard cardType='social' like={likeCount}/>
       
        </View>

  </View>
  </ScrollView>
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  searchico:{
     paddingRight:10
      
  },
  searchinput:{
         width:'87%'
  },
  searchCont:{
      display:'flex',
      padding:8,
      flexDirection:'row',
      alignItems:'center',
      //paddingLeft:20,
      backgroundColor:Theme.overlay,
      width:'90%',
      borderRadius:20,
      marginVertical:10
  },
  filterCont:{
      display:'flex',
      width:'86%',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between'
    
      
     
  },
  filterSelect:{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap'
  },


  prodCont:{
    display:'flex',
    width:'85%',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    
    
  }
});
