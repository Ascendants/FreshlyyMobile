import React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: Theme.textColor,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
