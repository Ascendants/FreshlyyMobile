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
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H1, H2,H6, Pr} from '../components/Texts';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
        <H1 style={styles.AddText}>Selling Products</H1>
          <Image
            source={require('../assets/carrot.jpg')}
            style={styles.vectorimage}
          />
          {/* <DatePicker/> */}
          <H6 style={styles.PText}>Sri Lankan Carrots</H6>
          <View style={styles.DeBox}>
           
           <H2 style={styles.DText}>Available Quantity -: 10Kg</H2>
           <H2 style={styles.DText}>Price -: </H2><Pr>1250/ Kg</Pr>
           <H2 style={styles.DText}>Description -: </H2>
          <H2 style={styles.DText}> I dug these carrots from my garden..........</H2>
          </View>

          
          <View style={styles.buttcont}>
            <Button title='Edit' color='shadedPrimary' size='normal' />
            <Button title='Delete' color='shadedDanger' size='normal' />
          </View>
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
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  AddText: {
    // color: Theme.primary,
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 2,
  },
  PText:{
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
    

  },
  DText:{
    fontSize: 20,
    paddingBottom:2,
    
  }, 
  DeBox:{
    color:Theme.primary,
    display:'flex',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 5,

  },
  inputcont: {
    position: 'relative',
    width: '100%',
  },

  buttcont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    width: '80%',
  },
});


