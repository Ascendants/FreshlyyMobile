import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { H1, H8, H3, H4, P, Pr } from '../components/Texts';
import { Entypo } from '@expo/vector-icons';
import Theme from '../constants/theme';
import StatusBall from './StatusBall';
export default function (props) {
  const status = {
    Pending: false,
    Progress: false,
    Complete: false,
  }
  switch (props.status) {
    case 'Pending':
      status.Pending = true;
      break;
    case 'Progress':
      status.Progress = true;
      status.Pending = true;
      break;
    case 'Complete':
      status.Complete = true;
      status.Progress = true;
      status.Pending = true;
      break;
  }
    return (
      <View style={styles.container}>
        <View style={styles.statusArea}>
          <StatusBall status='Pending' first={true} done={status?.Pending} />
          <StatusBall status='In Progress' done={status?.Progress} />
          <StatusBall status='Complete' last={true} done={status?.Complete} />
        </View>
      </View>
    );
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
