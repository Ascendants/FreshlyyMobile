import React, { useState, useEffect } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H1, H2, H3, H6, Pr } from '../../components/Texts';
import ENV from '../../constants/env';

export default function ({ navigation, route }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(ENV.backend + '/farmer/selling-product/' + route.params?.productId, {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Malformed Response');
        }
        const data = res.product;
        setProduct(data);
      })

      .catch((err) => console.log(err));
  }, []);
  function deleteProduct() {
    navigation.navigate('Delete Product', {
      productId: route.params?.productId,
      productTitle: product.title,
    });
  }
  // const image = product.imageUrls[0].imageUrl;
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H1 style={styles.AddText}>Selling Products</H1>
          {/* {imageUrl ? (
            <Image source={{ uri: image.imageUrl }} />
          ) : ( */}
          {product.imageUrls?.length && (
            <Image
              source={{ uri: product?.imageUrls[0].imageUrl }}
              style={styles.vectorimage}
            />
          )}

          {/* <Image
            source={require("../../assets/carrot.jpg")}
            style={styles.vectorimage}
          /> */}
          {/* <DatePicker/> */}
          <H6 style={styles.PText}>{product.title}</H6>
          <View style={styles.DeBox}>
            <H2 style={styles.DText}>Available Quantity</H2>
            <H1 style={styles.DText}>
              {product?.qtyAvailable}
              {product?.unit}
            </H1>
            <H2 style={styles.DText}>Minimum Quantity</H2>
            <H1 style={styles.DText}>
              {' '}
              {product.minQtyIncrement}
              {product.unit}
            </H1>
            <H2 style={styles.DText}>Price</H2>
            <Pr>
              <H1 style={styles.DText}>{product.price} </H1>
            </Pr>
            <H2 style={styles.DText}>Description</H2>
            <H1 style={styles.DText}>{product.description}</H1>
          </View>

          <View style={styles.buttcont}>
            <Button
              title='Edit'
              color='shadedPrimary'
              size='big'
              onPress={() =>
                navigation.navigate('Edit Product', {
                  productId: route.params.productId,
                })
              }
            />
            <Button
              title='Delete'
              color='shadedDanger'
              size='big'
              onPress={deleteProduct}
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
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  AddText: {
    // color: Theme.primary,
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 2,
  },
  PText: {
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  DText: {
    fontSize: 20,
    paddingBottom: 2,
  },
  DeBox: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: -10,
    backgroundColor: Theme.overlayShade,
    padding: 10,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: '80%',
  },
  inputcont: {
    position: 'relative',
    width: '100%',
  },

  buttcont: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 80,
    width: '80%',
  },
});
