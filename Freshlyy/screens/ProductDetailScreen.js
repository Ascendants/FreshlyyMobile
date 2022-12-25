import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H1, P, H3, H4, Pr } from '../components/Texts';
import {
  GreyButton,
  FilledBigButton,
  ShadedBigButton,
} from '../components/Buttons';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import Theme from '../constants/theme';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <View style={styles.productImageContainer}>
              <Image
                source={require('../assets/carrot.jpg')}
                style={styles.productImage}
              />
            </View>
            <View style={styles.actionArea}>
              <H3 style={styles.productTopic}>Sri Lankan Carrots</H3>
              <View style={styles.actionButtonContainer}>
                <GreyButton
                  title={
                    <Feather
                      name='message-circle'
                      size={24}
                      color={Theme.textColor}
                    />
                  }
                />
                <GreyButton
                  title={
                    <Feather name='heart' size={24} color={Theme.textColor} />
                  }
                />
                <GreyButton
                  title={
                    <Ionicons
                      name='ios-share-outline'
                      size={24}
                      color={Theme.textColor}
                    />
                  }
                />
                {/* <IconButton icon='heart' iconType='feather' />
                <IconButton icon='message-square' iconType='feather' />
                <IconButton icon='ios-share-outline' iconType='ionicons' /> */}
              </View>
            </View>
            <View style={styles.ratingArea}>
              <View style={styles.starContainer}>
                <AntDesign name='star' size={18} color={Theme.yellow} />
                <AntDesign name='star' size={18} color={Theme.yellow} />
                <AntDesign name='star' size={18} color={Theme.yellow} />
                <AntDesign name='star' size={18} color={Theme.yellow} />
                <AntDesign name='staro' size={18} color={Theme.yellow} />
              </View>
              <P>10 Reviews</P>
            </View>
            <View style={styles.sellerDetail}>
              <Image
                source={require('../assets/seller.jpg')}
                style={styles.sellerImage}
              />
              <H4 style={styles.sellerName}>Haritha</H4>
            </View>
            <View style={styles.detail}>
              <Pr fontSize={20}>1250</Pr>
              <H4>/KG</H4>
            </View>
            <View style={styles.detail}>
              <H4>2.5 KM Away | </H4>
              <Pr fontSize={20}>100</Pr>
              <H4>/KM</H4>
            </View>
            <View style={styles.detail}>
              <P>
                I dug these bad boys up just today morning from my farm. I'll
                deliver them for you real quick so that the freshness of them
                will be intact!
              </P>
            </View>
            <View>
              <View style={styles.qtyArea}>
                <ShadedBigButton
                  title={
                    <Feather name='minus' size={24} color={Theme.primary} />
                  }
                />
                <H3>0.5 KG</H3>
                <FilledBigButton
                  title={
                    <Ionicons
                      name='add-outline'
                      size={24}
                      color={Theme.contrastTextColor}
                    />
                  }
                />
              </View>
              <ShadedBigButton title='Add to Cart' />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 30,
  },
  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  productImage: {
    flex: 1,
    width: 325,
    height: 325,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productTopic: {
    flex: 4,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 3,
  },
  ratingArea: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starContainer: {
    marginRight: 10,
    flexDirection: 'row',
  },
  sellerDetail: {
    backgroundColor: Theme.overlay,
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 15,
    marginBottom: 10,
  },
  sellerImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: '50%',
  },
  sellerName: {
    color: Theme.primary,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  qtyArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
