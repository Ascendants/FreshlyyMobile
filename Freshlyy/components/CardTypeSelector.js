import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H5, H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function (props) {
  const types = ['Visa', 'Master', 'Amex'];
  function switchMethod(method) {
    props.clearCvv();
    props.setSelectedPayment(method);
  }
  return (
    <View style={styles.container}>
      <View style={styles.methodClicker}>
        <View
          style={[
            styles.method,
            props.selectedType == 'Visa' ? styles.selectedMethod : null,
          ]}
        >
          <Image
            source={require('../assets/visa.png')}
            style={styles.methodImage}
          />
        </View>
      </View>
      <View style={styles.methodClicker}>
        <View
          style={[
            styles.method,
            props.selectedType == 'Master' ? styles.selectedMethod : null,
          ]}
        >
          <Image
            source={require('../assets/master.png')}
            style={styles.methodImage}
          />
        </View>
      </View>
      <View style={styles.methodClicker}>
        <View
          style={[
            styles.method,
            props.selectedType == 'Amex' ? styles.selectedMethod : null,
          ]}
        >
          <Image
            source={require('../assets/amex.png')}
            style={styles.methodImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 20,
  },
  method: {
    borderRadius: 15,
  },
  selectedMethod: {
    backgroundColor: Theme.primaryShade,
  },
  methodImage: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  methodClicker: {
    width: '100%',
    alignItems: 'center',
  },
});
