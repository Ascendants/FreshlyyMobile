import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { H5, H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={styles.methodClicker}>
        <View style={styles.method}>
          <Image
            source={
              props.method == 'Card Payment'
                ? require('../assets/card.png')
                : require('../assets/money.png')
            }
            style={styles.methodImage}
          />
          <H4 style={{ fontFamily: 'Poppins' }}> {props.method}</H4>
        </View>
      </View>
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
