import { React, useState, useEffect} from 'react';
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
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from '../../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, P, H3, H5, H6 } from '../../components/Texts';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ReviewProductCard from '../../components/ReviewProductCard';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';

export default function ({route,navigation}) {
  const [Order, setOrder] = useState([]);
  const [Product,setProduct]=useState([]);
  const [Items,setItem]=useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sendToProductDetail = async (pubUrl) => {
    navigation.navigate('Order Detail', {
      purl: pubUrl,
    });
  };
  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/orderDetailReview/641416235bbd0f10a17cf1fb', {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.message=="Success"){
          setItem(res.Items);
          setOrder(res.Order);
          setProduct(res.Product)
        }
        isRefreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
console.log(Order)
console.log(Items)

  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Review Order</H3>
          <H6> {Order?.orderID}</H6>
          <H4 style={styles.farmername}>{Order?.farmerName}</H4>
          {Items?.map(item=>{
           return  <ReviewProductCard
            title={item?.title}
            imageUrl={item?.imageUrl} //should be taken from Products table
            price={item?.uPrice}
            qty={item?.qty}
          />
        })}
          {/* <ReviewProductCard></ReviewProductCard>
          <ReviewProductCard></ReviewProductCard> */}
          <H4 style={styles.delivery}>Rate the Delivery</H4>
          <View style={styles.rating}>
            <Rating value={Order?.deliverRating}></Rating>
          </View>

          <H4 style={styles.communi}>Rate the Farmer</H4>
          <View style={styles.rating}>
            <Rating style={styles.rating} value={Order.farmerRating}></Rating>
          </View>

          <Button
            title='Save Review'
            color='shadedPrimary'
            size='normal'
            style={styles.save}
          />
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
    margin: 30,
  },
  farmername: {
    color: 'blue',
  },
  delivery: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
  },
  communi: {
    marginTop: 20,
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },
  save: {
    marginTop: 40,
  },
});
