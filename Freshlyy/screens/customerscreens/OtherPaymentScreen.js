import React from 'react';
import { StyleSheet, View, Image, ScrollView, Platform } from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { H3, P } from '../../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';
import { CheckBox } from '../../components/Inputs';
import {
  StripeProvider,
  CardField,
  confirmSetupIntent,
} from '@stripe/stripe-react-native';

const stripeKey =
  'pk_test_51JxX4pBhvwaCydqin0F11wqwvBzL9AiA6jrkNZCqbawmKY4TWOgd21feOfkXItvsoqGduSdEw2dgLswnmzRxSZbl0074AP4Qmr';

export default function ({ navigation, route }) {
  const [saveCardLater, setSaveCardLater] = React.useState(false);
  const [paying, setPaying] = React.useState(false);
  const [error, setError] = React.useState(null);
  async function handleButtonPress() {
    setPaying(true);
    setError(null);
    const paymentId = await saveCard();
    console.log(paymentId);
    if (!paymentId) {
      setError('Something is wrong with your card details');
      setPaying(false);
      return;
    }
    await makePayment(paymentId);
    setPaying(false);
  }
  async function makePayment(paymentMethod) {
    try {
      const data = {
        payFrom: paymentMethod,
        orders: route.params.orders,
        saveCard: saveCardLater,
      };
      const result = await fetch(ENV.backend + '/customer/payment/', {
        method: 'POST',
        headers: {
          Authorization: route.params.auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await result.json();
      if (res.message != 'Success') {
        throw new Error('Something went wrong');
      }
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Payment Complete!',
        messageText: 'The farmers will process your order and let you know!',
        goto: 'Orders List',
        screenParams: {
          concerned: route.params?.orders?.map((order) => order._id),
          initialTab: 'Processing',
        },
        goButtonText: 'View Order',
      });
    } catch (error) {
      console.log(error);
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Payment Failed :(',
        messageText: 'One or more payments failed :(',
        goto: 'Orders List',

        goButtonText: 'View Order',
      });
    }
  }

  const fetchSetupIntent = async () => {
    try {
      const response = await fetch(
        `${ENV.backend}/customer/get-card-setup-intent`,
        {
          method: 'GET',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await response.json();

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  async function saveCard() {
    try {
      const { clientSecret } = await fetchSetupIntent();
      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        throw new Error(error);
      } else if (setupIntent) {
        if (Platform.OS === 'android') {
          return setupIntent.paymentMethod.id;
        }
        return setupIntent.paymentMethodId;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StripeProvider publishableKey={stripeKey}>
      <SafeAreaView>
        <View style={styles.screen}>
          <LoadingModal message='Making Payment' visible={paying} />
          <Header back={true} home={true} />
          <H3 style={{ textAlign: 'center' }}>Payment</H3>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pageContent}>
              <Image
                source={require('../../assets/bigcard.png')}
                style={styles.vectorimage}
              />
              <View style={styles.inputcont}>
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: Theme.overlay,
                    textColor: Theme.textColor,
                    borderRadius: 10,
                  }}
                  style={{
                    width: '80%',
                    height: 50,
                    marginVertical: 30,
                  }}
                />
                <CheckBox
                  value={saveCardLater}
                  disabled={false}
                  setCheckBox={setSaveCardLater}
                  label='Save this card'
                />
                <Button
                  title='Make Payment'
                  color='filledWarning'
                  size='big'
                  onPress={handleButtonPress}
                />
              </View>
              <P
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  color: Theme.danger,
                }}
              >
                {error}
              </P>
            </View>
            <P style={styles.infoText}>
              ⓘ We do not store your card details with us. It is stored securely
              with our payment processor Stripe.
            </P>
          </ScrollView>
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  vectorimage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputcont: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginTop: 50,
  },
});
