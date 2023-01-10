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
import { H1, H2, H4 } from '../components/Texts';
import Header from '../components/Header';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <Image
          source={require('../assets/loginpic.png')}
          style={styles.loginpic}
        />
        <H4 style={styles.logintext}>Log In</H4>
        <View style={styles.inputcont}>
          <TextInputBox inputlabel='Email' type='email-address' />
          <TextInputBox inputlabel='Password' type='password' />
        </View>
        <Button color='shadedPrimary' size='big' title='Log In' />
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
    height: 200,
    marginTop: 50,
    marginBottom: 0,
  },
  logintext: {
    margin: 0,
    color: Theme.primary,
  },
  inputcont: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
