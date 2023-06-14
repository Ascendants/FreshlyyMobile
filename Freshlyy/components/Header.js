import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import Theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function (props) {
  function switchFarmer() {
    nav.navigate('Farmer Dashboard');
  }
  function switchCustomer() {
    nav.navigate('Customer Dashboard');
  }
  function goHome() {
    nav.navigate('Customer Dashboard');
  }
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      {props.back ? (
        <TouchableOpacity onPress={nav.goBack}>
          <Ionicons name='ios-chevron-back' size={32} color={Theme.textColor} />
        </TouchableOpacity>
      ) : props.notification ? (
        <>
          <TouchableOpacity
            onPress={() =>
              nav.navigate('Notifications', { mode: props.notifMode })
            }
          >
            <Ionicons
              name='ios-notifications-outline'
              size={32}
              color={Theme.primary}
            />
            {props.hasNotifications && (
              <Octicons
                name='dot-fill'
                size={24}
                color={Theme.danger}
                style={{ position: 'absolute', top: -5, right: 3 }}
              />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ width: 32 }}></View>
      )}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {props.customer && props.hasFarmerAccess ? (
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
      {props.home ? (
        <TouchableOpacity onPress={goHome}>
          <Image source={require('../assets/homeh.png')} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
      {!props.farmer &&
        !(props.customer && props.hasFarmerAccess) &&
        !props.home && <View style={{ width: 32 }}></View>}
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
