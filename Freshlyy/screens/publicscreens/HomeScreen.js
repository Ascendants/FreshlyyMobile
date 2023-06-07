import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H1, P } from '../../components/Texts';

export default function () {
  return (
    <View style={styles.screen}>
      <H1>Hello</H1>
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
