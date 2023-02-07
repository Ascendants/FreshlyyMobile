import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  const product = props.product;
  return (
    <ListItem>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
      </View>
      <View style={styles.descContainer}>
        <H6 style={{ fontFamily: 'Poppins' }}>{product.title}</H6>
        <P>{product.qty} KG</P>
        <Pr>{product.uPrice * product.qty}</Pr>
      </View>
      <View style={styles.actionContainer}></View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});
