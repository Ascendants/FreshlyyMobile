import React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../constants/theme';

export default function (props) {
  let color = Theme.overlay;
  switch (props.color) {
    case 'warning':
      color = Theme.warningShadeLighter;
      break;
    case 'danger':
      color = Theme.dangerShadeLighter;
      break;
    case 'primary':
      color = Theme.primaryShadeLighter;
      break;
    default:
      color = Theme.overlay;
      break;
  }
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.contentContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 20,
    margin: 10,
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
  },
});
