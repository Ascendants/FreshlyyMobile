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
          source={require('../assets/befarmer.png')}
          style={styles.loginpic}
        />
        <H2 style={styles.logintext}>Become a farmer!</H2>
        <H4 style={styles.logintext}>Start Selling Today</H4>
        <View>
          <View style={styles.buttoncont}>
            <Button title='Become a farmer' color='shadedPrimary' size='big' />
            <H5 style={styles.desctext}>
              Additional information will be collected
            </H5>
          </View>

          <View style={styles.buttoncont}>
            <Button title=' Later ' color='shadedSecondary' size='big' />
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
    height: 200,
    marginTop: 50,
    marginBottom: 0,
  },
  logintext: {
    marginTop: -10,
    color: Theme.textColor,

    fontFamily: 'Poppins',
  },
  buttoncont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  desctext: {
    fontSize: 13,
    fontFamily: 'Poppins',
  },
});
