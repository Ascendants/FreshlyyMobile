import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function ({ customer, cart, social, product }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.iconBehave}
          title={`Go to Social Corner`}
          onPress={() => navigation.navigate('Product Home Page')}
        >
          <Image
            source={require('../assets/home.png')}
            style={styles.navLogo}
            tintColor={product && '#10AB68'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBehave}
          title={`Go to Social Corner`}
          onPress={() => navigation.navigate('Social Corner')}
        >
          <Image
            source={require('../assets/social-media.png')}
            style={styles.navLogo}
            tintColor={social && '#10AB68'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBehave}
          title={`Go to Cart`}
          onPress={() => navigation.navigate('Cart')}
        >
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.navLogo}
            tintColor={cart && '#10AB68'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBehave}
          title={`Go to Dashboard`}
          onPress={() => navigation.navigate('Customer Dashboard')}
        >
          <Image
            source={require('../assets/user.png')}
            style={styles.navLogo}
            tintColor={customer && '#10AB68'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    bottom: 10,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: Theme.overlay,
    borderRadius: 40,
    width: '95%',
    justifyContent: 'space-evenly',
  },
  iconBehave: {
    padding: 14,
  },
  navLogo: {
    width: 26,
    height: 26,
  },
});
