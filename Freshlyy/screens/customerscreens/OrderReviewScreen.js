import { React, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, H3, H6 } from '../../components/Texts';
import ReviewProductCard from '../../components/ReviewProductCard';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';

export default function ({ route, navigation }) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // const handleRatingSubmit = async () => {
  //   try {
  //     const response = await fetch(
  //       ENV.backend + '/customer/rating-detail/641421775bbd0f10a17cf24e',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Authorization: route.params.auth,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ rating }),
  //       }
  //     );

  //     if (response.ok) {
  //       // Rating submitted successfully
  //       console.log('Rating saved in MongoDB!');
  //     } else {
  //       // Handle the error case
  //       console.log('Failed to save rating in MongoDB!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/orderDetail/641421775bbd0f10a17cf24e', {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
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
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Review Order</H3>
          <H6> #{order?.orderId}</H6>
          <H4 style={styles.farmername}>From {order?.farmerName}</H4>
          {product?.map((item) => {
            return (
              <ReviewProductCard
                key={item?.productid}
                title={item?.title}
                imageUrl={item?.imageUrl} //should be taken from Products table
                uPrice={item?.uPrice}
                qty={item?.qty}
                rating={item?.rating}
                revie={item?.review}
              />
            );
          })}

          <H4 style={styles.delivery}>Rate the Delivery</H4>
          <View style={styles.rating}>
            <Rating value={order?.deliveryRating}></Rating>
          </View>

          <H4 style={styles.communi}>Rate the Farmer</H4>
          <View style={styles.rating}>
            <Rating style={styles.rating} value={order?.farmerRating}></Rating>
          </View>

          <Button
            title='Write Review'
            color='shadedPrimary'
            size='normal'
            style={styles.save}
            onPress={() => navigation.navigate('Order Item Review')}
          />
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
    margin: 30,
  },
  farmername: {
    color: 'blue',
  },
  delivery: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
  },
  communi: {
    marginTop: 20,
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },
  save: {
    marginTop: 40,
  },
});
