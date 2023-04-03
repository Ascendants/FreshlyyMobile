import React, {useState, useEffect} from "react";
import {StyleSheet, View, ScrollView, TouchableOpacity,} from 'react-native';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { H3, H4, H5, H6 } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import ENV from "../constants/env";
import RefreshView from "../components/RefreshView";
import OrderStatus from "../components/OrderStatus";

export default function ({ navigation, route }) {
  const [ticket, setTicket] = useState({});

  const getTicket = React.useCallback(async() => {
    const ticketId = route.params.ticket;
    return fetch(ENV.backend + `/farmer/support-ticket/${ticketId}`, {
      method: 'GET',
      headers: {
        userEmail: route.params.userEmail,
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.message != 'Success') {
        throw new Error('Malformed Response');
      }
      setTicket[res.supportTicket];
      // console.log(res.supportTicket);
      // console.log(ticket);
    })
  })

  return(
    <SafeAreaView>
      <Header back={true} />
      <H3 style={{ textAlign: 'center', marginBottom: 25 }}>Support Tickets</H3>
        <View style={styles.container}>
          <RefreshView getData={getTicket}>
            {console.log(ticket)}
            <H6>ID: #{ticket?._id}</H6>
            <OrderStatus status={ticket?.status} />
          </RefreshView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
  },
});