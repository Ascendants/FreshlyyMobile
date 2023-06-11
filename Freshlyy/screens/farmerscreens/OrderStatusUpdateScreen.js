import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import { H3, Pr, H7, H6, H4, P, H5 } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import FadeComponent from '../../components/FadeComponent';
import Loading from '../../components/Loading';
import OrderStatus from '../../components/OrderStatus';
import { Button } from '../../components/Buttons';
import ProductView from '../../components/ProductView';
import DeliveryView from '../../components/DeliveryView';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';
import PaymentType from '../../components/PaymentType';
import ModalComponent from '../../components/ModalComponent';
import LoadingModal from '../../components/LoadingModal';
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
  const [updateModal, setUpdateModal] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  function nextStatus() {
    if (!order && order.orderUpdate.cancelled != null) {
      return null;
    }
    if (!order.orderUpdate?.processed) {
      return { title: 'Mark as Processed', nextStatus: 'processed' };
    } else {
      if (order.isDelivery) {
        if (!order.orderUpdate.shipped) {
          return { title: 'Mark as Shipped', nextStatus: 'shipped' };
        }
        if (!order.orderUpdate.delivered) {
          return { title: 'Mark as Delivered', nextStatus: 'delivered' };
        }
      }
    }
    return null;
  }
  function updateStatus() {
    setUpdateModal(false);
    setUpdating(true);
    let next = nextStatus();
    if (!next) {
      return;
    }
    fetch(ENV.backend + '/farmer/update-order-status/' + order._id, {
      method: 'POST',
      headers: {
        Authorization: route.params.auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: next.nextStatus,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setOrder((prev) => {
          return { ...prev, ...res.order };
        });
      })
      .catch((err) => console.log(err));
    setUpdating(false);
  }
  const getData = React.useCallback(async () => {
    const orderId = route.params.orderId;
    return fetch(ENV.backend + '/farmer/order/' + orderId, {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
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
        <LoadingModal visible={updating} message='Updating Status' />
        <ModalComponent visible={updateModal}>
          <H4 style={{ textAlign: 'center', color: Theme.secondary }}>
            Update Order Status
          </H4>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginVertical: 20,
              resizeMode: 'contain',
            }}
            source={require('../../assets/status.png')}
          />
          <H3 style={{ textAlign: 'center' }}>{nextStatus()?.title}</H3>
          <Button
            title='Confirm'
            size='big'
            color='filledWarning'
            onPress={updateStatus}
          />
        </ModalComponent>
        <Header back={true} home={true} />
        <H3>Order</H3>
        <RefreshView getData={getData} route={route}>
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo} selectable={true}>
              #{order?._id}
            </H7>
            <H6 style={styles.orderInfoFarmer}>To {order?.customerName}</H6>
            <OrderStatus
              status={order?.orderUpdate}
              isDelivery={order?.isDelivery}
              reviewed={order?.farmerRating != -1}
            />
            {nextStatus() !== null && (
              <Button
                title={nextStatus().title}
                size='big'
                color='shadedSecondary'
                onPress={() => setUpdateModal(true)}
              />
            )}
            {!order.isDelivery && order?.orderUpdate?.processed && (
              <P style={styles.infoText}>
                ⓘ Ask the customer to mark the order as picked up before they
                leave.
              </P>
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

          {/* <View style={styles.buttonArea}>
            <Button title='Get Support' color='shadedWarning' size='big' />
            {(order?.orderUpdate?.delivered ||
              order?.orderUpdate?.pickedUp) && (
              <Button title='Review' color='shadedSecondary' size='big' />
            )}
          </View> */}
          {/* {!order?.orderUpdate?.cancelled && !order?.orderUpdate?.processed && (
            <>
              <Button
                title='Cancel Order'
                size='big'
                color='shadedDanger'
                onPress={() =>
                  navigation.navigate('Order Cancel Screen', {
                    orderId: order?._id,
                    farmerName: order?.farmerName,
                    userEmail: route.params.userEmail,
                  })
                }
              />
            </>
          )} */}

          <P style={styles.infoText}></P>
        </RefreshView>
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
    marginBottom: 50,
  },
});
