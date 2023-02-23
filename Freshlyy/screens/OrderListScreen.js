import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { H3, Pr } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import FadeComponent from '../components/FadeComponent';
import ENV from '../constants/env';
import TabMenu from '../components/TabMenu';
import Loading from '../components/Loading';
import OrderView from '../components/OrderView';

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(route.params.initialTab);
  const [orders, setOrders] = React.useState([]);
  function changeTab(tab) {
    setActiveTab(tab);
    getOrderList(tab.replace(/\s+/g, '-').toLowerCase());
  }
  async function getOrderList(type = 'all') {
    setLoaded(false);
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
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }
  function navigateToOrder(order) {
    navigation.navigate('Order Details', {
      orderId: order,
    });
  }
  React.useEffect(() => {
    getOrderList(route.params.initialTab.replace(/\s+/g, '-').toLowerCase());
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H3>Orders</H3>
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
        {!loaded ? (
          <Loading />
        ) : (
          <View style={styles.ordersContainer}>
            <FadeComponent>
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
            </FadeComponent>
          </View>
        )}
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
