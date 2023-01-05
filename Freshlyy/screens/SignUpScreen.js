import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import { TextInputBox, DropDownPicker } from '../components/Inputs';


export default function () {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <View>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Image
        source={require('../assets/signupvector.png')}
        style={styles.vectorimage}
      />
      <TextInputBox inputlabel="First Name" placeholder="Enter first name"  />
      <TextInputBox inputlabel="Last Name" placeholder="Enter last name "  />
      <TextInputBox inputlabel="Email" placeholder="Enter email" type="email-address" />
     

      <DropDownPicker
        list={[
          { label: 'male', value: 'male' },
          { label: 'female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
      />
       <TextInputBox inputlabel="NIC Number" placeholder="Enter NIC" />
       <TextInputBox inputlabel="Street No" placeholder="Enter street no" />
       <TextInputBox inputlabel="Address line 1" placeholder="Enter address 1" />
       <TextInputBox inputlabel="Address line 2" placeholder="Enter address 2" />
      <TouchableOpacity>
        <FilledBigButton title="Next" />
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    marginTop: 30,
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
});
{
  /* <View>
<Image source={require('../assets/logo.png')} style={styles.logo} />
</View>
<Image
source={require('../assets/signupvector.png')}
style={styles.vectorimage}
/> */
}
