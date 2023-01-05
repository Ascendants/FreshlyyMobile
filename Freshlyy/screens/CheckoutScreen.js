import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { H1, H2, H3, H4, Pr } from '../components/Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import theme from '../constants/theme';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductView from '../components/ProductView';
import DeliveryView from '../components/DeliveryView';
import Modal from '../components/Modal';
import LottieView from 'lottie-react-native';

export default function ({ navigation, route }) {
  const [orderData, setOrderData] = React.useState({
    selectedPaymentMethod: 'cod',
  });
  const [confirmOrder, setConfirmOrder] = React.useState(false);
  function setSelectedPayment(method) {
    setOrderData((prev) => {
      return { ...prev, selectedPaymentMethod: method };
    });
  }
  const delay = (time) =>
    new Promise((resolve, reject) => setTimeout(resolve, time));
  async function placeOrder() {
    setConfirmOrder(true);
    await delay(2000);
    navigation.navigate('Payment', { order: orderData });
    setConfirmOrder(false);
  }
  const user = React.useContext(UserContext);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Modal visible={confirmOrder}>
          <View style={styles.modalContent}>
            <LottieView
              autoPlay
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../assets/Freshlyy.json')}
            />
            <H3>Placing Order</H3>
          </View>
        </Modal>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <H3 style={styles.title}>Your Order</H3>
            <View style={styles.pageArea}>
              <ProductView
                product={{
                  title: 'Sri Lankan Carrots',
                  farmer: 'Haritha',
                  qty: 1,
                  price: 1250.0,
                  imageUri:
                    'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/ProductImages%2FP001_1.jpg?alt=media&token=eb80b75a-b8e9-4b54-9e31-f4e4f40e9faa',
                }}
              />
              <ProductView
                product={{
                  title: 'Green Beans',
                  farmer: 'Nadun',
                  qty: 2,
                  price: 2000.0,
                  imageUri:
                    'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/ProductImages%2Fpexels-antony-trivet-12974525%202.jpg?alt=media&token=e69399ba-fd6c-4b57-80cc-2971e8591200',
                }}
              />
            </View>
            <View style={styles.pageArea}>
              <H3>Sub Total</H3>
              <Pr fontSize={30}>3250.00</Pr>
            </View>
            <View style={styles.pageArea}>
              <H4 style={styles.title}>Delivery Costs</H4>
              <DeliveryView
                option={{
                  farmer: 'Haritha',
                  distance: 2.5,
                  upkm: 100.0,
                  tprice: 250.0,
                  getItDelivered: true,
                }}
              />
              <DeliveryView
                option={{
                  farmer: 'Nadun',
                  distance: 3,
                  upkm: 150.0,
                  tprice: 450.0,
                  getItDelivered: false,
                }}
              />
            </View>
            <View style={styles.pageArea}>
              <H3>Total</H3>
              <Pr fontSize={30}>3950.00</Pr>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size='big'
                color='filledWarning'
                title='Confirm Order'
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
});
