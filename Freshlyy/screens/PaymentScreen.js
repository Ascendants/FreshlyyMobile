import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { H1, H2, H3, H4, Pr } from '../components/Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import theme from '../constants/theme';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaymentSelector from '../components/PaymentSelector';
import Modal from '../components/Modal';
import LottieView from 'lottie-react-native';
import PlacedOrderView from '../components/PlacedOrderView';
import { TextInputBox } from '../components/Inputs';
import ENV from '../constants/env';

export default function ({ navigation, route }) {
  const [orderData, setOrderData] = React.useState({
    selectedPaymentMethod: 'cod',
    orders: route.params.order.orderDetails,
    orderTotal: route.params.order.orderDetails.reduce((a, b) => {
      return a + (b.totalPrice + b.totalDeliveryCharge);
    }, 0),
  });
  const [cvv, setCvv] = React.useState('');
  const [confirmPayment, setConfirmPayment] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  function setSelectedPayment(method) {
    setOrderData((prev) => {
      return { ...prev, selectedPaymentMethod: method };
    });
  }
  React.useState(() => {
    fetch(ENV.backend + '/customer/cards/', {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cards) throw new Error('Malformed Response');
        setPaymentMethods(res.cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const delay = (time) =>
    new Promise((resolve, reject) => setTimeout(resolve, time));
  async function makePayment() {
    setConfirmPayment(true);
    const data = {
      payFrom: orderData.selectedPaymentMethod,
      orders: orderData.orders.map((order) => order._id),
      cvv: cvv,
    };
    fetch(ENV.backend + '/customer/payment/', {
      method: 'POST',
      headers: {
        userEmail: route.params.userEmail,
        'Content-Type': 'application/json',
        //this will be replaced with an http only token
        //after auth gets set
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
          console.log('Success');
        }

        // navigation.navigate('Payment', { order: res });
        setConfirmPayment(false);
      })
      .catch((err) => console.log(err));
  }
  const user = React.useContext(UserContext);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Modal visible={confirmPayment}>
          <View style={styles.modalContent}>
            <LottieView
              autoPlay
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../assets/Freshlyy.json')}
            />
            <H3>Making Payment</H3>
          </View>
        </Modal>
        <Header back={false} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <H2 style={styles.bigTitle}>Order Placed!</H2>
            <H3 style={styles.title}>Payment</H3>
            <View style={styles.pageArea}>
              {orderData.orders.map((order) => {
                return <PlacedOrderView key={order.farmer} order={order} />;
              })}
            </View>
            <View style={styles.pageArea}>
              <H3>Total</H3>
              <Pr fontSize={30}>{orderData.orderTotal.toFixed(2)}</Pr>
            </View>
            <View style={styles.pageArea}>
              <H4 style={styles.title}>Apply Coupon Code</H4>
              <View style={styles.coupon}></View>
            </View>
            <View style={styles.pageArea}>
              <H3>Net Total</H3>
              <Pr fontSize={30}>{orderData.orderTotal.toFixed(2)}</Pr>
            </View>
            <View style={[styles.pageArea, { alignItems: 'center' }]}>
              <H4 style={styles.title}>Choose a payment option</H4>
              <PaymentSelector
                methods={paymentMethods}
                setSelectedPayment={setSelectedPayment}
                selectedMethod={orderData.selectedPaymentMethod}
                clearCvv={() => setCvv('')}
              />
              {orderData.selectedPaymentMethod != 'other' &&
              orderData.selectedPaymentMethod != 'cod' ? (
                <TextInputBox
                  inputlabel='CVV'
                  placeholder='Enter CVV'
                  value={cvv}
                  onChange={(value) => {
                    setCvv(value);
                  }}
                  keyboardType='number-pad'
                  maxLength={3}
                />
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size='big'
                color='filledSecondary'
                title='Make Payment'
                onPress={makePayment}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    fontFamily: 'Poppins',
    height: '100%',
  },
  pageContent: {
    paddingHorizontal: 10,
  },
  pageArea: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 10,
  },
  bigTitle: {
    marginBottom: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  coupon: {
    marginVertical: 20,
    height: 100,
    backgroundColor: Theme.overlay,
    width: '100%',
    borderRadius: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 20,
    alignSelf: 'center',
  },
});
