import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import {H4} from '../components/Texts';
import Theme from "../constants/theme";
import SwipeOverlayCard from "./SwipeOverlayCard";
import { AntDesign } from '@expo/vector-icons';
// import { BlurView } from "@react-native-community/blur";


export default function() {
  return(
      <View style={styles.container}>
        {/* <BlurView blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white"> */}
        <View style={styles.top}>
          <AntDesign name="down" size={24} color={Theme.textColor} />
        </View>
        <H4 style={styles.topic}>Selling Products</H4>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SwipeOverlayCard 
            imgUrl={require('../assets/carrot.jpg')}
            topic='Sri Lankan Carrots'
            subTopic='10 KG'
          />
          <SwipeOverlayCard 
            imgUrl={require('../assets/carrot.jpg')}
            topic='Ordinary Mango'
            subTopic='20 KG'
          />
          <SwipeOverlayCard 
            imgUrl={require('../assets/carrot.jpg')}
            topic='Green Beens'
            subTopic='5 KG'
          />      
          <SwipeOverlayCard 
            imgUrl={require('../assets/carrot.jpg')}
            topic='Sri Lankan Eggplant'
            subTopic='2 KG'
          />  
          <SwipeOverlayCard 
            imgUrl={require('../assets/carrot.jpg')}
            topic='Sri Lankan Eggplant'
            subTopic='2 KG'
          />   
        </ScrollView>
       {/* </BlurView> */}
      </View>
      
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: "100%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignSelf: 'center',
  },
  top: {
    alignSelf: 'center',
    margin: 10,
  },
  topic: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
})