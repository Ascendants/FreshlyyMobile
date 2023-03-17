import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text,} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { H3, H4, H5, P } from '../components/Texts';
import { TextInputBox, } from '../components/Inputs';
import { launchImageLibrary } from "react-native-image-picker";
import { Ionicons } from '@expo/vector-icons';

export default function (){

  // handleChoosePhoto = () => {
  //   const options = {};
  //   launchImageLibrary({mediaType:'photo',cameraType:'front'},(res)=>{ console.log('my result is',res) })
  // };

  return(
    <SafeAreaView>
      <Header back={true}/>
      <H4 style={{textAlign: 'center', color: Theme.primary}}>Help With an Order</H4>
      <H5 style={{textAlign: 'center', marginVertical: 10}}>Food damage or quality issue</H5>
      <ScrollView style={styles.container}>
            <P>If you were not happy with the quality of your food, please give the restaurant direct feedback by rating them on the Freshlyy app. You can do so by tapping "All Orders" at the dashboard of your app, then tapping "Review" next to the total amount.</P>
            <P></P>
            <P>Please leave a review if:</P>
            <P>- The portion size was smaller than expected</P>
            <P>- You were unhappy with the taste or preparation of the food</P>
            <P>- The food was too hot or too cold</P>
            <P></P>
            <P>Your reviews are an important way for Freshlyy toensure that we partner with only the highest quality farmers.</P>
            <P>If you have other issues with the food quality or if you received a damaged order, please share a few details about what was wrong so our team can help. A photo of the affected item is also required in order to review your concern.</P>
            <P></P>
            <P>Once you've submitted your information we'll assess whether you're eligible for a refund.</P>
          <TextInputBox
            inputlabel='Name(s) of item(s) affected'
          />
          <Text style={styles.inputLabel}>Screenshot of the error message while you are trying to sign in</Text>
            {/* <TouchableOpacity onPress={this.handleChoosePhoto}>
              <View style={styles.inputImgBox}>
                <Ionicons name="image" size={22} color={Theme.tertiary} />
                <H8 style={{color: Theme.tertiary}}>Select file</H8>
              </View>
            </TouchableOpacity> */}
          <TextInputBox
            inputlabel='Share details'
          />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: "100%",
    paddingHorizontal: 20,
  },
  inputLabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },

})