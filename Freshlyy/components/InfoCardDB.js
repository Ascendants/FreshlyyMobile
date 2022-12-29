import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { P, Pr, H1, H4 } from './Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';

export default function () {
  return (
    <View style={styles.card}>
      <View style={styles.cardLayout}>
        <View style={styles.cardLeft}>
          <P style={styles.name}>Komuthu Fernando</P>
          <H4 style={styles.subTopic}>Total Earnings</H4>
          <H1>
            <Pr style={styles.mainTopic} fontSize={40}>
              10 000
            </Pr>
          </H1>
        </View>
        <View style={styles.cardRight}>
          <Image source={require('../assets/kom.jpg')} style={styles.image} />
          <Button title='More Info' size='normal' color='filledPrimary' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: Theme.primaryShadeLighter,
    width: '90%',
    height: 150,
    borderRadius: 30,
    padding: 5,
  },
  cardLayout: {
    flexDirection: 'row',
    padding: 20,
    flex: 1,
  },
  cardRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    color: Theme.primary,
    marginBottom: 10,
  },
  subTopic: {
    alignContent: 'flex-start',
    fontWeight: '500',
  },
  mainTopic: {
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: Theme.primary,
    padding: 5,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
