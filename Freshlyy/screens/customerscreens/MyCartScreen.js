import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../../components/Texts';
import { Button } from '../../components/Buttons';
import Header from '../../components/Header';
import CartCard from '../../components/CartCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import ProductView from '../../components/ProductView';
import ENV from '../../constants/env';
import ModalComponent from '../../components/ModalComponent';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ({ navigation, route }) {
  const [cart, setCart] = React.useState([]);
  let totalPrice = 0;
  const [total, setTotal] = React.useState(0);
  React.useState(() => {
    fetch(ENV.backend + '/customer/cart/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cart) throw new Error('Malformed Response');
        setCart(res.cart);
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    let ctotal = 0;
    cart.map((farmer) =>
      farmer.items.map((item) => {
        return (ctotal += item.uPrice * item.qty);
      })
    );
    setTotal(ctotal);
  }, [cart]);
  // const [modal, setModal] = React.useState(false);

  // const [selectedQuantity, setSelectedQuantity] = React.useState(0);
  // const [product, setProduct] = React.useState({
  //   purl: route.params.purl,
  //   imageUrls: [],
  // });

  // function increaseQuantity() {
  //   const newQuantity = selectedQuantity + product.minQtyIncrement;
  //   fetch(ENV.backend + '/public/product/' + product.purl, {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const availableQuantity = res.product.qtyAvailable;
  //       if (newQuantity <= availableQuantity) {
  //         setSelectedQuantity(newQuantity);
  //       } else {
  //         alert('Not enough quantity available');
  //       }
  //   })
  //   .catch((err) => console.log(err));
  // }
  // function decreaseQuantity() {
  //   setSelectedQuantity((curr) =>
  //     Math.max(curr - product.minQtyIncrement, product.minQtyIncrement)
  //   );
  // }

  // React.useEffect(() => {
  //   const purl = product.purl;
  //   fetch(ENV.backend + '/public/product/' + purl, {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setProduct((prev) => {
  //         return { ...prev, ...res.product };
  //       });
  //       setSelectedQuantity(res.product.minQtyIncrement);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Button title='toggle' onPress={() => setModal((prev) => !prev)} />
        <Header />
        <H2>My Cart</H2>
        <ScrollView
          howsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {cart.map((farmer) =>
            farmer.items.map((item) => {
              return <ProductView key={item.item} product={item} />;
            })
          )}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.left}>
            <H3>Total</H3>
            <Pr fontSize={35}>{total}</Pr>
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
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  left: {
    paddingTop: 20,
    paddingLeft: 20,
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
