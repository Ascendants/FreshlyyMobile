import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from '../../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, P, H3, H5, H6 } from '../../components/Texts';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import ReviewedOrderCard from '../../components/ReviewedOrderCard';
import ReviewProductCard from '../../components/ReviewProductCard';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';

export default function () {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [items, setItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [farmer, setFarmer] = useState([]);

  async function follow() {
    try {
      const result = await fetch(
        ENV.backend + '/customer/follow/' + farmer?.farmerId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async function unfollow() {
    try {
      const result = await fetch(
        ENV.backend + '/customer/unfollow/' + farmer?.farmerId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async function getFarmerData() {
    try {
      const result = await fetch(
        ENV.backend + '/customer/farmerDetail/haritha@hasathcharu.com',
        {
          method: 'GET',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        setFarmer(res.farmer);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  // const getFarmerData = (isRefreshing) => {
  //   isRefreshing ? setRefreshing(true) : setLoaded(false);
  //   fetch(ENV.backend + '/customer/farmerDetail/haritha@hasathcharu.com', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: route.params.auth,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.message == 'Success') {
  //         setFarmer(res.farmer);
  //       }
  //       isRefreshing ? setRefreshing(false) : setLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/orderDetail/641421775bbd0f10a17cf24e', {
      //getting data from the backend (all products)
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
          setItem(res.order.items);
          setOrder(res.order);
          setProduct(res.product);
          console.log(res);
        }
        isRefreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    //getFarmerData();
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Order</H3>
          <H6> #{order?.orderId}</H6>
          <H4 style={styles.farmername}>From {order?.farmerName} </H4>
          {product?.map((item) => {
            return (
              <ReviewedOrderCard
                title={item?.title}
                imageUrl={item?.imageUrl} //should be taken from Products table
                uPrice={item?.uPrice}
                qty={item?.qty}
              />
            );
          })}
          <H4 style={styles.delivery}>Rate the Delivery</H4>
          <View style={styles.rating}>
            <Rating value={order?.deliverRating}></Rating>
          </View>

          <H4 style={styles.communi}>Rate the Farmer</H4>
          <View style={styles.rating}>
            <Rating value={order?.farmerRating}></Rating>
          </View>

          <Button
            title='Edit Review'
            color='shadedPrimary'
            size='normal'
            style={styles.edit}
          />
          <View style={styles.contaniner}>
            <Image source={{ uri: farmer?.farmerImage }} style={styles.image} />
            <View style={styles.innercontaniner}>
              <View style={styles.textName}>
                <H5 style={styles.name}>{farmer?.farmerName}</H5>
              </View>
              <Rating value={farmer?.overallRating} />
              <Button
                title='View Review'
                color='shadedSecondary'
                size='normal'
              />
            </View>
          </View>
          <View style={styles.contaniner2}>
            <View style={styles.actionButtonContainer}>
              <Button
                icon={
                  <Feather
                    name='message-circle'
                    size={24}
                    color={Theme.textColor}
                  />
                }
                title='Chat'
                type='icon'
                size='small'
                color='shadedTertiary'
              />
              <Button
                type='icon'
                icon={
                  <Ionicons
                    name='ios-share-outline'
                    size={24}
                    color={Theme.textColor}
                  />
                }
                title='Share'
                size='small'
                color='shadedTertiary'
              />
              <Button
                type='icon'
                icon={
                  <Ionicons
                    name='alert-circle-outline'
                    size={24}
                    color={Theme.textColor}
                  />
                }
                title='Report'
                size='small'
                color='shadedTertiary'
              />
            </View>
            <Button
              title='Following'
              color='filledPrimary'
              size='normal'
              style={styles.btn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
    margin: 10,
  },
  farmername: {
    color: 'blue',
  },
  delivery: {
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  communi: {
    marginTop: 5,
    marginBottom: 5,
  },
  rating: {
    marginBottom: 5,
  },
  edit: {
    marginTop: 40,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 100,
  },
  name: {
    color: Theme.primary,
    justifyContent: 'center',
  },
  Rating: {
    justifyContent: 'center',
  },
  H4: {
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
  contaniner: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  innercontaniner: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    justifyContent: 'space-between',
    //alignItems:'right',
  },
  contaniner2: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
    margin: 20,
    justifyContent: 'center',
  },
  btn: {
    height: '90%',
    marginVertical: 10,
  },
});
