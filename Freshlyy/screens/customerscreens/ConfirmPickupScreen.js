import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5, P, H4 } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';

export default function ({ navigation, route }) {
  const [confirming, setConfirming] = React.useState(false);
  async function pickupOrder() {
    setConfirming(true);
    try {
      const result = await fetch(
        ENV.backend + '/customer/confirm-pickup/' + route.params.orderId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      if (res.message == 'Success') {
        setConfirming(false);
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Confirmation Successfull',
          messageText: 'Enjoy your fresh produce!',
          goto: 'Orders List',
        });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      setConfirming(false);
      console.log(err);
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Pickup Confirmation Failed :(',
        messageText: 'Something went wrong. Please try again',
        goto: 'Orders List',
      });
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Confirming Pickup' visible={confirming} />
        <Header back={true} />
        <View style={styles.pageContent}>
          <Image
            source={require('../../assets/pickup.png')}
            style={styles.messageImage}
          />
          <H3 style={styles.messageTitle}>Pick Up Order</H3>
          <P>#{route.params.orderId}</P>
          <P style={styles.farmerName}>From {route.params.farmerName}</P>
          <H4 style={styles.messageText}>Please Confirm Your Action</H4>
          <Button
            title='Confirm Pickup'
            color='filledWarning'
            size='big'
            onPress={pickupOrder}
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
  farmerName: {
    color: Theme.secondary,
    marginBottom: 10,
  },
});
