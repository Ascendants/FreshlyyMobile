import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { H7, H6, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  let statusElement;
  let button;
  return (
    <ListItem>
      <View style={styles.container}>
        <H7>#{props.request?.id}</H7>
        <Pr fontSize={20}>{props.request?.amount}</Pr>
        <H7>Deposit to:</H7>
        <H7>{props.request?.bank}</H7>
        <H7>{props.request?.bankAccountName}</H7>
        <H7>{props.request?.bankAccountNum}</H7>
        <H7></H7>
        <H6>Requested on {props.request?.created}</H6>
        {props.request?.acknowledged ? (
          <H7 style={{ color: Theme.secondary }}>
            Acknowledged on {props.request?.acknowledged}
          </H7>
        ) : null}
        {props.request?.cleared ? (
          <>
            <H7 style={{ color: Theme.primary }}>
              Cleared on {props.request?.cleared}
            </H7>
            <H7 style={{ color: Theme.primary }}>
              Payment Reference: {props.request?.payRef}
            </H7>
          </>
        ) : null}
        {props.request?.rejected ? (
          <>
            <H6 style={{ color: Theme.danger }}>
              Rejected on {props.request?.acknowledged}
            </H6>
            <H7>Rejection Reason: {props.request?.rejectionReason}</H7>
          </>
        ) : null}
        <View style={styles.bottomContainer}>{statusElement}</View>
        <View style={styles.action}>
          <Button title='Get Support' size='normal' color='shadedWarning' />
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
  action: {
    alignItems: 'flex-end',
  },
});
