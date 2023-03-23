import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { H4, H6, Pr } from '../components/Texts';
import Theme from '../constants/theme';
import OrderView from '../components/OrderView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function ({navigation}) {
  return(
    <SafeAreaView>
      <Header back={true}/>
      <H4 style={{textAlign: 'center', color: Theme.primary}}>Help With an Order</H4>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Help with an order')}><OrderView /></TouchableOpacity>
          <OrderView />
          <OrderView />
        </View>
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

})