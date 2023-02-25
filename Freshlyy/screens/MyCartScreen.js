import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import ProductView from '../components/ProductView';
import ENV from '../constants/env';
import ModalComponent from '../components/ModalComponent';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ({ navigation, route }) {
  const [cart, setCart] = React.useState([]);
  // const [total, setTotal] = React.useState(0);
  React.useState(() => {
    fetch(ENV.backend + '/customer/cart/', {
      method: 'GET',
      headers: {
        userEmail: route.params.userEmail,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.cart) throw new Error('Malformed Response');
        setCart(res.cart);
      })
      .catch((err) => console.log(err));
  }, []);

  const [modal, setModal] = React.useState(false);
  // const [selectedQuantity, setSelectedQuantity] = React.useState(0);
  // const [product, setProduct] = React.useState({
  //   purl: route.params.purl,
  //   imageUrls: [],
  // });

  // function increaseQuantity() {
  //   setSelectedQuantity((curr) => curr + product.minQtyIncrement);
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
  //       // setLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <ModalComponent visible={modal} closeModal={()=>setModal(false)}>
          <CartCard
              imgUrl={require('../assets/carrot.jpg')}
              title="Sri Lankan Carrots"
              seller="Haritha"
              quantity={1}
              amt={1250}
            />
            {/* <View style={styles.qtyArea}>
                    <Button
                      size='big'
                      color='shadedPrimary'
                      title={
                        <Feather name='minus' size={24} color={Theme.primary} />
                      }
                      onPress={decreaseQuantity}
                    />
                    <H3 style={{ width: 100, textAlign: 'center' }}>
                      {selectedQuantity} KG
                    </H3>
                    <Button
                      size='big'
                      color='filledPrimary'
                      title={
                        <Ionicons
                          name='add-outline'
                          size={24}
                          color={Theme.contrastTextColor}
                        />
                      }
                      onPress={increaseQuantity}
                    />
                  </View>
                  <Button
                    size='big'
                    color='shadedPrimary'
                    title='Update Cart'
                  /> */}
        </ModalComponent>
        <Button title='toggle' onPress={()=>setModal((prev)=>!prev)}/>
        <Header />
        <H2>My Cart</H2>
        <ScrollView
          howsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {cart.map((farmer) =>
            farmer.items.map((item) => (
              <ProductView key={item.item} product={item} />
            ))
          )}
          {/* <CartCard
						imgUrl={require('../assets/carrot.jpg')}
						title="Sri Lankan Carrots"
						seller="Haritha"
						quantity={1}
						amt={1250}
					/>

					<CartCard
						imgUrl={require('../assets/carrot.jpg')}
						title="Sri Lankan Carrots"
						seller="Haritha"
						quantity={1}
						amt={1250}
					/>
					<CartCard
						imgUrl={require('../assets/carrot.jpg')}
						title="Sri Lankan Carrots"
						seller="Haritha"
						quantity={1}
						amt={1250}
					/>
					<CartCard
						imgUrl={require('../assets/carrot.jpg')}
						title="Sri Lankan Carrots"
						seller="Haritha"
						quantity={1}
						amt={1250}
					/> */}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.left}>
            <H3>Total</H3>
            <Pr fontSize={35}>3550</Pr>
          </View>
          <View style={styles.right}>
            <Button size='big' color='filledPrimary' title='Checkout' />
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
