import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { P, Pr, H6 } from '../components/Texts';
import { TextInputBox } from '../components/Inputs';
import Theme from '../constants/theme';
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
      </View>
      <View style={styles.cardinner2}>
        <Rating value={props.overallRating} />
        <View style={styles.cardinner3}>
          <TextInputBox
            inputlabel='Your Review'
            placeholder=''
            value={props.review}
            onChangeText={(text) => setReview(text)}
            style={styles.reviewText}
            onBlur={() => {
              console.log('');
            }}
            onFocus={() => {
              console.log('');
            }}
          ></TextInputBox>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    fontFamily: 'Poppins',
    backgroundColor: Theme.overlay,
    height: 300,
    marginBottom: 10,
    borderRadius: 20,
  },
  card: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingLeft:20,
    //backgroundColor:Theme.overlay,
    width: '90%',
    //height: ,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  reviewText: {
    height: 120,
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
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  cardinner2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 2,
  },
  cardinner3: {
    width: '80%',
    height: '20%',
  },
});
