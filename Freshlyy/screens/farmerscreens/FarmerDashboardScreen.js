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
import SwipeOverlayCard from '../../components/SwipeOverlayCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import { H4, H3, H5 } from '../../components/Texts';
import RefreshView from '../../components/RefreshView';
import { set } from 'date-fns';

export default function ({ navigation, route }) {
  const [userData, setUserData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isBottomSheetNewOrderVisible, setIsBottomSheetNewOrderVisible] =
    useState(false);
  const [isBottomSheetPastOrderVisible, setIsBottomSheetPastOrderVisible] =
    useState(false);
  const [isBottomSheetSellingVisible, setIsBottomSheetSellingVisible] =
    useState(false);
  const [isBottomSheetPendingVisible, setIsBottomSheetPendingVisible] =
    useState(false);

  const bottomSheetRefNewOrder = useRef(null);
  const bottomSheetRefPastOrder = useRef(null);
  const bottomSheetRefSelling = useRef(null);
  const bottomSheetRefPending = useRef(null);
  const bottomSheetRefToDeliver = useRef(null);
  const bottomSheetRefWillPickup = useRef(null);
  const snapPoints = ['100%', '60%'];

  const [pageData, setPageData] = useState({
    newOrdersList: [],
    pastOrdersList: [],
    sellingList: [],
    pendingList: [],
    sellingProducts: '',
    pendingProducts: '',
    newOrders: '',
    pastOrders: '',
  });
  const handleBottomSheetNewOrderClose = () => {
    setIsBottomSheetNewOrderVisible(false);
  };

  const handleNewOrderBottomSheet = () => {
    setIsBottomSheetNewOrderVisible(true);
    bottomSheetRefNewOrder.current.expand();
  };

  // const handleBottomSheetToDeliverClose = () => {
  //   setIsBottomSheetNewOrderVisible(false);
  // };

  const handleToDeliverBottomSheet = () => {
    // setIsBottomSheetNewOrderVisible(true);
    bottomSheetRefToDeliver.current.expand();
  };

  // const handleBottomSheetWillPickupClose = () => {
  //   setIsBottomSheetNewOrderVisible(false);
  // };

  const handleWillPickupBottomSheet = () => {
    // setIsBottomSheetNewOrderVisible(true);
    bottomSheetRefWillPickup.current.expand();
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
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setUserData(res.user);
        setPageData({
          newOrdersList: res.newOrderDetailsList,
          pastOrdersList: res.pastOrderDetailsList,
          sellingList: res.liveProductsList,
          pendingList: res.pendingProductsList,
          sellingProducts: res.liveProducts,
          pendingProducts: res.pendingProducts,
          newOrders: res.newOrders,
          pastOrders: res.pastOrders,
          toDeliver: res.toDeliver,
          willPickup: res.willPickup,
          toDeliverOrdersList: res.toDeliverOrdersList,
          willPickupOrdersList: res.willPickupOrdersList,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View style={styles.screen}>
          <Header
            farmer={true}
            notification={true}
            notifMode={'farmer'}
            hasNotifications={userData?.notifications}
          />
          <RefreshView getData={getData} route={route}>
            <InfoCardDB
              user={userData}
              goToBalances={() => navigation.navigate('Farmer Balance')}
            />
            <H4 style={styles.headings}>My Orders</H4>
            <View style={styles.cardContainer}>
              <DashBoardCard
                imageUri={require('../../assets/gift.png')}
                number={pageData.newOrders}
                text='New Orders'
                onPress={handleNewOrderBottomSheet}
              />
              <DashBoardCard
                imageUri={require('../../assets/gift.png')}
                number={pageData.toDeliver}
                text='To Deliver'
                onPress={handleToDeliverBottomSheet}
              />
              <DashBoardCard
                imageUri={require('../../assets/gift.png')}
                number={pageData.willPickup}
                text='Will Pickup'
                onPress={handleWillPickupBottomSheet}
              />
              <DashBoardCard
                imageUri={require('../../assets/box.png')}
                number={pageData.pastOrders}
                text='Past Orders'
                onPress={handlePastOrderBottomSheet}
              />
            </View>
            <H4 style={styles.headings}>My Listings</H4>
            <View style={styles.cardContainer}>
              <DashBoardCard
                imageUri={require('../../assets/trade.png')}
                number={pageData.sellingProducts}
                text='Selling'
                onPress={handleSeliingBottomSheet}
              />
              <DashBoardCard
                imageUri={require('../../assets/pending.png')}
                number={pageData.pendingProducts}
                text='Pending'
                onPress={handlePendingBottomSheet}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size='big'
                color='shadedPrimary'
                title='Add new produce listing'
                onPress={() => navigation.navigate('Insert Product')}
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
              <View style={styles.containerOverlay}>
                <H4 style={styles.topic}>New Orders</H4>
                <View style={styles.containerOverlay}>
                  {pageData.newOrdersList?.length > 0 ? (
                    pageData.newOrdersList?.map((order, index) => {
                      return (
                        <View style={styles.newOrdersContainer} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Order Status Update', {
                                orderId: order.orderId,
                              });
                            }}
                          >
                            <H5>
                              {order.customerFirstName} {order.customerLastName}{' '}
                              has ordered
                            </H5>
                            {order.itemDetails.map((item, index) => (
                              <H5
                                key={index}
                                style={{ color: Theme.secondary }}
                              >
                                {item.qty} {item.unit} of {item.title}
                              </H5>
                            ))}
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  ) : (
                    <H4 style={styles.noItemsContainer}>No New Orders</H4>
                  )}
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
          {/* Handing Deliver Order */}
          <BottomSheet
            ref={bottomSheetRefToDeliver}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{
              borderTopRightRadius: 60,
              borderTopLeftRadius: 60,
            }}
          >
            <BottomSheetView>
              <View style={styles.containerOverlay}>
                <H4 style={styles.topic}>To Deliver</H4>
                <View style={styles.containerOverlay}>
                  {pageData.toDeliverOrdersList?.length > 0 ? (
                    pageData.toDeliverOrdersList?.map((order, index) => {
                      return (
                        <View style={styles.newOrdersContainer} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Order Status Update', {
                                orderId: order.orderId,
                              });
                            }}
                          >
                            <H5>
                              {order.customerFirstName} {order.customerLastName}{' '}
                              has ordered
                            </H5>
                            {order.itemDetails.map((item, index) => (
                              <H5
                                key={index}
                                style={{ color: Theme.secondary }}
                              >
                                {item.qty} {item.unit} of {item.title}
                              </H5>
                            ))}
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  ) : (
                    <H4 style={styles.noItemsContainer}>
                      No orders to deliver
                    </H4>
                  )}
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
          {/* Handing Pickup Order */}
          <BottomSheet
            ref={bottomSheetRefWillPickup}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{
              borderTopRightRadius: 60,
              borderTopLeftRadius: 60,
            }}
          >
            <BottomSheetView>
              <View style={styles.containerOverlay}>
                <H4 style={styles.topic}>Customer Will Pickup</H4>
                <View style={styles.containerOverlay}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {pageData.willPickupOrdersList?.length > 0 ? (
                      pageData.willPickupOrdersList.map((order, index) => (
                        <View style={styles.newOrdersContainer} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Order Status Update', {
                                orderId: order.orderId,
                              });
                            }}
                          >
                            <H5>
                              {order.customerFirstName} {order.customerLastName}{' '}
                              has ordered
                            </H5>
                            {order.itemDetails.map((item, index) => (
                              <H5
                                key={index}
                                style={{ color: Theme.secondary }}
                              >
                                {' '}
                                {item.qty} {item.unit} of {item.title}
                              </H5>
                            ))}
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : (
                      <H4 style={styles.noItemsContainer}>No Past Orders</H4>
                    )}
                  </ScrollView>
                </View>
              </View>
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
              <View style={styles.containerOverlay}>
                <H4 style={styles.topic}>Past Orders</H4>
                <View style={styles.containerOverlay}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {pageData.pastOrdersList?.length > 0 ? (
                      pageData.pastOrdersList.map((order, index) => (
                        <View style={styles.newOrdersContainer} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Order Status Update', {
                                orderId: order.orderId,
                              });
                            }}
                          >
                            <H5>
                              {order.customerFirstName} {order.customerLastName}{' '}
                              has ordered
                            </H5>
                            {order.itemDetails.map((item, index) => (
                              <H5
                                key={index}
                                style={{ color: Theme.secondary }}
                              >
                                {' '}
                                {item.qty} {item.unit} of {item.title}
                              </H5>
                            ))}
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : (
                      <H4 style={styles.noItemsContainer}>No Past Orders</H4>
                    )}
                  </ScrollView>
                </View>
              </View>
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
              <H4 style={styles.topic}>Selling Items</H4>
              <View style={styles.containerOverlay}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {pageData.sellingList?.length > 0 ? (
                    pageData.sellingList.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          navigation.navigate('Manage Product', {
                            productId: item._id,
                          })
                        }
                      >
                        <SwipeOverlayCard
                          imageUri={item.imageUrls}
                          name={item.title}
                          quantity={item.qtyAvailable}
                          unit={item.unit}
                          price={item.price}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <H4 style={styles.noItemsContainer}>No Selling Items</H4>
                  )}
                </ScrollView>
              </View>
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
              <H4 style={styles.topic}>Pending Items</H4>
              <View style={styles.containerOverlay}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {pageData.pendingList?.length > 0 ? (
                    pageData.pendingList.map((item, index) => (
                      <TouchableOpacity key={index}>
                        <SwipeOverlayCard
                          imageUri={item.imageUrls}
                          name={item.title}
                          quantity={item.qtyAvailable}
                          unit={item.unit}
                          price={item.price}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <H4 style={styles.noItemsContainer}>No Pending Items</H4>
                  )}
                </ScrollView>
              </View>
            </BottomSheetView>
          </BottomSheet>

          <Navbar />
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
  topic: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: Theme.primary,
  },
  containerOverlay: {
    width: '100%',
  },
  noItemsContainer: {
    alignSelf: 'center',
  },
  newOrdersContainer: {
    backgroundColor: Theme.tertiaryShade,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    // paddingRight: 5,
  },
});
