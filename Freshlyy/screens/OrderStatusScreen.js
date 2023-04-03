import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { H3, Pr, H7, H6, H4, P } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import FadeComponent from '../components/FadeComponent';
import Loading from '../components/Loading';
import OrderStatus from '../components/OrderStatus';
import { Button } from '../components/Buttons';
import ProductView from '../components/ProductView';
import DeliveryView from '../components/DeliveryView';
import ENV from '../constants/env';
import RefreshView from '../components/RefreshView';
import PaymentType from '../components/PaymentType';
function getPaymentType(order) {
  if (!order.payment?.length) {
    return null;
  }
  let types = order.payment?.filter((payment) => payment.type !== 'Coupon');
  for (let type of types) {
    if (type.type == 'COD') {
      return <PaymentType method='Cash on Delivery' />;
    }
    return <PaymentType method='Card Payment' />;
  }
}

export default function ({ navigation, route }) {
  const [order, setOrder] = React.useState({});

  const getData = React.useCallback(async () => {
    const orderId = route.params.orderId;
    return fetch(ENV.backend + "/customer/get-order/" + orderId, {
      method: "GET",
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != "Success") {
          throw new Error("Order not found");
        }
        setOrder((prev) => {
          return { ...prev, ...res.order };
        });
      })
      .catch((err) => console.log(err));
  });
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H3>Order</H3>
        <RefreshView getData={getData}>
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo} selectable={true}>
              #{order?._id}
            </H7>
            <H6 style={styles.orderInfoFarmer}>From {order?.farmerName}</H6>
            <OrderStatus
              status={order?.orderUpdate}
              isDelivery={order?.isDelivery}
              reviewed={order?.farmerRating != -1}
            />
            {!order?.orderUpdate?.cancelled && !order?.orderUpdate?.payment && (
              <Button
                title="Pay Now"
                size="big"
                color="shadedSecondary"
                onPress={() => {
                  navigation.navigate("Payment", {
                    orders: [order],
                    userEmail: route.params.userEmail,
                    later: true,
                  });
                }}
              />
            )}
            {!order?.orderUpdate?.cancelled &&
              order?.orderUpdate?.processed &&
              !order.isDelivery &&
              !order?.orderUpdate.pickedUp && (
                <Button
                  title="Confirm Pick Up"
                  size="big"
                  color="shadedWarning"
                  onPress={() => {
                    navigation.navigate("Confirm Pickup", {
                      orderId: order?._id,
                      farmerName: order?.farmerName,
                      userEmail: route.params.userEmail,
                    });
                  }}
                />
              )}
            <View style={styles.pageArea}>
              {order?.items?.map((item) => (
                <ProductView ordered={true} key={item.itemId} product={item} />
              ))}
            </View>
          </View>
          {order?.isDelivery && (
            <>
              <View style={styles.pageArea}>
                <H3>Sub Total</H3>
                <Pr fontSize={30}>
                  {parseFloat(order?.totalPrice).toFixed(2)}
                </Pr>
              </View>
              <View style={styles.pageArea}>
                <H4 style={styles.title}>Delivery Cost</H4>
                <DeliveryView
                  option={{
                    distance: order?.deliveryDistance,
                    costPerKM: order?.deliveryCostPerKM,
                  }}
                  delivery={order?.isDelivery}
                  ordered={true}
                />
              </View>
            </>
          )}
          {order?.coupon && (
            <>
              <View style={styles.pageArea}>
                <H3>Total</H3>
                <Pr fontSize={30}>
                  {parseFloat(
                    order?.totalPrice + order?.totalDeliveryCharge
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
              {parseFloat(
                order?.totalPrice + order?.totalDeliveryCharge
              ).toFixed(2)}
            </Pr>
          </View>
          {order?.orderUpdate?.payment && order?.payment?.length != 0 && (
            <View style={styles.pageArea}>
              <H4 style={styles.title}>Payment Method</H4>
              {getPaymentType(order)}
            </View>
          )}
          <View style={styles.buttonArea}>
            <Button title='Get Support' color='shadedWarning' size='big' />
            {(order?.orderUpdate?.delivered ||
              order?.orderUpdate?.pickedUp) && (
              <Button title="Review" color="shadedSecondary" size="big" />
            )}
          </View>
          {!order?.orderUpdate?.cancelled && !order?.orderUpdate?.processed && (
            <>
              <Button
                title="Cancel Order"
                size="big"
                color="shadedDanger"
                onPress={() =>
                  navigation.navigate("Order Cancel Screen", {
                    orderId: order?._id,
                    farmerName: order?.farmerName,
                    userEmail: route.params.userEmail,
                  })
                }
              />
            </>
          )}
          {!order?.orderUpdate?.cancelled && (
            <P style={styles.infoText}>
              ⓘ You can only cancel an order before it's processed.
            </P>
          )}
        </RefreshView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    alignItems: "center",
  },
  pageArea: {
    marginBottom: 30,
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  ordersContainer: {
    marginVertical: 10,
  },
  orderInfo: {
    textAlign: "center",
  },
  orderInfoFarmer: {
    textAlign: "center",
    color: Theme.secondary,
  },
  title: {
    textAlign: "center",
  },
  buttonArea: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    textAlign: "center",
    marginBottom: 50,
  },
});
