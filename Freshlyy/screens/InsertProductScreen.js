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
import { H1, H2 } from '../components/Texts';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <Image
            source={require('../assets/InsertProduct.png')}
            style={styles.vectorimage}
          />
          {/* <DatePicker/> */}

          <H1 style={styles.AddText}>Add your product</H1>

          <TextInputBox
            inputlabel='Product Name'
            placeholder='Enter product name'
          />
          <TextInputBox
            inputlabel='Quantity Available'
            placeholder='Enter quantity available '
          />
          <TextInputBox
            inputlabel='Price of 1Kg'
            placeholder='Enter price of 1Kg'
          />
          <TextInputBox
            inputlabel='Any description'
            placeholder='Enter description if you need'
          />
          <TextInputBox
            inputlabel='Add product image'
            placeholder='add 3 images here'
          />
          <View style={styles.buttcont}>
            <Button title='Upload' color='shadedPrimary' size='normal' />
            <Button title='Delete image' color='shadedDanger' size='normal' />
          </View>
          <Button title='Submit' color='filledPrimary' size='big' />
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
    width: 247,
    height: 143,
    marginTop: 10,
  },
  AddText: {
    color: Theme.primary,
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
