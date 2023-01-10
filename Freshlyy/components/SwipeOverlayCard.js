import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {H4, H5, H6} from '../components/Texts';
import { MaterialIcons } from '@expo/vector-icons';
import Theme from "../constants/theme";

export default function(props) {
  return(
      <View style={styles.container}>
          <Image source={props.imgUrl} style={styles.image}/>
          {/* <MaterialIcons name="horizontal-rule" size={24} color="black" /> */}
          <View style={styles.left}>
            <H5>{props.topic}</H5>
            <H6>{props.subTopic}</H6>
          </View>
    </View>
    
)}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    paddingLeft: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  left: {
    margin: 10,
  },
})