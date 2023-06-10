import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { H3, Pr } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeComponent from '../../components/FadeComponent';
import ENV from '../../constants/env';
import TabMenu from '../../components/TabMenu';
import Loading from '../../components/Loading';
import OrderView from '../../components/OrderView';

function emptyOrders() {
  return (
    <View style={styles.noOrdersContent}>
      <Image
        source={require('../../assets/emptyOrders.png')}
        style={styles.messageImage}
      />
      <H3 style={styles.messageTitle}>No orders here!</H3>
    </View>
  );
}

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(route.params.initialTab);
  const [orders, setOrders] = React.useState([]);
  function changeTab(tab) {
    setActiveTab(tab);
    getOrderList(false, tab.replace(/\s+/g, '-').toLowerCase());
  }
  async function getOrderList(refreshing, type = 'all') {
    refreshing ? setRefreshing(true) : setLoaded(false);
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
        refreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  }
  function navigateToOrder(order) {
    navigation.navigate('Order Details', {
      orderId: order,
    });
  }
  React.useEffect(() => {
    getOrderList(
      false,
      route.params.initialTab.replace(/\s+/g, '-').toLowerCase()
    );
  }, [route]);
  return (
    <SafeAreaView style={styles.screen}>
      <Header back={true} home={true} />
      <H3 style={{ textAlign: 'center' }}>Orders</H3>
      <TabMenu
        tabs={[
          'All',
          'To Pay',
          'Processing',
          'Shipped',
          'To Pickup',
          'To Review',
          'Completed',
          'Cancelled',
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
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={emptyOrders}
              data={orders}
              refreshing={refreshing}
              onRefresh={() =>
                getOrderList(true, activeTab.replace(/\s+/g, '-').toLowerCase())
              }
              renderItem={(order) => (
                <OrderView
                  isConcerned={order.item.newOrder}
                  farmer={order.item.farmerName}
                  key={order.item.orderId}
                  orderId={order.item.orderId}
                  orderDate={order.item.orderPlaced}
                  cancelledDate={order.item.orderCancelled}
                  paidDate={order.item.orderPaid}
                  status={order.item.status}
                  total={order.item.orderTotal}
                  viewOrder={navigateToOrder}
                  style={styles.concernedOrder}
                />
              )}
              keyExtractor={(order) => order.orderId}
            />
          </FadeComponent>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  concernedOrder: {
    backgroundColor: 'red',
  },
  ordersContainer: {
    marginVertical: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  noOrdersContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  messageImage: {
    height: 200,
    resizeMode: 'contain',
    marginVertical: 50,
  },
  messageTitle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingBottom: 50,
  },
});
