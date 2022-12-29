import { contains } from '@firebase/util';
import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { H1, H2 } from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Inputs from '../components/Inputs';

export default function () {
  return (
    <View style={styles.screen}>
      <View>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Image
        source={require('../assets/signupvector.png')}
        style={styles.vectorimage}
      />
      <Inputs inputlabel="First Name" placeholder="Enter first name" />
      <Inputs inputlabel="Last Name" placeholder="Enter last name " />
      <TouchableOpacity>
        <FilledBigButton title="Next" />
      </TouchableOpacity>
    </View>
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
