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
import { TextInputBox, DropDownPicker, CheckBox } from '../components/Inputs';
import Header from '../components/Header';

import { H1, H2, H4,H3} from '../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H3 style={styles.heading}>Verify Your Email</H3>
        <Image
          source={require('../assets/verifyEmail.png')}
          style={styles.loginpic}
        />
        <H4 style={styles.desc}>Please enter the 4 digit code sent to nadunrupasinghe@gmail.com</H4>
        
        <View></View>
        <Button title='Verify' color='shadedPrimary' size='big' />

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
    height: 250,
    marginTop: 30,
    marginBottom: 20,
  },
  desc: {
    marginVertical: 10,
    textAlign:'center'
  },
  inputcont: {
    width: '80%',
    alignItems: 'center',
    marginBottom:70
  },
});
