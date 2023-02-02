import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H7, H6, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  
  return(
    <ListItem>
      <View style={styles.container}>
        <H7>From Komuthu Fernando</H7>
        <H7>Order #63b6b7b160d78bea22456aa8</H7>
        <H7>Placed on 09.05.2022</H7>
        <H7>Paid on 09.05.2022</H7>
        <View style={styles.bottomContainer}>
          <H7 style={{color: Theme.primary}}>Delivered</H7>
          <View style={styles.bottomContainer}>
            <H6>Total: </H6><Pr>2550.00</Pr>
          </View>
        </View>
      </View>
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignself: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})