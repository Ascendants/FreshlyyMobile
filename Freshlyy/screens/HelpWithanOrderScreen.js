import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H5 } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import OrderView from '../components/OrderView';

export default function ({navigation}){
  return (
    <SafeAreaView>
      <Header back={true}/>
      <H4 style={{textAlign: 'center', color: Theme.primary}}>Help With an Order</H4>
      <ScrollView>
        <View style={styles.container}>
          <OrderView />
          <P></P>
          <H4>Select the issue</H4>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Food Damaged')}>
            <View style={styles.barContainer}>
              <H5>Food damage or quality issue</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Order is Wrong')}>
            <View style={styles.barContainer}>
              <H5>Order is wrong</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Order Naver Arrived')}>
            <View style={styles.barContainer}>
              <H5>Order never arrived</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
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
})
