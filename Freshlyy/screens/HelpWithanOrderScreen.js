import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H5, H6, H7, Pr } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import ENV from "../constants/env";

export default function ({navigation, route}){
  const [order, setOrder] = React.useState({});
  const orderId = route.params.orderId;
  // console.log(orderId);

  React.useEffect(() => {
    // console.log(orderId);
    fetch(ENV.backend + '/customer/getSpecificOrder/' + orderId , {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.message != 'Success') {
        throw new Error('Malformed Response');
      }
      const data = res.order;
      // console.log(data);
      setOrder(data);
    })
    .catch((err) => console.log(err));
  }, []);      

  // console.log(order.orderUpdate.placed);
  const orderUpdate = order.orderUpdate;
  const totalPrice = order.totalPrice + order.totalDeliveryCharge;
  console.log(orderUpdate.placed);
  return (
    <SafeAreaView>
      <Header back={true}/>
      <H4 style={{textAlign: 'center', color: Theme.primary}}>Help With an Order</H4>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.orderView}>
            <H7>From: {order.farmerName}</H7>
            <H7>Order: #{order._id}</H7>
            <H7>Placed on: {orderUpdate.placed}</H7>
            <View style={styles.bottomContainer}>
              <H6>Total: </H6>
              <Pr>{parseFloat(totalPrice).toFixed(2)}</Pr>
            </View>
          </View>
          <P></P>
          <H4>Select the issue</H4>
          <TouchableOpacity style={styles.button} onPress={function(order){ navigation.navigate('Food Damaged'), {orderId:order}}}>
            <View style={styles.barContainer}>
              <H5>Food damage or quality issue</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={function(order){ navigation.navigate('Order is Wrong'), {orderId:order}}}>
            <View style={styles.barContainer}>
              <H5>Order is wrong</H5>
              <AntDesign name="right" size={24} color={Theme.textColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={function(order){ navigation.navigate('Order Naver Arrived'), {orderId:order}}}>
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
  bottomContainer: {
    flexDirection: 'row',
  },
  orderView: {
    borderBottomWidth: 1,
  }
})
