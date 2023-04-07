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
  const [cancelling, setCancelling] = React.useState(false);
  async function cancelOrder() {
    setCancelling(true);
    try {
      const result = await fetch(
        ENV.backend + '/customer/cancel-order/' + route.params.orderId,
        {
          method: 'POST',
          headers: {
            userEmail: route.params.userEmail,
            //this will be replaced with an http only token
            //after auth gets set
          },
        }
      );
      const res = await result.json();
      if (res.message == 'Success') {
        setCancelling(false);
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Order was cancelled :(',
          messageText:
            'We will refund any payments you have done within 7 business days.',
          goto: 'Orders List',
        });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      setCancelling(false);
      console.log(err);
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Order could not be cancelled :(',
        messageText: 'Something went wrong',
        goto: 'Orders List',
      });
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Cancelling Order' visible={cancelling} />
        <Header back={true} />
        <View style={styles.pageContent}>
          <Image
            source={require('../../assets/cancel.png')}
            style={styles.messageImage}
          />
          <H3 style={styles.messageTitle}>Cancel Order</H3>
          <P>#{route.params.orderId}</P>
          <P style={styles.farmerName}>From {route.params.farmerName}</P>
          <H4 style={styles.messageText}>Please Confirm Your Action</H4>
          <Button
            title='Cancel Order'
            color='filledDanger'
            size='big'
            onPress={cancelOrder}
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
