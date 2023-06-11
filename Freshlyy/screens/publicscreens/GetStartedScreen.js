import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2 } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';

export default function ({ navigation,route }) {
  return (
    <View style={styles.screen}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.startLogo}
      />
      <Image
        source={require('../../assets/vegetables.png')}
        style={styles.startImage}
      />
      <H1 style={styles.logoText}>Welcome!</H1>
      <Button
        title='Create Your Account'
        color='filledPrimary'
        size='big'
        onPress={() => navigation.navigate('Sign Up')}
      />
      <Text style={styles.noAccText}>Already have an account?</Text>

      <TouchableOpacity>
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('login')}
        >
          Sign in here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  nadun: {
    color: Theme.primary,
  },
  startLogo: {
    height: 80,
    resizeMode: 'contain',
  },
  startImage: {
    height: 90,
    resizeMode: 'contain',
  },
  logoText: {
    color: Theme.primary,
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 30,
  },
  noAccText: {
    fontSize: 17,
    paddingTop: 20,
    paddingBottom: 10,
  },
  signInText: {
    fontSize: 17,
    color: Theme.blue,
    fontWeight: 'bold',
  },
});
