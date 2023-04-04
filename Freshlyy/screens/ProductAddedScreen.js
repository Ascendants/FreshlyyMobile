import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker } from '../components/Inputs';
import { H2, H4, H5 } from '../components/Texts';
import Header from '../components/Header';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <Image
          source={require('../assets/AddingProduct.png')}
          style={styles.loginpic}
        />
        <H2 style={styles.logintext}>Product Added</H2>
        <Image
          source={require('../assets/checked.png')}
          style={styles.okaypic}
        />

        <View>
          <View style={styles.buttoncont}>
            <Button
              title='View Product List'
              color='filledPrimary'
              size='big'
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  loginpic: {
    width: 300,
    height: 300,
    marginTop: 0,
    marginBottom: 0,
  },
  logintext: {
    marginTop: 10,
    color: Theme.textColor,

    fontFamily: 'Poppins',
  },
  buttoncont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  okaypic: {
    width: 100,
    height: 100,
    marginTop: 0,
    marginBottom: 0,
  },
});
