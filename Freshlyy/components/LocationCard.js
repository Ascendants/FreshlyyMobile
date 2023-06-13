import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H5 } from '../components/Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import ListItem from './ListItem';

export default function (props) {
  return (
    <ListItem>
      <View style={styles.imageContainer}>
        <Button
          icon={<Ionicons name='location' size={40} color={Theme.primary} />}
          type='icon'
          size='small'
        />
      </View>
      <View style={styles.descContainer}>
        <H5>{props.locationName}</H5>
      </View>

      <View style={styles.actionContainer}>
        <Button
          icon={
            <MaterialCommunityIcons
              name='target'
              size={25}
              color={props.selected ? Theme.textColor : Theme.primary}
            />
          }
          type='icon'
          size='small'
          color={props.selected ? 'filledWarning' : 'shadedPrimary'}
          title={props.selected ? 'Selected' : 'Select'}
          disabled={props.selected}
          style={styles.icon}
          onPress={props.selectLocation}
        />
        <Button
          icon={
            <Ionicons name='trash-outline' size={25} color={Theme.danger} />
          }
          type='icon'
          size='small'
          color='shadedDanger'
          title='Delete'
          style={styles.icon}
          onPress={props.onDelete}
        />
      </View>
    </ListItem>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    //justifyContent:'space-between',
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 20,
  },
  icon: {
    justifyContent: 'center',
    marginRight: 0,
    marginLeft: 0,
  },
  imageContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 18,
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
  qtyArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
