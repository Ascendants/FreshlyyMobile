import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../constants/theme';

export default function (props) {
  const ratingStars = ['staro', 'staro', 'staro', 'staro', 'staro'];
  function rating() {
    for (let i = 0; i < props.value; i++) {
      ratingStars[i] = 'star';
    }
  }
  rating();
  return (
    <View style={styles.starContainer}>
      {ratingStars.map((rating, index) => {
        return (
          <AntDesign key={index} name={rating} size={18} color={Theme.yellow} />
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  starContainer: {
    marginRight: 10,
    flexDirection: 'row',
  },
});
