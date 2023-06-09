import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { H3, H4, H5 } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ENV from '../../constants/env';
import OrderView from '../../components/OrderView';
import Theme from '../../constants/theme';
import Loading from '../../components/Loading';
import FadeComponent from '../../components/FadeComponent';

function emptyOrders() {
  return (
    <View style={styles.noOrdersContent}>
      <H3>Dont have any orders!</H3>
    </View>
  );
}

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const userEmail = route.params.userEmail;

  async function getOrderList(refreshing) {
    refreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/get-orders/' + 'to-review', {
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
    navigation.navigate('Order Details Help Center', {
      userEmail: userEmail,
      orderId: order,
    });
    // console.log(order);
  }
  React.useEffect(() => {
    getOrderList(
      false,
      route.params.initialTab.replace(/\s+/g, '-').toLowerCase()
    );
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>
          Help With an Order
        </H4>
        <H5 style={{ textAlign: 'center', marginVertical: 10 }}>
          Select the Order
        </H5>
        <View style={styles.ordersContainer}>
          <FadeComponent>
            <FlatList
              style={styles.flatList}
              ListEmptyComponent={emptyOrders}
              data={orders}
              renderItem={(order) => (
                <OrderView
                  farmer={order.item.farmerName}
                  key={order.item.orderId}
                  orderId={order.item.orderId}
                  orderDate={order.item.orderPlaced}
                  cancelledDate={order.item.orderCancelled}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: '100%',
    paddingHorizontal: 20,
  },
  noOrdersContent: {
    // minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordersContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  flatList: {
    height: '100%',
  },
});
