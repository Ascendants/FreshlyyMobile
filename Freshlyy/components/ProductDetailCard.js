import { contains } from '@firebase/util';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2, P,Pr} from './Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from './Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Rating from './Rating';

export default function (props) {
  


  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          source={{ uri: props.imageUrl?.imageUrl }}
          style={styles.cardimage}
        />
        <Text style={styles.productname}>{props.title}</Text>
        <View style={styles.rating}>
          <Rating value={props.overallRating}>
          <P>({props.overallRating})</P>
          </Rating>
        </View>
        <Pr>
          {props.price}/{props.unit}
        </Pr>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    fontFamily: 'Poppins',
  },
  card: {
    width: 155,
    height: 220,
    backgroundColor: Theme.overlay,
    borderRadius: 20,
    margin: 10,
    boxShadow: '100px 100px 17px -12px rgba(0,3,0,0.75)',
  },
  cardimage: {
    width: 125,
    height: 120,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  productname: {
    position: 'relative',
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  rating: {
    marginLeft: 20,
  },
});
