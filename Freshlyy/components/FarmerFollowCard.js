import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';

export default function (props) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          source={{ uri: props.imageUrl?.imageUrl }}
          style={styles.farmerimage}
        />
        <Text style={styles.farmername}>{props.farmerName}</Text>
        <Button
          title='Following'
          color='shadedPrimary'
          size='normal'
          style={styles.followbutton}
          onPress={props.onDelete}
        />
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
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingLeft:20,
    backgroundColor: Theme.overlay,
    width: 340,
    height: 60,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  farmerimage: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  farmername: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  followbutton: {
    borderLeft: 20,
  },
});
