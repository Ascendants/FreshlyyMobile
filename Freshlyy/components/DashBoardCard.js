import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H7 } from '../components/Texts';
import Theme from '../constants/theme';

export default function (props) {
  const simpleAlert = () => {
    alert('hello');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={simpleAlert}>
      <Image source={props.imageUri} style={styles.icon} />
      <H6 style={styles.number}>{props.number}</H6>
      <H7>{props.text}</H7>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Theme.overlay,
    width: '30%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
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
