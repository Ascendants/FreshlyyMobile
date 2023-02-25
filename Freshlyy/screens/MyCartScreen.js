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

export default function ({ navigation, route }) {
  const [cart, setCart] = React.useState([]);
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
  return (
    <SafeAreaView>
      <View style={styles.screen}>
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
});
