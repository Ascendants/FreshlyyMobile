import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H1, H8, H3, H4, P, Pr } from '../components/Texts';
import { Entypo } from '@expo/vector-icons';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.statusBall}>
      <View style={styles.ballContainer}>
        <View style={[styles.ball, props.done ? styles.filledBall : null]}>
          {props.done && (
            <Entypo name='check' size={18} color={Theme.contrastTextColor} />
          )}
        </View>
      </View>
      <View
        style={[
          styles.line,
          props.first ? styles.firstLine : null,
          props.last ? styles.lastLine : null,
        ]}
      ></View>
      <View style={styles.statusText}>
        <H8>{props.status}</H8>
      </View>
    </View>
  );
}
const styles = {
  statusBall: {
    height: 50,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  ballContainer: {
    zIndex: 100,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    height: 20,
    width: 20,
    backgroundColor: Theme.textColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledBall: {
    height: 28,
    width: 28,
    borderRadius: 15,
    backgroundColor: Theme.primary,
  },
  line: {
    position: 'absolute',
    top: 12,
    width: '150%',
    backgroundColor: Theme.textColor,
    height: 4,
  },
  firstLine: {
    left: '50%',
    width: '100%',
  },
  lastLine: {
    right: '50%',
    width: '100%',
  },
};
