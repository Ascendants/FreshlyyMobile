import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import DashBoardCard from '../components/DashBoardCard';
import ServicesCardDB from '../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import ENV from '../constants/env';
import { H4 } from '../components/Texts';
import InfoCardDBCust from '../components/InfoCardDBCust';

export default function ({ navigation, route }) {
  const [userData, setUserData] = useState({});
  function viewOrders(type) {
    navigation.navigate('Orders List', {
      initialTab: type,
    });
  }
  React.useEffect(() => {
    fetch(ENV.backend + '/customer/dashboard', {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setUserData(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header customer={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.pageContent}
        >
          <InfoCardDBCust user={userData.user} />
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../assets/topay.png')}
              number={userData.toPay}
              text='To Pay'
              onPress={() => viewOrders('to-pay')}
            />
            <DashBoardCard
              imageUri={require('../assets/processing.png')}
              number={userData.toProcess + userData.toShip}
              text='Processing'
              onPress={() => viewOrders('processing')}
            />
            <DashBoardCard
              imageUri={require('../assets/topickup.png')}
              number={userData.toPickup}
              text='To Pick Up'
              onPress={() => viewOrders('to-pickup')}
            />
            <DashBoardCard
              imageUri={require('../assets/shipped.png')}
              number={userData.toReceive}
              text='Shipped'
              onPress={() => viewOrders('shipped')}
            />
            <DashBoardCard
              imageUri={require('../assets/toreview.png')}
              number={userData.toReview}
              text='To Review'
              onPress={() => viewOrders('to-review')}
            />
            <DashBoardCard
              imageUri={require('../assets/all.png')}
              number={userData.all}
              text='All Orders'
              onPress={() => viewOrders('all')}
            />
          </View>
          <ServicesCardDB />
          <View style={styles.lastChild}></View>
        </ScrollView>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },

  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  lastChild: {
    height: 80,
  },
});
