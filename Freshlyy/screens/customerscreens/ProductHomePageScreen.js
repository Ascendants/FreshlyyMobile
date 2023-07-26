import { contains } from '@firebase/util';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { H1, H2, H3, H4, H7, H6, P } from '../../components/Texts';
import Theme from '../../constants/theme';
import { FilledBigButton } from '../../components/Buttons';
import theme from '../../constants/theme';
import {
  findFocusedRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Rate5 } from '../../components/Rate5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Animations } from '../../constants/Animation';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';

export default function ({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filterproducts, setFilterProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [sortByDeliveryCost, setSortByDeliveryCost] = useState(false);
  const [sortByDeliveryBelow200, setSortByDeliveryBelow200] = useState(false);
  const [sortByDeliveryBelow300, setSortByDeliveryBelow300] = useState(false);
  const [sortByRating4, setSortByRating4] = useState(false);
  const [sortByRating3, setSortByRating3] = useState(false);
  const [sortByBestMatch, setSortByBestMatch] = useState(true);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['60%', '100%'];

  const sendToProductDetail = async (pubUrl, distanceAway) => {
    navigation.navigate('Product Detail', {
      purl: pubUrl,
      distanceAway: distanceAway,
    });
  };

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/mainpage/', {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
        useremail: 'gimhani@freshlyy.com',
        Authorization: route.params?.auth,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res.mainPageProducts);
        isRefreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLikePress = async (productId) => {
    // Send a POST request to update the product's likes array in MongoDB
    const response = await fetch(`/customer/${productId}/like`, {
      method: 'POST',
      body: JSON.stringify({ email: 'gimhani@freshlyy.com' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    // Update the local products state with the updated product data
    setProducts(products.map((p) => (p._id === data._id ? data : p)));
  };

  const setAllFalse = () => {
    setSortByBestMatch(false);
    setSortByPrice(false);
    setSortByRating4(false);
    setSortByRating3(false);
    setSortByDistance(false);
    setSortByDeliveryCost(false);
    setSortByDeliveryBelow200(false);
    setSortByDeliveryBelow300(false);
  };

  const handleSearch = (query) => {
    setSearchText(query);
  };

  const handleBestMatchSort = () => {
    setAllFalse();
    setSortByBestMatch(true);
  };

  const handlePriceSort = () => {
    setAllFalse();
    setSortByPrice(true);
  };
  const handleDistanceSort = () => {
    setAllFalse();
    setSortByDistance(true);
  };

  const handleDeliverySort = () => {
    setAllFalse();
    setSortByDeliveryCost(true);
  };
  const handleDeliverySortBelow200 = () => {
    setAllFalse();
    setSortByDeliveryBelow200(true);
    const filtered = products.filter((product) => product.deliveryCost <= 200);
    setFilterProducts(filtered);
  };
  const handleDeliverySortBelow300 = () => {
    setAllFalse();
    setSortByDeliveryBelow300(true);
    const filtered = products.filter((product) => product.deliveryCost <= 300);
    setFilterProducts(filtered);
  };

  const handleOverallRatingSort4 = () => {
    setAllFalse();
    setSortByRating4(true);
    const filtered = products.filter((product) => product.overallRating >= 4);
    setFilterProducts(filtered);
  };

  const handleOverallRatingSort3 = () => {
    setAllFalse();
    setSortByRating3(true);
    const filtered = products.filter((product) => product.overallRating >= 3);
    setFilterProducts(filtered);
  };

  const sortedProducts = sortByPrice
    ? products.slice().sort((a, b) => a.price - b.price)
    : sortByRating4
    ? filterproducts.slice().sort((a, b) => a.overallRating - b.overallRating)
    : sortByRating3
    ? filterproducts.slice((a, b) => a.overallRating - b.overallRating)
    : sortByDistance
    ? products.slice().sort((a, b) => a.distance - b.distance)
    : sortByDeliveryCost
    ? products.slice().sort((a, b) => a.deliveryCost - b.deliveryCost)
    : sortByDeliveryBelow200
    ? filterproducts.slice().sort((a, b) => a.deliveryCost - b.deliveryCost)
    : sortByDeliveryBelow300
    ? filterproducts.slice().sort((a, b) => a.deliveryCost - b.deliveryCost)
    : sortByBestMatch
    ? products
    : null;

  const filteredProducts = sortedProducts?.filter((product) => {
    return product?.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleFilterClick = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current.expand();
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetVisible(false);
  };
  const animation = Animations[Math.floor(Math.random() * Animations.length)];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header back={true} />

        <View style={styles.screen}>
          <View style={styles.searchContainer}>
            <View style={styles.searchCont}>
              <AntDesign
                name='search1'
                size={20}
                color='black'
                style={styles.searchico}
              />
              <TextInput
                placeholder='Search produce'
                value={searchText}
                style={styles.searchinput}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
          </View>

          <View style={styles.filterCont}>
            <TouchableOpacity onPress={handleBestMatchSort}>
              <View style={styles.filterSelect}>
                <AntDesign
                  name='arrowdown'
                  size={24}
                  style={
                    sortByBestMatch
                      ? { color: Theme.primary }
                      : { color: 'black' }
                  }
                />
                <H6 style={sortByBestMatch ? { color: Theme.primary } : {}}>
                  Best match
                </H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePriceSort}>
              <View style={styles.filterSelect}>
                <Ionicons
                  name='swap-vertical'
                  size={24}
                  style={
                    sortByPrice ? { color: Theme.primary } : { color: 'black' }
                  }
                />
                <H6 style={sortByPrice ? { color: Theme.primary } : {}}>
                  Price
                </H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDistanceSort}>
              <View style={styles.filterSelect}>
                <Ionicons
                  name='swap-vertical'
                  size={24}
                  style={
                    sortByDistance
                      ? { color: Theme.primary }
                      : { color: 'black' }
                  }
                />
                <H6 style={sortByDistance ? { color: Theme.primary } : {}}>
                  Distance
                </H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFilterClick}>
              <View style={styles.filterSelect}>
                <Ionicons name='filter' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.productsContainer}>
            {!loaded ? (
              <Loading />
            ) : (
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{
                  flexGrow: 1,
                  // alignItems: 'center',
                }}
                numColumns={2}
                data={filteredProducts}
                refreshing={refreshing}
                onRefresh={getData}
                renderItem={({ item, index }) => (
                  <Animatable.View
                    animation={animation}
                    duration={1000}
                    delay={index * 300}
                    style={{ width: '50%' }}
                  >
                    <ProductCard
                      animation={animation}
                      prodId={item._id}
                      farmerName={item.farmerName}
                      title={item.title}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      unit={item.unit}
                      overallRating={item.overallRating}
                      likes={item.likes}
                      userID={route.params.userEmail}
                      onLikePress={handleLikePress}
                      bestMatch={sortByBestMatch}
                      cheaper={item.cheaper}
                      publicUrl={item.publicUrl}
                      distanceAway={
                        sortByDistance || sortByBestMatch
                          ? item.distanceAway
                          : null
                      }
                      onPress={() =>
                        sendToProductDetail(item.publicUrl, item.distance)
                      }
                    />
                  </Animatable.View>
                )}
                keyExtractor={(prod, index) => prod._id}
              />
            )}
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              backgroundStyle={{
                borderTopRightRadius: 60,
                borderTopLeftRadius: 60,
              }}
              onClose={handleBottomSheetClose}
            >
              <BottomSheetView>
                <View style={styles.bottomSheetContent}>
                  <H3 style={styles.filterText}>Sort BY</H3>
                  <View style={styles.filterCont}>
                    <TouchableOpacity onPress={handleBestMatchSort}>
                      <View style={styles.filterSelect}>
                        <AntDesign
                          name='arrowdown'
                          size={24}
                          style={
                            sortByBestMatch
                              ? { color: Theme.primary }
                              : { color: 'black' }
                          }
                        />
                        <H6
                          style={
                            sortByBestMatch ? { color: Theme.primary } : {}
                          }
                        >
                          Best match
                        </H6>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDistanceSort}>
                      <View style={styles.filterSelect}>
                        <Ionicons
                          name='swap-vertical'
                          size={24}
                          style={
                            sortByDistance
                              ? { color: Theme.primary }
                              : { color: 'black' }
                          }
                        />
                        <H6
                          style={sortByDistance ? { color: Theme.primary } : {}}
                        >
                          Distance
                        </H6>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePriceSort}>
                      <View style={styles.filterSelect}>
                        <Ionicons
                          name='swap-vertical'
                          size={24}
                          style={
                            sortByPrice
                              ? { color: Theme.primary }
                              : { color: 'black' }
                          }
                        />
                        <H6 style={sortByPrice ? { color: Theme.primary } : {}}>
                          Price
                        </H6>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={handleDeliverySort}>
                    <View style={styles.centerFilter}>
                      <Ionicons
                        name='swap-vertical'
                        size={24}
                        style={
                          sortByDeliveryCost
                            ? { color: Theme.primary }
                            : { color: 'black' }
                        }
                      />
                      <H6
                        style={
                          sortByDeliveryCost ? { color: Theme.primary } : {}
                        }
                      >
                        Delivery Cost
                      </H6>
                    </View>
                  </TouchableOpacity>

                  <H3 style={styles.filterText}>Filter By</H3>
                  <H4>Rating</H4>
                  <View style={styles.ratingCont}>
                    <TouchableOpacity onPress={handleOverallRatingSort4}>
                      <View style={styles.filterByCont}>
                        <Rate5 value='4' />
                        <P
                          style={
                            sortByRating4
                              ? {
                                  color: Theme.primary,
                                  fontWeight: 'bold',
                                  fontSize: 17,
                                }
                              : { fontWeight: 'bold', fontSize: 17 }
                          }
                        >
                          & UP
                        </P>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleOverallRatingSort3}>
                      <View style={styles.filterByCont}>
                        <Rate5 value='3' />
                        <P
                          style={
                            sortByRating3
                              ? {
                                  color: Theme.primary,
                                  fontWeight: 'bold',
                                  fontSize: 17,
                                }
                              : { fontWeight: 'bold', fontSize: 17 }
                          }
                        >
                          & UP
                        </P>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <H4>Delivery Cost</H4>
                  <View style={styles.ratingCont}>
                    <TouchableOpacity onPress={handleDeliverySortBelow200}>
                      <View style={styles.filterByCont}>
                        <P
                          style={
                            sortByDeliveryBelow200
                              ? {
                                  color: Theme.primary,
                                  fontWeight: 'bold',
                                  fontSize: 17,
                                }
                              : { fontWeight: 'bold', fontSize: 17 }
                          }
                        >
                          Below 200
                        </P>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDeliverySortBelow300}>
                      <View style={styles.filterByCont}>
                        <P
                          style={
                            sortByDeliveryBelow300
                              ? {
                                  color: Theme.primary,
                                  fontWeight: 'bold',
                                  fontSize: 17,
                                }
                              : { fontWeight: 'bold', fontSize: 17 }
                          }
                        >
                          Below 300
                        </P>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
          <Navbar product={true} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchico: {
    paddingRight: 10,
  },
  searchinput: {
    width: '87%',
  },
  searchContainer: {
    alignItems: 'center',
  },
  searchCont: {
    display: 'flex',
    backgroundColor: 'red',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.overlay,
    width: '90%',
    borderRadius: 20,
    marginVertical: 10,
  },
  filterCont: {
    display: 'flex',
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  filterSelect: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  productsContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 70,
  },
  bottomSheetContent: {
    color: 'blue',
    padding: 5,
    paddingHorizontal: 25,
  },
  filterText: {
    textAlign: 'center',
    paddingVertical: 15,
  },
  centerFilter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  filterByCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 10,
    backgroundColor: Theme.overlay,
    borderRadius: 10,
    width: 133,
    height: 36,
  },
  filterByText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  ratingCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
