import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H7 } from '../components/Texts';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image
        source={props.imageUri}
        style={[styles.icon, { backgroundColor: props.imageUri.placeholder }]}
      />
      <H6 style={styles.number}>{props.number}</H6>
      <H7>{props.text}</H7>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    height: 100,
    backgroundColor: Theme.overlay,
    margin: 20,
    padding: 15,
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
