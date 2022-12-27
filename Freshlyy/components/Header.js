import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Theme from '../constants/theme';

export default function () {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name='ios-chevron-back' size={32} color={Theme.textColor} />
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity>
        <Ionicons name='ios-menu' size={32} color={Theme.textColor} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    margin: 0,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 100,
    resizeMode: 'contain',
  },
});