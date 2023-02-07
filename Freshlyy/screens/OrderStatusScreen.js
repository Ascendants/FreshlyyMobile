import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr, H7, H6 } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { TextInputBox } from '../components/Inputs';
import OrderStatus from '../components/OrderStatus';

import { Formik } from 'formik';
import { Button } from '../components/Buttons';
import ModalComponent from '../components/ModalComponent';
import ENV from '../constants/env';
import TabMenu from '../components/TabMenu';
import OrderedProductView from '../components/OrderedProductView';
export default function ({ navigation, route }) {
  const [activeTab, setActiveTab] = React.useState(route.params.initialTab);
  function changeTab(tab) {
    setActiveTab(tab);
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2>Order</H2>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.ordersContainer}>
            <H7 style={styles.orderInfo}>#63b6b7b160d78bea22456aa8</H7>
            <H6 style={styles.orderInfoFarmer}>From Komuthu Fernando</H6>
            <OrderStatus />
            <View style={styles.pageArea}>
              <OrderedProductView
                product={{
                  imageUri:
                    'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/ProductImages%2FP001_1.jpg?alt=media&token=eb80b75a-b8e9-4b54-9e31-f4e4f40e9faa',
                  title: 'Sri Lankan Carrots',
                  uPrice: 1250,
                  qty: 2,
                }}
              />
              <OrderedProductView
                product={{
                  imageUri:
                    'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/ProductImages%2FP001_1.jpg?alt=media&token=eb80b75a-b8e9-4b54-9e31-f4e4f40e9faa',
                  title: 'Sri Lankan Carrots',
                  uPrice: 1250,
                  qty: 2,
                }}
              />
              <OrderedProductView
                product={{
                  imageUri:
                    'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/ProductImages%2FP001_1.jpg?alt=media&token=eb80b75a-b8e9-4b54-9e31-f4e4f40e9faa',
                  title: 'Sri Lankan Carrots',
                  uPrice: 1250,
                  qty: 2,
                }}
              />
            </View>
          </View>
          <View style={styles.pageArea}>
            <H3>Sub Total</H3>
            <Pr fontSize={30}>{2000}</Pr>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  pageArea: {
    marginBottom: 15,
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  ordersContainer: {
    marginVertical: 10,
  },
  orderInfo: {
    textAlign: 'center',
  },
  orderInfoFarmer: {
    textAlign: 'center',
    color: Theme.secondary,
  },
});
