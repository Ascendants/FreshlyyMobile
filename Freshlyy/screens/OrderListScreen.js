import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { TextInputBox } from '../components/Inputs';
import CardView from '../components/CardView';

import { Formik } from 'formik';
import { Button } from '../components/Buttons';
import ModalComponent from '../components/ModalComponent';
import ENV from '../constants/env';
import TabMenu from '../components/TabMenu';
import OrderView from '../components/OrderView';
import { set } from 'react-native-reanimated';
export default function ({ navigation, route }) {
  const [activeTab, setActiveTab] = React.useState(route.params.initialTab);
  const [orders, setOrders] = React.useState([]);
  function changeTab(tab) {
    setActiveTab(tab);
    getOrderList(tab.replace(/\s+/g, '-').toLowerCase());
  }
  async function getOrderList(type = 'all') {
    fetch(ENV.backend + '/customer/get-orders/' + type, {
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
        setOrders(res.orders);
      })
      .catch((err) => console.log(err));
  }
  function navigateToOrder(order) {
    navigation.navigate('Order Details', {
      orderId: order,
    });
  }
  React.useEffect(() => {
    getOrderList(route.params.initialTab);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2>Orders</H2>
        <TabMenu
          tabs={[
            'All',
            'To Pay',
            'Processing',
            'Shipped',
            'To Pickup',
            'To Review',
            'Completed',
          ]}
          active={activeTab}
          onPress={changeTab}
        />
        <View style={styles.ordersContainer}>
          <FlatList
            data={orders}
            renderItem={(order) => (
              <OrderView
                farmer={order.item.farmerName}
                key={order.item.orderId}
                orderId={order.item.orderId}
                orderDate={order.item.orderPlaced}
                paidDate={order.item.orderPaid}
                status={order.item.status}
                total={order.item.orderTotal}
                viewOrder={navigateToOrder}
              />
            )}
            keyExtractor={(order) => order.orderId}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  ordersContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
});
