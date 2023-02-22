import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H7, H6, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  let statusElement;
  let button;
  switch (props.status) {
    case 'to-pay':
      statusElement = <H7 style={{ color: Theme.danger }}>Awaiting Payment</H7>;
      break;
    case 'processing':
      statusElement = <H7 style={{ color: Theme.secondary }}>Processing</H7>;
      button = <Button color='shadedDanger' size='normal' title='Cancel' />;
      break;
    case 'shipped':
      statusElement = <H7 style={{ color: Theme.primary }}>Shipped</H7>;
      break;
    case 'to-pickup':
      statusElement = <H7 style={{ color: Theme.primary }}>Ready to Pickup</H7>;
      button = (
        <Button color='shadedWarning' size='normal' title='Confirm Pickup' />
      );
      break;
    case 'to-review':
      statusElement = (
        <H7 style={{ color: Theme.secondary }}>Awaiting Review</H7>
      );
      button = <Button color='shadedTertiary' size='normal' title='Review' />;
      break;
    case 'completed':
      statusElement = <H7 style={{ color: Theme.primary }}>Completed</H7>;
      break;
  }
  return (
    <TouchableOpacity onPress={() => props.viewOrder(props.orderId)}>
      <ListItem>
        <View style={styles.container}>
          <H7>From {props.farmer}</H7>
          <H7>Order #{props.orderId}</H7>
          <H7>Placed on {props.orderDate}</H7>
          {props.paidDate ? <H7>Paid on {props.paidDate}</H7> : null}
          <View style={styles.bottomContainer}>
            {statusElement}
            <View style={styles.bottomContainer}>
              <H6>Total: </H6>
              <Pr>{parseFloat(props.total).toFixed(2)}</Pr>
            </View>
          </View>
          <View style={styles.action}>{button}</View>
        </View>
      </ListItem>
    </TouchableOpacity>
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
  action: {
    alignItems: 'flex-end',
  },
});
