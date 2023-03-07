import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H5 } from '../components/Texts';
import { Button } from '../components/Buttons';

export default function ({navigation}){
  
  return(
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true}/>
        <H4 style={{textAlign: 'center', color: Theme.primary}}>Help With an Order</H4>
        <H5 style={{textAlign: 'center', marginVertical: 10}}>Order is wrong</H5>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <P>If you receive an Uber Eats order that's not quite right, don't worry. Here are the steps you can take:</P>
          <P>- If you're certain that your order is incorrect, use the Uber Eats app to report the issue. Simply go to your order history, select the relevant order, and tap "Help" to report the issue.</P>
          <P>- Check your doorstep as the delivery partner may have left it there.</P>    
          <P>- Follow the prompts to explain what's wrong with your order. Be as specific as possible to help us understand what went wrong.</P>
          <P>- Our customer support team will review your report and reach out to you as soon as possible to resolve the issue.</P>
          <P></P>
          <P>In the meantime, we recommend that you hold onto the incorrect items in case we need to verify the issue. We apologize for any inconvenience and thank you for your patience as we work to make things right.</P>
          <View style={{ width: '50%', alignSelf: 'center', marginTop:30 }}>
                  <Button
                    size='normal'
                    color='shadedSecondary'
                    title='submit a ticket'
                  />
                </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: "100%",
    paddingHorizontal: 20,
  },

})
