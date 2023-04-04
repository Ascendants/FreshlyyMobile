import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H5, H8 } from '../components/Texts';
import { Button } from '../components/Buttons';
import ENV from '../constants/env';
import { Ionicons } from '@expo/vector-icons';

export default function ({ navigation, route }) {
  const orderId = route.params.orderId;
  const issue = 'Order Is Wrong';
  const handleSubmit = async () => {
    try {
      const response = await fetch(ENV.backend + '/farmer/support-ticket/', {
        method: 'POST',
        headers: {
          useremail: route.params.userEmail,
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
          Order is wrong
        </H5>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <P>
            Please let us know if you did not receive your order (it appears you
            received someone else's order).
          </P>
          <P>
            We'll go over everything and decide what to do next. Please keep in
            mind that we will be unable to replace your order, but you may be
            eligible for a refund.
          </P>
          <P></P>
          <P>IMAGE UPLOAD</P>
          <P>
            Pictures aid in understanding what occurred. Please include a photo
            of the things you received and/or a receipt for the incorrect order
            (check the delivery bag for a receipt).
          </P>
          <Text style={styles.inputLabel}>Include a Photo</Text>
          <TouchableOpacity>
            <View style={styles.inputImgBox}>
              <Ionicons name='image' size={22} color={Theme.tertiary} />
              <H8 style={{ color: Theme.tertiary }}>Select file</H8>
            </View>
          </TouchableOpacity>
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
  inputLabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    marginTop: 20,
  },
  inputImgBox: {
    backgroundColor: Theme.contrastTextColor,
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
