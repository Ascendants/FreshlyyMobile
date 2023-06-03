import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { H7, H6, Pr } from '../components/Texts';
import ListItem from './ListItem';

export default function (props) {
  return (
    <TouchableOpacity onPress={() => null}>
      <ListItem>
        <View style={styles.container}>
          <H7>Order #{props.orderId}</H7>
          <H7>Placed on {props.orderDate}</H7>
          <H7>{props.orderNItems} items</H7>
          <H7>
            Sub Total: <Pr fontSize={12}>{props.orderSubTotal}</Pr>
          </H7>
          <H7>
            Delivery Charge: <Pr fontSize={12}>{props.orderDeliveryCharge}</Pr>
          </H7>
          <H7>
            Commission Charge: <Pr fontSize={12}>{props.orderCommission}</Pr>
          </H7>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomContainer}>
              <H6>Total: </H6>
              <Pr>{parseFloat(props.orderTotal).toFixed(2)}</Pr>
            </View>
          </View>
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
