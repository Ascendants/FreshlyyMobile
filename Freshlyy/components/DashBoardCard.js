import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {H5, H6} from "../components/Texts";
import Theme from "../constants/theme";

export default function(props) {
  return (
    <View style={styles.container}>
      <Image source={props.imageUri} style={styles.icon}/>
      <H5 style={styles.number}>{props.number}</H5>
      <H6>{props.text}</H6>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Theme.overlay,
    width: '30%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: Theme.primary,
  },
  number: {
    color:Theme.secondary,
    paddingTop:4,
    fontWeight: 'bold',
  },
})