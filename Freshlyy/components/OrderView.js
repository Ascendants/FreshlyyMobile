import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H7, H6, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  return (
    <ListItem>
      <View style={styles.container}>
        <H7>From {props.farmer}</H7>
        <H7>Order #{props.orderId}</H7>
        <H7>Placed on {props.orderDate}</H7>
        <H7>Paid on {props.paidDate}</H7>
        <View style={styles.bottomContainer}>
          <H7 style={{ color: Theme.primary }}>{props.status}</H7>
          <View style={styles.bottomContainer}>
            <H6>Total: </H6>
            <Pr>{parseFloat(props.total).toFixed(2)}</Pr>
          </View>
        </View>
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignself: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
