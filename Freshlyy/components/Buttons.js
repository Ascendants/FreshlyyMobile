import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';

module.exports.BigButton = function (props) {
  return (
    <TouchableOpacity style={styles.bigButtonBackground}>
      <Text style={styles.bigButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bigButtonText: {
    fontSize: 25,
    textAlign: 'center',
    color: Theme.textColor,
  },
  bigButtonBackground: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
