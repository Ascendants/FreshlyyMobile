import React from 'react';
import { Text } from 'react-native';

module.exports.P = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        fontWeight: 'Light',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H1 = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        fontSize: 50,
        fontWeight: 'Bold',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
module.exports.H2 = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        fontSize: 30,
        fontWeight: 'Bold',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H3 = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'light',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
