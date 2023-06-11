import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { P, H4, H5 } from '../../components/Texts';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';

export default function ({ navigation, route }) {
  const orderId = route.params.orderId;
  const issue = 'Order Naver Arrived';

  const handleSubmit = async () => {
    try {
      const response = await fetch(ENV.backend + '/farmer/support-ticket/', {
        method: 'POST',
        headers: {
          Authorization: route.params.auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issue: issue,
          orderId: orderId,
        }),
      });
      const data = await response.json();
      const id = data.id;
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Ticket Sent Successfully!',
        subjectId: id,
        messageText:
          ' is your ticket number. An administrator will be in touch with you shortly!',
        goto: 'Farmer Dashboard',
        goButtonText: 'Dashboard',
      });
      // console.log(data.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>
          Help With an Order
        </H4>
        <H5 style={{ textAlign: 'center', marginVertical: 10 }}>
          Order never arrived
        </H5>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <P>
            If the app or an email receipt shows that your order's been
            delivered, without your having received it, here's what you can do:
          </P>
          <P>
            - Check if someone else (neighbour, security guard, etc.) accepted
            the delivery for you.{' '}
          </P>
          <P>
            - Check your doorstep as the delivery partner may have left it
            there.
          </P>
          <P></P>
          <P>
            If you still can't locate your order, let us know here. You can also
            reach our support team for any clarifications. A member of our team
            will look into your concern and get back to you at the earliest. We
            usually respond to all requests within 24 hours, we appreciate your
            patience.
          </P>
          <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
            <Button
              size='normal'
              color='shadedSecondary'
              title='submit a ticket'
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: '100%',
    paddingHorizontal: 20,
  },
});
