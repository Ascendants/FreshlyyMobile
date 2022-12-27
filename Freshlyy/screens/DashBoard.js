import React from "react";
import { StyleSheet, View } from "react-native";
import { H1, P } from '../components/Texts';
import Navbar from "../components/Navbar";

export default function (){
    return(
        <View style={styles.screen}>
            <H1>Hello</H1>
            <Navbar />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins',
    },
  });