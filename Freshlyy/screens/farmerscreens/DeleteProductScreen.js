import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5, P, H4 } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ENV from '../../constants/env';
import LoadingModal from '../../components/LoadingModal';
import { de } from 'date-fns/locale';

export default function ({ navigation, route }) {
  const [confirming, setConfirming] = React.useState(false);
  async function deleteProduct() {
    setConfirming(true);
    try {
      const result = await fetch(
        ENV.backend + '/farmer/delete-product/' + route?.params?.productId,
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
          messageTitle: 'Deletion Successfull',
          messageText: "It's gone for good!",
          goto: 'Farmer Dashboard',
        });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      setConfirming(false);
      console.log(err);
      navigation.navigate('Message', {
        type: 'fail',
        messageTitle: 'Product Deletion Failed :(',
        messageText: 'Something went wrong. Please try again',
        goto: 'Farmer Dashboard',
      });
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Deleting' visible={confirming} />
        <Header back={true} />
        <View style={styles.pageContent}>
          <Image
            source={require('../../assets/delete.png')}
            style={styles.messageImage}
          />
          <H3 style={styles.messageTitle}>Delete Product</H3>
          <P>#{route.params.productId}</P>
          <H5>{route.params.productTitle}</H5>
          <H4 style={styles.messageText}>Please Confirm Your Action</H4>
          <Button
            title='Confirm Deletion'
            color='filledDanger'
            size='big'
            onPress={deleteProduct}
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
