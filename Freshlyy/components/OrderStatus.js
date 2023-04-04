import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { H1, H8, H3, H4, P, Pr } from '../components/Texts';
import { Entypo } from '@expo/vector-icons';
import Theme from '../constants/theme';
import StatusBall from './StatusBall';
export default function (props) {
  const status = props.status;
  if (status?.cancelled) {
    return (
      <View style={styles.container}>
        <H3>Order was Cancelled.</H3>
      </View>
    );
  }
  if (props.isDelivery) {
    return (
      <View style={styles.container}>
        <View style={styles.statusArea}>
          <StatusBall status='Payment' first={true} done={status?.payment} />
          <StatusBall status='Processed' done={status?.processed} />
          <StatusBall status='Shipped' done={status?.shipped} />
          <StatusBall status='Delivered' done={status?.delivered} />
          <StatusBall status='Reviewed' last={true} done={props.reviewed} />
        </View>
      </View>
    );
  } else if (props.isTicket) {
    return (
      <View style={styles.container}>
        <View style={styles.statusArea}>
          <StatusBall status='Pending' first={true} done={status?.payment} />
          <StatusBall status='Processing' done={status?.processed} />
          <StatusBall status='Complete' done={status?.pickedUp} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.statusArea}>
          <StatusBall status='Payment' first={true} done={status?.payment} />
          <StatusBall status='Processed' done={status?.processed} />
          <StatusBall status='Picked Up' done={status?.pickedUp} />
          <StatusBall status='Reviewed' last={true} done={props.reviewed} />
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  statusArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};
