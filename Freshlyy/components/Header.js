import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function (props) {
  function switchFarmer() {
    nav.navigate('Farmer Dashboard');
  }
  function switchCustomer() {
    nav.navigate('Customer Dashboard');
  }
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      {props.back ? (
        <TouchableOpacity onPress={nav.goBack}>
          <Ionicons name='ios-chevron-back' size={32} color={Theme.textColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }}></View>
      )}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {props.customer ? (
        <TouchableOpacity onPress={switchFarmer}>
          <Image
            source={require('../assets/farmericon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
      {props.farmer ? (
        <TouchableOpacity onPress={switchCustomer}>
          <Image
            source={require('../assets/usericon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
      {!props.farmer && !props.customer && <View style={{ width: 32 }}></View>}
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 100,
    resizeMode: 'contain',
  },
  icon: {
    height: 30,
    width: 30,
  },
});
