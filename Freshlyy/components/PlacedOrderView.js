import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  const order = props.order;
  return (
    <ListItem>
      <View style={styles.descContainer}>
        <H6>From {order.farmerName}</H6>
        <P
          style={{
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          Order: {order._id}
        </P>
        <P>
          Date: {new Date(order.orderUpdate.placed).toISOString().split('T')[0]}
        </P>
        <P>2 Items</P>
        <P>Sub Total: {order.totalPrice}</P>
        <P>Delivery: {order.totalDeliveryCharge}</P>
        <P style={{ color: Theme.secondary }}>
          {order.isDelivery ? 'Farmer will deliver' : 'You are picking up'}
        </P>
      </View>
      <View style={styles.actionContainer}>
        <H3>Total</H3>
        <Pr fontSize={30}>{order.totalDeliveryCharge + order.totalPrice}</Pr>
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
    borderRadius: 18,
  },
  descContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: '100%',
  },
  actionContainer: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignItems: 'flex-end',
    height: '100%',
  },
});
