import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { H1, P } from '../components/Texts';
import LottieView from 'lottie-react-native';

export default function () {
  return (
    <View style={styles.screen}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/Freshlyy.json')}
      />
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
});
