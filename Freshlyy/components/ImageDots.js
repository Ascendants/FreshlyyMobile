import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Theme from '../constants/theme';

export default function (props) {
  function generateDots() {
    let dots = [];
    for (let i = 0; i < props.numOfElem; i++) {
      let dot = (
        <View style={styles.dot} key={i}>
          <Octicons
            name='dot-fill'
            size={16}
            color={Theme.overlayShadeDarker}
          />
        </View>
      );
      if (i == props.index % props.numOfElem) {
        dot = (
          <View style={styles.dot} key={i}>
            <Octicons
              name='dot-fill'
              size={16}
              color={Theme.contrastTextColor}
            />
          </View>
        );
      }
      dots.push(dot);
    }
    return dots;
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.dotsContainer}>{[...generateDots()]}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dotsContainer: {
    backgroundColor: Theme.overlayShade,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 4,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  dot: {
    paddingHorizontal: 3,
    margin: 0,
  },
});
