import React, {useState, useEffect} from "react";
import {StyleSheet, View, ScrollView, TouchableOpacity,} from 'react-native';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { H3, H4, H5 } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import ENV from "../constants/env";

export default function ({ navigation }) {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(() => {
      fetchTickets();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const fetchTickets = async () => {
  //   const response = await fetch(ENV.backend + '/farmer/support-tickets/', {
  //     method: 'GET',
  //     headers: {
  //       useremail: route.params.userEmail,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.message != 'Success') throw new Error('Malformed Response');
  //       setTickets(res.supportTicket);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <H3 style={{ textAlign: 'center' }}>Support Tickets</H3>
      <ScrollView>
        <View style={styles.container}>
          {console.log(tickets.length)}
          {tickets.length === 0 && 
            <H5 style={{ margin: 10 }}>No tickets found</H5>
          }
          {tickets.length > 0 &&
            tickets.map((ticket, index) => (
              <TouchableOpacity style={styles.button} key={index} onPress={() => navigation.navigate('Ticket Details', {ticket: ticket})}>
                <View style={styles.barContainer}>
                  <H5>{ticket._id}</H5>
                  <H5>{ticket.issue}</H5>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: "100%",
    paddingHorizontal: 20,
  },
});