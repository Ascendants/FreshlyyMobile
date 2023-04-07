import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5, P, H4, Pr } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';

export default function ({ navigation, route }) {
  const [confirming, setConfirming] = React.useState(false);
  async function requestPayout() {
    setConfirming(true);
    try {
      const result = await fetch(ENV.backend + '/farmer/payout-request/', {
        method: 'POST',
        headers: {
          userEmail: route.params.userEmail,
          //this will be replaced with an http only token
          //after auth gets set
        },
      });
      const res = await result.json();
      if (res.message == 'Success') {
        setConfirming(false);
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Payout Request Sent!',
          messageText: 'Please allow us upto 7 days to process your request',
          goto: 'Farmer Balance',
        });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      setConfirming(false);
      console.log(err);
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Request Failed :(',
        messageText: 'Something went wrong. Please try again',
        goto: 'Farmer Balance',
      });
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Sending Request' visible={confirming} />
        <Header back={true} />
        <View style={styles.pageContent}>
          <Image
            source={require('../../assets/payout.png')}
            style={styles.messageImage}
          />
          <H3 style={styles.messageTitle}>Get Paid Out!</H3>
          <View style={styles.priceContainer}>
            <Pr fontSize={30} style={styles.price}>
              {route.params.withdrawable}
            </Pr>
          </View>

          <H4 style={styles.messageText}>Please Confirm Your Action</H4>
          <Button
            title='Confirm Request'
            color='filledPrimary'
            size='big'
            onPress={requestPayout}
          />
        </View>
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
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  messageImage: {
    height: 350,
    resizeMode: 'contain',
  },
  messageTitle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingVertical: 20,
  },
  messageText: {
    paddingBottom: 30,
    textAlign: 'center',
  },
  price: {
    color: Theme.secondary,
  },
  priceContainer: {
    marginBottom: 20,
  },
});
