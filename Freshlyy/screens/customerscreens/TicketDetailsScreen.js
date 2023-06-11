import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { H3, H4, H5, H6 } from '../../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';
import TicketStatus from '../../components/TicketStatus';

export default function ({ navigation, route }) {
  const [ticket, setTicket] = useState({});

  const getTicket = React.useCallback(async () => {
    const ticketId = route.params.ticketId;
    return fetch(ENV.backend + `/farmer/support-ticket/${ticketId}`, {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Malformed Response');
        }
        setTicket(res.supportTicket);
      });
  }, []);
  return (
    <SafeAreaView>
      <Header back={true} />
      <H3 style={{ textAlign: 'center', marginBottom: 25 }}>Support Tickets</H3>
      <View style={styles.container}>
        <RefreshView getData={getTicket}>
          <TicketStatus status={ticket?.status} />
          <View style={{ justifyContent: 'space-between', padding: 10 }}>
            <H6>ID: #{ticket?._id}</H6>
            <H6>Issue: {ticket?.issue}</H6>
            <H6>Date: {ticket?.date}</H6>
            <H6>Description: {ticket?.description}</H6>
            <Image
              source={require('../../assets/SupportTicket.png')}
              style={styles.image}
            />
          </View>
        </RefreshView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginVertical: 30,
  },
});
