import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { TextInputBox } from '../components/Inputs';
import CardView from '../components/CardView';

import { Formik } from 'formik';
import { Button } from '../components/Buttons';
import ModalComponent from '../components/ModalComponent';
import ENV from '../constants/env';
import TabMenu from '../components/TabMenu';
import OrderView from '../components/OrderView';
export default function ({ navigation, route }) {
  const [activeTab, setActiveTab] = React.useState(route.params.initialTab);
  function changeTab(tab) {
    setActiveTab(tab);
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2>Orders</H2>
        <TabMenu
          tabs={[
            'All',
            'To Pay',
            'Processing',
            'Shipped',
            'To Pickup',
            'Received',
            'To Review',
          ]}
          active={activeTab}
          onPress={changeTab}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.ordersContainer}>
            <OrderView
              farmer='Komuthu Fernando'
              orderId='2o22342342302-2-'
              orderDate='02.05.2000'
              paidDate='02.05.2000'
              status='Delivered'
              total='2000'
            />
            <OrderView
              farmer='Haritha Hasathcharu'
              orderId='2o22342342302-2-'
              orderDate='02.05.2000'
              paidDate='02.05.2000'
              status='Delivered'
              total='2000'
            />
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
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  ordersContainer: {
    marginVertical: 10,
  },
});
