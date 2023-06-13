import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H4, H3, Pr } from '../../components/Texts';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ProductView from '../../components/ProductView';
import ENV from '../../constants/env';
import Navbar from '../../components/Navbar';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const getData = React.useCallback(async () => {
    return fetch(ENV.backend + '/customer/cart/', {
      method: 'GET',
      headers: {
        Authorization: route.params?.auth,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cart) throw new Error('Malformed Response');
        setCart(res.cart);
      })
      .catch((err) => console.log(err));
  }, [route]);
  React.useEffect(() => {
    let ctotal = 0;
    cart?.map((farmer) =>
      farmer.items.map((item) => {
        return (ctotal += item.uPrice * item.qty);
      })
    );
    setTotal(ctotal);
  }, [cart]);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        {/* <Button title='toggle' onPress={() => setModal((prev) => !prev)} /> */}
        <Header />
        <H3>My Cart</H3>
        <RefreshView getData={getData} route={route} style={styles.container}>
          <View>
            {cart.map((farmer) =>
              farmer.items.map((item) => {
                return (
                  <ProductView
                    key={item.item}
                    product={item}
                    auth={route.params.auth}
                    getData={getData}
                  />
                );
              })
            )}
          </View>
          {cart.length === 0 && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Image
                style={{
                  width: 250,
                  height: 250,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={require('../../assets/emptycart.png')}
              />
              <H4 style={{ textAlign: 'center' }}>
                Your cart is empty.{'\n'}Let's go shopping!
              </H4>
            </View>
          )}
        </RefreshView>
        {cart.length !== 0 && (
          <View style={styles.bottomContainer}>
            <View style={styles.left}>
              <H3>Total</H3>
              <Pr fontSize={20}>{total}</Pr>
            </View>
            <View style={styles.right}>
              <Button
                size='big'
                color='filledPrimary'
                title='Checkout'
                onPress={() => navigation.navigate('Checkout')}
              />
            </View>
          </View>
        )}
        <Navbar cart={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  bottomContainer: {
    backgroundColor: Theme.overlayShade,
    height: 130,
    width: '90%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 80,
  },
  left: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  qtyArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
