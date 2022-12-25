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
module.exports.GreyButton = function (props) {
  return (
    <TouchableOpacity style={[styles.greyButtonBackground]}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

module.exports.FilledBigButton = function (props) {
  return (
    <TouchableOpacity
      style={[styles.bigButtonBackground, styles.filledBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.filledBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
module.exports.ShadedBigButton = function (props) {
  return (
    <TouchableOpacity
      style={[styles.bigButtonBackground, styles.shadedBigButtonBackground]}
    >
      <Text style={[styles.bigButtonText, styles.shadedBigButtonText]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bigButtonText: {
    fontSize: 22,
    textAlign: 'center',
    color: Theme.textColor,
  },
  bigButtonBackground: {
    padding: 15,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 18,
    backgroundColor: 'white',
  },
  shadedBigButtonBackground: {
    backgroundColor: Theme.primaryShade,
  },
  shadedBigButtonText: {
    color: Theme.primary,
  },
  filledBigButtonBackground: {
    backgroundColor: Theme.primary,
  },
  filledBigButtonText: {
    color: Theme.contrastTextColor,
  },
  greyButtonBackground: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Theme.overlay,
    padding: 5,
    marginHorizontal: 5,
  },
});
