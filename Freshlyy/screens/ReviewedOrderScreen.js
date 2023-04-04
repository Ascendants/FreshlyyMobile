import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H4, P, H3, H5, H6 } from '../components/Texts';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import ReviewProductCard from '../components/ReviewProductCard';
import ReviewedOrderCard from '../components/ReviewedOrderCard';
import Rating from '../components/Rating';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Order</H3>
          <H6> Order id</H6>
          <H4 style={styles.farmername}>From Komuthu Fernando</H4>
          <ReviewedOrderCard></ReviewedOrderCard>
          <ReviewedOrderCard></ReviewedOrderCard>
          <H4 style={styles.delivery}>Rate the Delivery</H4>
          <View style={styles.rating}>
            <Rating value={3}></Rating>
          </View>

          <H4 style={styles.communi}>Rate the Communication</H4>
          <View style={styles.rating}>
            <Rating value={5}></Rating>
          </View>

          <Button
            title='Edit Review'
            color='shadedPrimary'
            size='normal'
            style={styles.edit}
          />
          <View style={styles.contaniner}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/UserImages%2Fgimhani.jpg?alt=media&token=febb7a12-412f-459f-a2ce-b0a0ac574a91',
              }}
              style={styles.image}
            />
            <View style={styles.innercontaniner}>
              <View style={styles.textName}>
                <H5 style={styles.name}>Gimhani Gunasinghe</H5>
              </View>
              <Rating value={4} />
              <Button
                title='View Review'
                color='shadedSecondary'
                size='normal'
              />
            </View>
          </View>
          <View style={styles.contaniner2}>
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
                size='small'
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
                size='small'
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
                size='small'
                color='shadedTertiary'
              />
            </View>
            <Button
              title='Following'
              color='filledPrimary'
              size='normal'
              style={styles.btn}
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
    margin: 10,
  },
  farmername: {
    color: 'blue',
  },
  delivery: {
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  communi: {
    marginTop: 5,
    marginBottom: 5,
  },
  rating: {
    marginBottom: 5,
  },
  edit: {
    marginTop: 40,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 100,
  },
  name: {
    color: Theme.primary,
    justifyContent: 'center',
  },
  Rating: {
    justifyContent: 'center',
  },
  H4: {
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
  contaniner: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  innercontaniner: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    justifyContent: 'space-between',
    //alignItems:'right',
  },
  contaniner2: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
    margin: 20,
    justifyContent: 'center',
  },
  btn: {
    height: '90%',
    marginVertical: 10,
  },
});
