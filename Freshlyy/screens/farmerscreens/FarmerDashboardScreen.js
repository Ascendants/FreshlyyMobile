import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Loading from '../../components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import SwipeOverlay from '../../components/SwipeOverlay';
import InfoCardDB from '../../components/InfoCardDB';
import DashBoardCard from '../../components/DashBoardCard';
import ServicesCardDB from '../../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import { H4 } from '../../components/Texts';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [sellingProducts, setSellingProducts] = useState('');
  const [pendingProducts, setPendingProducts] = useState('');
  const [newOrders, setNewOrders] = useState('');
  const [pastOrders, setPastOrders] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isBottomSheetNewOrderVisible, setIsBottomSheetNewOrderVisible] = useState(false);
  const [isBottomSheetPastOrderVisible, setIsBottomSheetPastOrderVisible] = useState(false);
  const [isBottomSheetSellingVisible, setIsBottomSheetSellingVisible] = useState(false);
  const [isBottomSheetPendingVisible, setIsBottomSheetPendingVisible] = useState(false);

  const bottomSheetRefNewOrder = useRef(null);
  const bottomSheetRefPastOrder = useRef(null);
  const bottomSheetRefSelling = useRef(null);
  const bottomSheetRefPending = useRef(null);
  const snapPoints = ['100%', '60%'];

  const handleBottomSheetNewOrderClose = () => {
    setIsBottomSheetNewOrderVisible(false);
  };

  const handleNewOrderBottomSheet = () => {
    setIsBottomSheetNewOrderVisible(true);
    bottomSheetRefNewOrder.current.expand();
  };

  const handleBottomSheetPastOrderClose = () => {
    setIsBottomSheetPastOrderVisible(false);
  };

  const handlePastOrderBottomSheet = () => {
    setIsBottomSheetPastOrderVisible(true);
    bottomSheetRefPastOrder.current.expand();
  };

  const handleBottomSheetSellingClose = () => {
    setIsBottomSheetSellingVisible(false);
  };

  const handleSeliingBottomSheet = () => {
    setIsBottomSheetSellingVisible(true);
    bottomSheetRefSelling.current.expand();
  };
  
  const handleBottomSheetPendingClose = () => {
    setIsBottomSheetPendingVisible(false);
  };

  const handlePendingBottomSheet = () => {
    setIsBottomSheetPendingVisible(true);
    bottomSheetRefPending.current.expand();
  };
  

  const getData = React.useCallback(async () => {
    return fetch(ENV.backend + '/farmer/dashboard', {
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
        setUserData(res.user);
        setSellingProducts(res.liveProducts);
        setPendingProducts(res.pendingProducts);
        setNewOrders(res.newOrders);
        setPastOrders(res.pastOrders);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  });

  return (
    <GestureHandlerRootView>
    <SafeAreaView>
      <View style={styles.screen}>
        <Header farmer={true} />
        <RefreshView getData={getData}>
          <InfoCardDB
            user={userData}
            goToBalances={() => navigation.navigate('Farmer Balance')}
          />
          <H4 style={styles.headings}>My Orders</H4>
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../../assets/gift.png')}
              number={newOrders}
              text='New Orders'
              onPress={handleNewOrderBottomSheet}
            />
            <DashBoardCard
              imageUri={require('../../assets/box.png')}
              number={pastOrders}
              text='Past Orders'
              onPress={handlePastOrderBottomSheet}
            />
          </View>
          <H4 style={styles.headings}>My Listings</H4>
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../../assets/trade.png')}
              number={sellingProducts}
              text='Selling'
              onPress={handleSeliingBottomSheet}
            />
            <DashBoardCard
              imageUri={require('../../assets/pending.png')}
              number={pendingProducts}
              text='Pending'
              onPress={handlePendingBottomSheet}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              size='big'
              color='shadedPrimary'
              title='Add new produce listing'
              // backgroundstyle={styles.button}
            />
          </View>
          <ServicesCardDB farmer={true} />
          <View style={styles.lastChild}></View>
        </RefreshView>
        <BottomSheet
          ref={bottomSheetRefNewOrder}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          }}
          onClose={handleBottomSheetNewOrderClose}
        >
          <BottomSheetView>
            <SwipeOverlay />
          </BottomSheetView>
        </BottomSheet>

        {/* Handing Past Order */}
        <BottomSheet
          ref={bottomSheetRefPastOrder}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          }}
          onClose={handleBottomSheetPastOrderClose}
        >
          <BottomSheetView>
            <H4>past order</H4>
          </BottomSheetView>
        </BottomSheet>

        {/* Handing Selling */}
        <BottomSheet
          ref={bottomSheetRefSelling}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          }}
          onClose={handleBottomSheetSellingClose}
        >
          <BottomSheetView>
            <H4>Selling</H4>
          </BottomSheetView>
        </BottomSheet>

        {/* Handing Pending */}
        <BottomSheet
          ref={bottomSheetRefPending}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
          borderTopRightRadius: 60,
          borderTopLeftRadius: 60,
          }}
          onClose={handleBottomSheetPendingClose}
        >
          <BottomSheetView>
            <H4>Pending</H4>
          </BottomSheetView>
        </BottomSheet>          

        <Navbar screenName='Cart' />
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  container: {
    alignItems: 'center',
    // backgroundColor: Theme.overlay,
    width: '30%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
