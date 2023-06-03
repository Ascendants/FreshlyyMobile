import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import ListItem from './ListItem';
import { Octicons } from '@expo/vector-icons';

export default function (props) {
  const notification = props.notification;
  return (
    <ListItem>
      <View style={styles.descContainer}>
        <H6>{notification?.title}</H6>
        <P>{notification?.body}</P>
      </View>
      {!notification.read && (
        <View style={styles.actionContainer}>
          <Octicons name='dot-fill' size={24} color={Theme.primary} />
        </View>
      )}
    </ListItem>
  );
}

const styles = StyleSheet.create({
  descContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: '100%',
  },
  actionContainer: {
    paddingHorizontal: 20,
  },
});
