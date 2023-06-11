import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import DashBoardCard from '../../components/DashBoardCard';
import ServicesCardDB from '../../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import { Button } from '../../components/Buttons';
import InfoCardDBCust from '../../components/InfoCardDBCust';
import RefreshView from '../../components/RefreshView';
import { auth } from '../../utils/firebase';
export default function ({ navigation, route }) {
  console.log('test2');
  const [userData, setUserData] = useState({});
  function viewOrders(type) {
    navigation.navigate('Orders List', {
      initialTab: type,
    });
  }
  async function logOut() {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  const getData = React.useCallback(async () => {
    return fetch(ENV.backend + '/customer/dashboard', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
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
  }, [route]);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header
          customer={true}
          notification={true}
          hasNotifications={userData.user?.notifications}
          notifMode={'customer'}
        />
        <RefreshView getData={getData} route={route}>
          <InfoCardDBCust user={userData.user} />
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../../assets/topay.png')}
              number={userData.toPay}
              text='To Pay'
              onPress={() => viewOrders('To Pay')}
            />
            <DashBoardCard
              imageUri={require('../../assets/processing.png')}
              number={userData.toProcess + userData.toShip || 0}
              text='Processing'
              onPress={() => viewOrders('Processing')}
            />
            <DashBoardCard
              imageUri={require('../../assets/topickup.png')}
              number={userData.toPickup}
              text='To Pick Up'
              onPress={() => viewOrders('To Pickup')}
            />
            <DashBoardCard
              imageUri={require('../../assets/shipped.png')}
              number={userData.toReceive}
              text='Shipped'
              onPress={() => viewOrders('Shipped')}
            />
            <DashBoardCard
              imageUri={require('../../assets/toreview.png')}
              number={userData.toReview}
              text='To Review'
              onPress={() => viewOrders('To Review')}
            />
            <DashBoardCard
              imageUri={require('../../assets/all.png')}
              number={userData.all}
              text='All Orders'
              onPress={() => viewOrders('All')}
            />
          </View>
          <ServicesCardDB />
          <Button
            style={styles.buttonContainer}
            title='Log Out'
            size='big'
            color='shadedDanger'
            onPress={logOut}
          />
          <View style={styles.lastChild}></View>
        </RefreshView>
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
