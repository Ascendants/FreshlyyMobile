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
import { H4, P } from '../components/Texts';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../assets/signupvector.png')}
              style={styles.vectorimage}
            />

            <TextInputBox
              inputlabel='Occupation'
              placeholder='Enter Occupation'
            />
            <TextInputBox
              inputlabel='Max Delivery Distance'
              placeholder='Enter maximum delivery distance '
              type='number'
            />

            <DropDownPicker
              inputlabel='Has a vehicle to deliver?'
              list={[
                { label: 'Yes', value: 'y' },
                { label: 'No', value: 'N' },
              ]}
            />
            <TextInputBox
              inputlabel='Delivery charge per Km'
              placeholder='Enter delivery charge per Km'
            />
            <TextInputBox
              inputlabel='Street No'
              placeholder='Enter street no'
            />
            <TextInputBox
              inputlabel='Address line 1'
              placeholder='Enter address 1'
            />
            <TextInputBox
              inputlabel='Address line 2'
              placeholder='Enter address 2'
            />
            <Button title='Next' color='filledSecondary' size='big' />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  pageContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginVertical: 30,
  },
  inputcont: {
    position: 'relative',
    width: '80%',
  },
  inputlabel: {
    paddingLeft: 10,
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
  loctext: {
    alignSelf: 'baseline',
  },
});
