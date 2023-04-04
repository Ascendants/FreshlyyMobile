import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { H2, H4 } from '../../components/Texts';
import { Button } from '../../components/Buttons';

import Theme from '../../constants/theme';

export default function ({ navigation, route }) {
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../../assets/start3.jpg')}
        style={styles.bgImage}
        resizeMode='cover'
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logowhite.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.descContainer}>
            <H2 style={styles.text}>Welcome</H2>
            <H4 style={{ ...styles.text, ...styles.description }}>
              Fresh Produce. To the Doorstep.
            </H4>
            <Button
              size='big'
              color='filledPrimary'
              title='Get Started'
              onPress={() => navigation.navigate('GetStartedScreen')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000044',
  },
  logoContainer: {
    width: '80%',
    height: 100,
  },
  text: {
    color: Theme.contrastTextColor,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  description: {
    marginBottom: 40,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
