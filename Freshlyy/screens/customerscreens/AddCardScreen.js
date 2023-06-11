import React from 'react';
import { StyleSheet, View, Image, ScrollView, Settings } from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { H3, P } from '../../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';
import {
  StripeProvider,
  CardField,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';

const stripeKey =
  'pk_test_51JxX4pBhvwaCydqin0F11wqwvBzL9AiA6jrkNZCqbawmKY4TWOgd21feOfkXItvsoqGduSdEw2dgLswnmzRxSZbl0074AP4Qmr';

export default function ({ navigation, route }) {
  const { confirmSetupIntent, loading } = useConfirmSetupIntent();
  const [saving, setSaving] = React.useState(false);
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
    setSaving(true);
    const { clientSecret } = await fetchSetupIntent();
    const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
      paymentMethodType: 'Card',
    });
    setSaving(false);
    if (error) {
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Card could not be saved :(',
        messageText: 'There was something wrong with your card.',
        goto: 'Card Management',
        goButtonText: 'View Cards',
      });
      return;
    } else if (setupIntent) {
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Card Saved!',
        messageText: 'The card has been saved securely',
        goto: 'Card Management',
        goButtonText: 'View Cards',
      });
      return;
    }
  }

  return (
    <StripeProvider publishableKey={stripeKey}>
      <SafeAreaView>
        <View style={styles.screen}>
          <LoadingModal message='Saving Card' visible={saving} />
          <Header back={true} home={true} />
          <H3 style={{ textAlign: 'center' }}>Add Card</H3>
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
                <Button
                  title='Save Card'
                  color='filledWarning'
                  size='big'
                  onPress={saveCard}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <P style={styles.infoText}>
                ⓘ We may charge a small amount to verify your card which will be
                refunded back to you.
              </P>
              <P style={styles.infoText}>
                We do not store your card details with us. It is stored securely
                with our payment processor Stripe.
              </P>
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
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
