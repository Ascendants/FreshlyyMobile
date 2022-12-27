import React from 'react';
import { Text, View } from 'react-native';
import Theme from '../constants/theme';

module.exports.P = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        fontWeight: 'Light',
        color: Theme.textColor,
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
        color: Theme.textColor,
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
        color: Theme.textColor,
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
        color: Theme.textColor,
        fontSize: 25,
        fontWeight: 'light',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.H4 = function (props) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins',
        color: Theme.textColor,
        fontSize: 20,
        fontWeight: 'light',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

module.exports.Pr = function (props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text
        style={{
          fontFamily: 'Poppins',
          color: Theme.textColor,
          fontSize: Math.floor((props.fontSize ? props.fontSize : 16) * 0.6),
          fontWeight: 'light',
          ...props.style,
        }}
      >
        LKR
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins',
          color: Theme.textColor,
          fontSize: props.fontSize,
          fontWeight: 'light',
          ...props.style,
        }}
      >
        &nbsp;{props.children}
      </Text>
    </View>
  );
};
