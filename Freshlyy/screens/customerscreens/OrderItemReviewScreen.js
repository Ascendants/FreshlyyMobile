import { React, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, H3, H6 } from '../../components/Texts';
import WriteItemReviewCard from '../../components/WriteItemReviewCard';
import ENV from '../../constants/env';

export default function ({ route, navigation }) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);

  //const [rating, setRating] = useState(0);
  //const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
          <H3>Write Review</H3>
          <H6> #{order?.orderId}</H6>
          <H4 style={styles.farmername}>From {order?.farmerName}</H4>
          {product?.map((item) => {
            return (
              <WriteItemReviewCard
                key={item?.productid}
                title={item?.title}
                imageUrl={item?.imageUrl} //should be taken from Products table
                uPrice={item?.uPrice}
                qty={item?.qty}
              />
            );
          })}

          <Button
            title='Save Review'
            color='shadedPrimary'
            size='normal'
            style={styles.save}
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
