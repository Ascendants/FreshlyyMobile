import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H8 } from './Texts';
import theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View style={styles.progressBarUnfilled}></View>
        <View
          style={[
            styles.progressBarFilled,
            {
              width: `${
                ((props.progress - props.min) / (props.max - props.min)) * 100
              }%`,
            },
          ]}
        ></View>
      </View>
      <View style={styles.progressBarBounds}>
        <H8>{props.min}</H8>
        <H8>{props.max}</H8>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {},
  progressBarUnfilled: {
    width: '100%',
    height: 6,
    backgroundColor: theme.textColor,
    borderRadius: 10,
  },
  progressBarFilled: {
    position: 'absolute',
    height: 6,
    backgroundColor: theme.primary,
    borderRadius: 10,
  },
  progressBarBounds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
