import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H5, H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function (props) {
  const option = props.option;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.descContainer}>
          <H5 style={{ fontFamily: 'Poppins' }}>{option.farmer}</H5>
          <P>Sold by {option.farmer}</P>
          <View style={styles.detail}>
            <Pr>{option.upkm}</Pr>
            <P>/KM</P>
          </View>
          <Pr>{option.tprice}</Pr>
          <P style={{ color: Theme.secondary }}>
            {option.getItDelivered
              ? 'Farmer will deliver'
              : 'You are picking up'}
          </P>
        </View>
      </View>
      <View style={styles.actionContainer}>
        {option.getItDelivered ? (
          <Button size='normal' color='filledSecondary' title="I'll Pick Up" />
        ) : (
          <Button
            size='normal'
            color='filledPrimary'
            title='Get it delivered'
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 140,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Theme.textColor,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
