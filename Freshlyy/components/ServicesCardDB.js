import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { H6, H7, H8 } from '../components/Texts';
import Theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
export default function (props) {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      {/* <View style={styles.notify}>
        <H7 style={styles.notifyNumber}>20</H7>
      </View> */}
      <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/message.png')} style={styles.logo} />
        <H8>Messages</H8>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.navigate('Help Center', { farmer: props.farmer })}
      >
        <Image source={require('../assets/question.png')} style={styles.logo} />
        <H8>Help Center</H8>
      </TouchableOpacity>

      {props.customerDB ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Farmer Follower Page')}
        >
          <Image source={require('../assets/follow.png')} style={styles.logo} />
          <H8>Following</H8>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Farmer Report')}
        >
          <Image
            source={require('../assets/insight.png')}
            style={styles.logo}
          />
          <H8>Reports</H8>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.primaryShadeLighter,
    width: '90%',
    padding: 20,
    flexDirection: 'row',
    borderRadius: 30,
  },
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  notify: {
    position: 'absolute',
    top: '35%',
    left: '22%',
    backgroundColor: Theme.primary,
    // padding: 5,
    minHeight: 20,
    minWidth: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyNumber: {
    color: 'white',
  },
});
