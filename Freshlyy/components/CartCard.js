import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { H2, H3, H5, H6, Pr } from './Texts';
import Theme from '../constants/theme';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ModalComponent from './ModalComponent';

export default function (props) {
  return (
    <View style={styles.container}>
      <View styles={styles.image}>
        <Image source={props.imgUrl.imageUrl} style={styles.image} />
      </View>
      <View style={styles.middle}>
        <H5>{props.title}</H5>
        <H6>Sold by {props.seller}</H6>
        <H6>{props.quantity} KG</H6>
        <Pr>{props.amt}</Pr>
      </View>
      <View style={[styles.right, styles.rightBackgroundColor1]}>
        {/* <TouchableOpacity style={styles.icon}>
          <Ionicons
            name='ios-pencil'
            size={24}
            color={Theme.contrastTextColor}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.right, styles.rightBackgroundColor2]}>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name='delete' size={24} color={Theme.contrastTextColor} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    borderBottomColor: Theme.tertiary,
    borderBottomWidth: 1,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  rightBackgroundColor1: {
    backgroundColor: Theme.blue,
  },
  rightBackgroundColor2: {
    backgroundColor: Theme.danger,
  },
  image: {
    marginBottom: 5,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  icon: {
    padding: 10,
  },
});
