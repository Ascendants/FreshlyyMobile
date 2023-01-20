import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { P, Pr, H2, H4 } from './Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';

export default function (props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLayout}>
        <View>
          <P style={styles.name}>
            {props.user.fname} {props.user.lname}
          </P>
          <H4 style={styles.subTopic}>Total Earnings</H4>
          <H2>
            <Pr style={styles.mainTopic} fontSize={40}>
              10 000
            </Pr>
          </H2>
        </View>
        <View style={styles.cardRight}>
          <Image
            source={{ uri: props.user.profilePicUrl }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.buttonsLayout}>
        <Button title='More Info' size='normal' color='filledPrimary' />
        <Button title='Edit Profile' size='normal' color='filledSecondary' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: Theme.primaryShadeLighter,
    width: '90%',
    borderRadius: 30,
    padding: 5,
    marginBottom: 30,
  },
  cardLayout: {
    flexDirection: 'row',
    padding: 15,
    flex: 1,
  },
  cardRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    color: Theme.primary,
  },
  subTopic: {
    alignContent: 'flex-start',
    fontWeight: '500',
  },
  mainTopic: {
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  buttonsLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
