import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
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
          <StatusBall status='Payment' first={status.payment} done={true} />
          <StatusBall status='Processed' done={status.processed} />
          <StatusBall status='Shipped' done={status.shipped} />
          <StatusBall status='Delivered' done={status.delivered} />
          <StatusBall status='Reviewed' last={true} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.statusArea}>
          <StatusBall status='Payment' first={true} done={true} />
          <StatusBall status='Processed' done={true} />
          <StatusBall status='Ready' done={true} />
          <StatusBall status='Picked Up' done={true} />
          <StatusBall status='Reviewed' last={true} />
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

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//     padding: 20,
//   },
//   ballStatusArea: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
//   line: {
//     height: 2,
//     margin: 10,
//     width: '100%',
//     backgroundColor: Theme.textColor,
//   },
//   ballArea: {
//     position: 'absolute',
//     top: -14,
//     height: 30,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   ball: {
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 20,
//     borderRadius: 10,
//     backgroundColor: Theme.textColor,
//   },
//   filledBall: {
//     height: 28,
//     width: 28,
//     borderRadius: 15,
//     backgroundColor: Theme.primary,
//   },
//   textArea: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
// });
