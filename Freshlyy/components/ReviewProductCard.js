import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { P, Pr, H6 } from '../components/Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import Rating from '../components/Rating';

export default function (props) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          source={{ uri: props.imageUrl?.imageUrl }}
          style={styles.productimage}
        />
        <View style={styles.cardinner}>
          <H6 style={styles.productname}>{props.title}</H6>
          <P style={styles.productWeight}>{props.qty} KG</P>
          <Pr style={styles.productprice}> {props.uPrice}</Pr>
        </View>
        <View style={styles.cardinner2}>
          <Button
            title='Rate'
            color='shadedSecondary'
            size='small'
            style={styles.ratebutton}
          />
          <Rating style={styles.rating} value={props.overallRating} />
        </View>
      </View>
      <View style={styles.lineStyle}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    fontFamily: 'Poppins',
  },
  card: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingLeft:20,
    //backgroundColor:Theme.overlay,
    width: '90%',
    height: 80,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  productimage: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  cardinner: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
  },
  productname: {
    position: 'relative',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  productWeight: {
    position: 'relative',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  productprice: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  cardinner2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
  },
  rating: {},
  ratebutton: {
    border: 20,
    width: '50%',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
  },
});
