import { React, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, H3, H6 } from '../../components/Texts';
import WriteItemReviewCard from '../../components/WriteItemReviewCard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ENV from '../../constants/env';

export default function ({ route, navigation }) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  //const [review, setReview] = useState([]);

  const validationSchema = Yup.object().shape({
    review: Yup.string().min(2, 'Location name is too short!'),
  });

  const formik = useFormik({
    initialValues: {
      review: '',
    },
    validationSchema: validationSchema,
  });

  async function setReview() {
    try {
      formik.validateForm();
      Object.keys(formik.values).forEach((value) => {
        formik.setFieldTouched(value);
      });
      if (!Object.keys(formik.touched).length) return;
      for (let error in formik.errors) if (error) return;
      const data = formik.values;
      console.log(data);

      const result = await fetch(
        ENV.backend + '/customer/write-review' + itemId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        navigation.navigate('Reviewed Order');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function setReview(review) {
  //   try {
  //     const result = await fetch(
  //       ENV.backend + '/customer/write-review' + order.items.itemID,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Authorization: route.params.auth,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(review),
  //       }
  //     );
  //     const res = await result.json();
  //     console.log(res);
  //     if (res.message == 'Success') {
  //       getData();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
                onChangeText={formik.handleChange('review')}
                value={formik.values.review}
                error={formik.errors.review}
                touched={formik.touched.review}
              />
            );
          })}

          <Button
            title='Save Review'
            color='shadedPrimary'
            size='normal'
            style={styles.save}
            onPress={setReview}
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
    height: '100%',
    marginBottom: 30,
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
