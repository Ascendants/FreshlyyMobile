import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  const option = props.option;
  return (
    <ListItem>
      <View style={styles.descContainer}>
        <H6 style={{ fontFamily: 'Poppins' }}>{option.farmerName}</H6>
        <H6>{option.distance} KM</H6>
        <Text>
          <Pr>{option.costPerKM}</Pr>
          <P>/KM</P>
        </Text>
        <Pr>{(option.costPerKM * option.distance).toFixed(2)}</Pr>
        <P style={{ color: Theme.secondary }}>
          {props.delivery ? 'Farmer will deliver' : 'You are picking up'}
        </P>
      </View>
      <View style={styles.actionContainer}>
        {!props.ordered &&
          (props.delivery ? (
            <Button
              size='normal'
              color='filledSecondary'
              title="I'll Pick Up"
              onPress={props.setDelivery?.bind(this, false)}
            />
          ) : (
            <Button
              size='normal'
              color='filledPrimary'
              title='Get it delivered'
              onPress={props.setDelivery?.bind(this, true)}
            />
          ))}
      </View>
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
