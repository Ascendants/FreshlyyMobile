import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H7 } from '../components/Texts';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.container}>
      <Image source={props.imageUri} style={styles.icon} />
      <H6 style={styles.number}>{props.number}</H6>
      <H7>{props.text}</H7>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: Theme.primary,
  },
  number: {
    color: Theme.secondary,
    paddingTop: 4,
    fontWeight: 'bold',
  },
});
