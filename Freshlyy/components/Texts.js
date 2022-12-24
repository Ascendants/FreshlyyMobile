import React from 'react';
import { Text, TurboModuleRegistry } from 'react-native';

module.exports.P = function P(props) {
  return (
    <Text style={{ fontFamily: 'Poppins', fontWeight: 'Light' }}>
      {props.children}
    </Text>
  );
};

module.exports.H1 = function H1(props) {
  return (
    <Text style={{ fontFamily: 'Poppins', fontSize: 30, fontWeight: 'Bold' }}>
      {props.children}
    </Text>
  );
};
