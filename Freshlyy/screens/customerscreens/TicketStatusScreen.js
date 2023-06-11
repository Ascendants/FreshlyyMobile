import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { H3, H4, H5, H6 } from '../../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [tickets, setTickets] = useState([]);

  React.useState(() => {
    fetch(ENV.backend + '/customer/get-support-tickets/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.tickets) throw new Error('Malformed Response');
        setTickets(res.tickets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <H3 style={{ textAlign: 'center', marginBottom: 25 }}>Support Tickets</H3>
      <View style={styles.container}>
        <ScrollView>
          {tickets.length === 0 && (
            <H5 style={{ margin: 10 }}>No tickets found</H5>
          )}
          {tickets.length > 0 &&
            tickets.map((ticket, index) => (
              <TouchableOpacity
                style={styles.button}
                key={index}
                onPress={() =>
                  navigation.navigate('Ticket Details', { ticket: ticket._id })
                }
              >
                <View style={styles.ticketContainer}>
                  <H6>Ticket ID: #{ticket._id}</H6>
                  <H6>Issue: {ticket.issue}</H6>
                  <H6>Date: {ticket.date}</H6>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  ticketContainer: {
    // margin: 5,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Theme.tertiaryShade,
    borderBottomWidth: 1,
    borderColor: Theme.tertiary,
  },
});
