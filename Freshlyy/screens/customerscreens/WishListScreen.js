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
  const [wishList, setWishList] = React.useState([]);
  React.useState(() => {
    fetch(ENV.backend + '/customer/wishList/', {
      method: 'GET',
      headers: {
        userEmail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.wishList) throw new Error('Malformed Response');
        setWishList(res.wishList);
      })
      .catch((err) => console.log(err));
  }, []);

  const [modal, setModal] = React.useState(false);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header />
        <H2>My Wish List</H2>
        <ScrollView
          howsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {wishList.map((farmer) =>
            farmer.items.map((item) => {
              return <ProductView key={item.item} product={item} />;
            })
          )}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button
            size='big'
            color='filledPrimary'
            title='Add all the items to Cart'
            // onPress={() => navigation.navigate('Checkout')}
          />
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
    // height: 130,
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
