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
import { H1, H2,H6 } from '../components/Texts';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
         
        <H1 style={styles.AddText}>Edit Details</H1>
          
          {/* <DatePicker/> */}
      

          <TextInputBox
            inputlabel='Product Name'
            placeholder='Sri Lankan Carrot'
          />
          <TextInputBox
            inputlabel='Quantity Available'
            placeholder='10Kg '
          />
          <TextInputBox
            inputlabel='Price of 1Kg'
            placeholder='LKR 1250'
          />
          <TextInputBox
            inputlabel='Any description'
            placeholder='I dug these carrot from...'
          />
          
          {/* <Image
            source={require('../assets/carrot.jpg')}
            style={styles.vectorimage}
          /> */}
          <TextInputBox
            inputlabel='Add product image'/>
           
        
          <View style={styles.buttcont}>
            <Button title='Delete image' color='shadedDanger' size='normal' />
            <Button title='Upload image' color='shadedPrimary' size='normal' />
            
          </View>
          <Button title='Upload' color='filledPrimary' size='big' />
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
  inputcont: {
    position: 'relative',
    width: '80%',
  },
  inputlabel: {
    paddingLeft: 50,
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  input: {
    position: 'relative',
    height: 40,
    width: '100%',
    fontFamily: 'Poppins',
    paddingLeft: 10,
    backgroundColor: Theme.overlay,
    borderColor: Theme.overlay,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttcont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

