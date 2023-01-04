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

export default function ({ navigation, route }) {
  const [orderData, setOrderData] = React.useState({
    selectedPaymentMethod: 'cod',
  });
  const [confirmPayment, setConfirmPayment] = React.useState(false);
  function setSelectedPayment(method) {
    setOrderData((prev) => {
      return { ...prev, selectedPaymentMethod: method };
    });
  }
  const delay = (time) =>
    new Promise((resolve, reject) => setTimeout(resolve, time));
  async function placeOrder() {
    setConfirmPayment(true);
    await delay(2000);
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
          <Image
            style={styles.successImage}
            source={require('../assets/success.png')}
          />
          <H2 style={styles.bigTitle}>Order Placed!</H2>
          <H3 style={styles.title}>Payment</H3>
          <View style={styles.pageContent}>
            <View style={styles.pageArea}>
              <H3>Total</H3>
              <Pr fontSize={30}>3950.00</Pr>
            </View>
            <View style={styles.pageArea}>
              <H4 style={styles.title}>Apply Coupon Code</H4>
              <View style={styles.coupon}></View>
            </View>
            <View style={styles.pageArea}>
              <H3>Net Total</H3>
              <Pr fontSize={30}>3950.00</Pr>
            </View>
            <View style={styles.pageArea}>
              <H4 style={styles.title}>Choose a payment option</H4>
              <PaymentSelector
                methods={user.paymentMethods}
                setSelectedPayment={setSelectedPayment}
                selectedMethod={orderData.selectedPaymentMethod}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size='big'
                color='filledSecondary'
                title='Make Payment'
                onPress={placeOrder}
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
