import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from '../../components/Inputs';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, P, H3, H1 } from '../../components/Texts';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';
import ProductDeatilCard from '../../components/ProductDetailCard';
import Loading from '../../components/Loading';

export default function ({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [farmer, setFarmer] = useState({});
  const [loaded, setLoaded] = useState(false);

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

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/farmerDetail/' + route.params.farmer, {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
          setFarmer(res.farmer);
          setProducts(res.products);
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
          <View>
            <Image
              source={{ uri: farmer?.farmerImage?.imageUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.textName}>
            <H3 style={styles.name}>{farmer?.farmerName}</H3>
          </View>
          {/* <Rating value={products.overallRating} /> */}
          {/* <H4>{product.noOfReviews}</H4> */}
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
              size='normal'
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
              size='normal'
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
              size='normal'
              color='shadedTertiary'
            />
          </View>
          <Button
            title={farmer?.isFollowing ? 'Following' : 'Follow'}
            color={farmer?.isFollowing ? 'filledPrimary' : 'shadedPrimary'}
            size='normal'
            onPress={farmer?.isFollowing ? unfollow : follow}
          />
          <H3>Popular Products</H3>
        </View>
        <ScrollView horizontal={true}>
          {products?.map((product) => {
            return (
              <ProductDeatilCard
                key={product?.productid}
                title={product?.title}
                imageUrl={product?.imageUrl}
                price={product?.uPrice}
                overallRating={product?.overallRating}
              />
            );
          })}
        </ScrollView>
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
    margin: 20,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    color: Theme.primary,
    justifyContent: 'center',
  },
  Rating: {
    justifyContent: 'center',
  },
  H3: {
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
});
