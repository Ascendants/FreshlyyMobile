import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr, H7, H6, H4, P } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';

import OrderStatus from '../components/OrderStatus';
import { Button } from '../components/Buttons';
import ProductView from '../components/ProductView';
import DeliveryView from '../components/DeliveryView';
import ENV from '../constants/env';

export default function ({ navigation, route }) {
  const [order, setOrder] = React.useState({});
  React.useEffect(() => {
    const orderId = route.params.orderId;
    fetch(ENV.backend + '/customer/get-order/' + orderId, {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Order not found');
        }
        setOrder((prev) => {
          return { ...prev, ...res.order };
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2>Order</H2>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo}>#{order._id}</H7>
            <H6 style={styles.orderInfoFarmer}>From {order.farmerName}</H6>
            <OrderStatus
              status={order.orderUpdate}
              isDelivery={order.isDelivery}
              reviewed={order.farmerRating != -1}
            />
            {!order?.orderUpdate?.payment && (
              <Button title='Pay Now' size='big' color='shadedSecondary' />
            )}
            <View style={styles.pageArea}>
              {order.items?.map((item) => (
                <ProductView ordered={true} key={item.itemId} product={item} />
              ))}
            </View>
          </View>
          {order.isDelivery && (
            <>
              <View style={styles.pageArea}>
                <H3>Sub Total</H3>
                <Pr fontSize={30}>{parseFloat(order.totalPrice).toFixed(2)}</Pr>
              </View>
              <View style={styles.pageArea}>
                <H4 style={styles.title}>Delivery Cost</H4>
                <DeliveryView
                  option={{
                    distance: order.deliveryDistance,
                    costPerKM: order.deliveryCostPerKM,
                  }}
                  delivery={order.isDelivery}
                  ordered={true}
                />
              </View>
            </>
          )}
          {order.coupon && (
            <>
              <View style={styles.pageArea}>
                <H3>Total</H3>
                <Pr fontSize={30}>
                  {parseFloat(
                    order.totalPrice + order.totalDeliveryCharge
                  ).toFixed(2)}
                </Pr>
              </View>

              <View style={styles.pageArea}>
                <H3>Applied Code: DIS1000</H3>
              </View>
            </>
          )}
          <View style={styles.pageArea}>
            <H3>Net Total</H3>
            <Pr fontSize={30}>
              {parseFloat(order.totalPrice + order.totalDeliveryCharge).toFixed(
                2
              )}
            </Pr>
          </View>
          <View style={styles.buttonArea}>
            <Button title='Get Support' color='shadedWarning' size='big' />
            {(order?.orderUpdate?.delivered ||
              order?.orderUpdate?.pickedUp) && (
              <Button title='Review' color='shadedSecondary' size='big' />
            )}
          </View>
          {!order?.orderUpdate?.processed && (
            <>
              <Button title='Cancel Order' size='big' color='shadedDanger' />
            </>
          )}
          <P style={styles.infoText}>
            ⓘ You can only cancel an order before it's processed.
          </P>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  pageArea: {
    marginBottom: 30,
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  ordersContainer: {
    marginVertical: 10,
  },
  orderInfo: {
    textAlign: 'center',
  },
  orderInfoFarmer: {
    textAlign: 'center',
    color: Theme.secondary,
  },
  title: {
    textAlign: 'center',
  },
  buttonArea: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    textAlign: 'center',
  },
});
