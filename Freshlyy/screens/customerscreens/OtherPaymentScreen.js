import React from 'react';
import { StyleSheet, View, Image, ScrollView, Settings } from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { TextInputBox, MaskedTextInputBox } from '../../components/Inputs';
import { H2, P } from '../../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import CardTypeSelector from '../../components/CardTypeSelector';
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
  async function handleButtonPress() {
    setPaying(true);
    const paymentId = await saveCard();
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
          userEmail: route.params.userEmail,
          'Content-Type': 'application/json',
          //this will be replaced with an http only token
          //after auth gets set
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
            useremail: route.params.userEmail,
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
    const { clientSecret } = await fetchSetupIntent();
    const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      throw new Error(error);
    } else if (setupIntent) {
      return setupIntent.paymentMethodId;
    }
  }
  return (
    <StripeProvider publishableKey={stripeKey}>
      <SafeAreaView>
        <View style={styles.screen}>
          <LoadingModal message='Making Payment' visible={paying} />
          <Header back={true} home={true} />
          <H2 style={{ textAlign: 'center' }}>Payment</H2>
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
              <View style={styles.inputcont}></View>
            </View>
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
});
