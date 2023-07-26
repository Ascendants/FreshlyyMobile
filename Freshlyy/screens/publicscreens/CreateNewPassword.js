import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import {
  TextInputBox,
  DropDownPicker,
  CheckBox,
} from '../../components/Inputs';
import Header from '../../components/Header';

import { H1, H2, H4, H3 } from '../../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ({ navigation, route }) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Header back={true} />
          <View style={styles.screen}>
            <H3 style={styles.heading}>Create New Password</H3>

            <Image
              source={require('../../assets/createNewPassword.png')}
              style={styles.loginpic}
            />
            <H4 style={styles.desc}>
              Your new password must be different from previously used password
            </H4>
            <View style={styles.inputcont}>
              <TextInputBox inputlabel='New Password' type='password' />
              <TextInputBox inputlabel='Confirm Password' type='password' />
            </View>
            <Button title='Submit' color='shadedPrimary' size='big' />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 0,
    marginBottom: 20,
  },
  desc: {
    marginVertical: 10,
    textAlign: 'center',
  },
  inputcont: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
});
