import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H4, P, H3, H5,H6 } from '../components/Texts';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import ReviewProductCard from '../components/ReviewProductCard';
import Rating from '../components/Rating';


export default function () {
    return (
        <SafeAreaView>
            <Header back={true} />
            <ScrollView>
            <View style={styles.screen}>
                <H3>Review Order</H3>
                <H6> Order id</H6>
                <H4 style={styles.farmername}>From Komuthu Fernando</H4>
                <ReviewProductCard></ReviewProductCard>
                <ReviewProductCard></ReviewProductCard>
                <H4 style={styles.delivery}>Rate the Delivery</H4>
                <View style={styles.rating}>
                  <Rating  ></Rating>
                </View>
                
                <H4 style={styles.communi}>Rate the Communication</H4>
                <View style={styles.rating}>
                  <Rating style={styles.rating}></Rating>
                </View>
                
                <Button title='Save Review' color='shadedPrimary' size='normal' style={styles.save} />
                
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
    margin:30,
  },
  farmername:{
    color:'blue',
  },
  delivery:{
    textAlign:'left',
    marginTop:20,
    marginBottom:10,
  
  },
  communi:{
    marginTop:20,
    marginBottom:10,
  },
  rating:{
    marginBottom:20,
  },
  save:{
    marginTop:40,
  }
});