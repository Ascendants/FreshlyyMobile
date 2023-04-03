import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H5, H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function (props) {
  const methods = props.methods;

  function switchMethod(method) {
    props.setSelectedPayment(method);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={switchMethod.bind(this, 'cod')}
        style={styles.methodClicker}
      >
        <View
          style={[
            styles.method,
            props.selectedMethod == 'cod' ? styles.selectedMethod : null,
          ]}
        >
          <Image
            source={require('../assets/money.png')}
            style={styles.methodImage}
          />
          <H4 style={{ fontFamily: 'Poppins' }}> Cash on Delivery</H4>
        </View>
      </TouchableOpacity>
      {methods.map((method) => {
        let icon = require('../assets/card.png');
        switch (method.cardType) {
          case 'Mastercard':
            icon = require('../assets/master.png');
            break;
          case 'Visa':
            icon = require('../assets/visa.png');
            break;
          case 'Amex':
            icon = require('../assets/amex.png');
            break;
        }
        return (
          <TouchableOpacity
            key={method.cardId}
            onPress={switchMethod.bind(this, method.cardId)}
            style={styles.methodClicker}
          >
            <View
              style={[
                styles.method,
                props.selectedMethod == method.cardId
                  ? styles.selectedMethod
                  : null,
              ]}
            >
              <Image source={icon} style={styles.methodImage} />
              <H4 style={{ fontFamily: 'Poppins' }}> {method.cardName}</H4>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={switchMethod.bind(this, 'other')}
        style={styles.methodClicker}
      >
        <View
          style={[
            styles.method,
            props.selectedMethod == 'other' ? styles.selectedMethod : null,
          ]}
        >
          <Image
            source={require('../assets/othercard.png')}
            style={styles.methodImage}
          />
          <H4 style={{ fontFamily: 'Poppins' }}> Other method</H4>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  method: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedMethod: {
    backgroundColor: Theme.primaryShade,
  },
  methodImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  methodClicker: {
    width: '100%',
    alignItems: 'center',
  },
});
