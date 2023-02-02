import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { H3, H4, H5 } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';

export default function ({navigation}){
  return (
    <SafeAreaView>
      <Header back={true}/>
      <H3 style={{textAlign: 'center'}}>Help Center</H3>
      <ScrollView>
        <View style={styles.container}>
          <H4 style={{color: Theme.primary}}>FAQs</H4>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cant sign in')}>
            <View style={styles.barContainer}>
              <H5>Can't sign in</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Select order')}>
            <View style={styles.barContainer}>
              <H5>Help with an order</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.barContainer}>
              <H5>Delivery and pickup</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.barContainer}>
              <H5>Create coupon</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <H5 style={{margin: 10}}>Still Have Questions?</H5>
          <Image source={require('../assets/support-ticket.png')} style={styles.image}/>
          <View style={styles.bottomContainer}>
            <Button title='Contact Us' size='normal' color='filledPrimary' />
          </View>
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
  button: {
    backgroundColor: Theme.tertiaryShade,
    borderRadius: 10,
    padding: 8,
    marginVertical: 12,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },
  bottomContainer: {
    width: '40%',
    alignSelf: 'center'
  },
})