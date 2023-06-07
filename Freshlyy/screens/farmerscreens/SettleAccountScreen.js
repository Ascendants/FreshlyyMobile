import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { H1, H2, H3, H4, Pr } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaymentSelector from '../../components/PaymentSelector';
import LoadingModal from '../../components/LoadingModal';
import PlacedOrderView from '../../components/PlacedOrderView';
import ENV from '../../constants/env';
import { set } from 'date-fns';

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [settlementIntent, setSettlementIntent] = React.useState({
    id: null,
    amount: 0,
  });
  const [confirmPayment, setConfirmPayment] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  function setSelectedPayment(method) {
    setPaymentMethod(method);
  }
  React.useState(() => {
    fetch(ENV.backend + '/farmer/settlement-intent/', {
      method: 'POST',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cards) throw new Error('Malformed Response');
        setPaymentMethods(res.cards);
        setSettlementIntent(res.settlementIntent);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function makePayment() {
    if (paymentMethod == 'other') {
      navigation.navigate('Other Farmer Payment', {
        settlementIntent: settlementIntent.id,
      });
      return;
    }
    setConfirmPayment(true);
    const data = {
      payFrom: paymentMethod,
      saveCard: true,
      farmerPayment: settlementIntent.id,
    };
    fetch(ENV.backend + '/farmer/settle-account/', {
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
        setConfirmPayment(false);
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Payment Complete!',
          messageText: 'We have received your payment!',
          goto: 'Farmer Balance',
          goButtonText: 'Go Back',
        });
        return;
      })
      .catch((err) => {
        navigation.navigate('Message', {
          type: 'fail',
          messageTitle: 'Payment Failed :(',
          messageText: 'Some unknown error occured :(',
          goto: 'Farmer Balance',
          goButtonText: 'Go Back',
        });
      });
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Making Payment' visible={confirmPayment} />
        <Header back={false} />
        {!loaded ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pageContent}>
              <H3 style={styles.bigTitle}>Settle Account</H3>
              <Pr fontSize={25} style={styles.title}>
                {settlementIntent.amount}
              </Pr>

              <View style={[styles.pageArea, { alignItems: 'center' }]}>
                <H4 style={styles.title}>Choose a payment option</H4>
                <PaymentSelector
                  methods={paymentMethods}
                  setSelectedPayment={setSelectedPayment}
                  selectedMethod={paymentMethod}
                  noCod={true}
                />
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
        )}
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
    textAlign: 'center',
    marginBottom: 10,
  },
  bigTitle: {
    marginBottom: 20,
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
