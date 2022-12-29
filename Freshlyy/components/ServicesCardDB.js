import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {H5, H6, H7} from '../components/Texts';
import Theme from "../constants/theme";

export default function() {
  return(
    <View style={styles.container}>
      <H5 style={styles.topic}>My Services</H5>
      <View style={styles.notify}><H6 style={styles.notifyNumber}>20</H6></View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/message.png')} style={styles.logo}/>
          <H7>Messages</H7>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/question.png')} style={styles.logo}/>
          <H7>Help Center</H7>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/customer-support.png')} style={styles.logo}/>
          <H7>Support Ticket</H7>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/documents.png')} style={styles.logo}/>
          <H7>Reviews</H7>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Theme.primaryShadeLighter,
    width: '90%',
    height: 160,
    borderRadius: 30
  },
  topic: {
    margin: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  notify: {
    position: 'absolute',
    top: '35%',
    left: '22%',
    backgroundColor: Theme.primary,
    // padding: 5,
    minHeight: 20,
    minWidth: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyNumber: {
    color: 'white',
  }
})