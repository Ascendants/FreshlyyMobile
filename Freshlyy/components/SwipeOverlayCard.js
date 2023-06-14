import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H4, H5, H6, Pr } from '../components/Texts';
import { MaterialIcons } from '@expo/vector-icons';
import Theme from '../constants/theme';

export default function (props) {
  const firstImageUrl = props.imageUri && props.imageUri.length > 0 ? props.imageUri[0].imageUrl : null;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={{uri: firstImageUrl}} style={styles.image} />
      </View>
      <View style={styles.right}>
        <H5>{props.name}</H5>
        <H6>{props.quantity} {props.unit}</H6>
        <Pr>{props.price}</Pr>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    margin: 10,
    backgroundColor: Theme.overlayShade,
  },
  left: {
    justifyContent: 'center',
  },
  right: {
    margin: 10,
  },
});
