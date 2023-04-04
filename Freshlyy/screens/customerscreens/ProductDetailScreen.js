import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2, P, H3, H4, H6, Pr } from '../../components/Texts';
import { Button } from '../../components/Buttons';
import { Ionicons, Feather } from '@expo/vector-icons';
import Header from '../../components/Header';
import ImageDots from '../../components/ImageDots';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import Loading from '../../components/Loading';
import Rating from '../../components/Rating';
import RefreshView from '../../components/RefreshView';
import ModalComponent from '../../components/ModalComponent';

export default function ({ route, navigation, productId, addToCart }) {
  const [modal, setModal] = React.useState(false);
  const [imageScroll, setImageScroll] = React.useState(0);
  const [selectedQuantity, setSelectedQuantity] = React.useState(0);
  const [product, setProduct] = React.useState({
    purl: route.params.purl,
    imageUrls: [],
  });
  function increaseQuantity() {
    const newQuantity = selectedQuantity + product.minQtyIncrement;
    fetch(ENV.backend + '/public/product/' + product.purl, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const availableQuantity = res.product?.qtyAvailable;
        if (newQuantity <= availableQuantity) {
          setSelectedQuantity(newQuantity);
        } else {
          alert('Not enough quantity available');
        }
      })
      .catch((err) => console.log(err));
  }
  function decreaseQuantity() {
    setSelectedQuantity((curr) =>
      Math.max(curr - product?.minQtyIncrement, product?.minQtyIncrement)
    );
  }
  function scrollImage(e) {
    const scroll = Math.round(e.nativeEvent.contentOffset.x / 345);
    setImageScroll(scroll);
  }
  const getData = React.useCallback(async () => {
    const purl = product?.purl;
    return fetch(ENV.backend + '/public/product/' + purl, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct((prev) => {
          return { ...prev, ...res.product };
        });
        setSelectedQuantity(res.product?.minQtyIncrement);
      })
      .catch((err) => console.log(err));
  });

  async function postCart() {
    const result = await fetch(ENV.backend + '/customer/cart/add', {
      method: 'POST',
      headers: {
        userEmail: route.params.userEmail,
        'Content-Type': 'application/json',
        //this will be replaced with an http only token
        //after auth gets set
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: selectedQuantity,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == 'Success') {
          return true;
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header />
        <RefreshView getData={getData}>
          <View style={styles.pageContent}>
            <View style={styles.productImageContainer}>
              <ScrollView
                style={styles.productImageSwiper}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={345} //your element width
                snapToAlignment={'center'}
                showsHorizontalScrollIndicator={false}
                onScroll={scrollImage}
                scrollEventThrottle={300}
              >
                {product?.imageUrls.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: image.imageUrl }}
                      style={[
                        styles.productImage,
                        [styles.image, { backgroundColor: image.placeholder }],
                      ]}
                    />
                  );
                })}
              </ScrollView>
              <ImageDots
                style={styles.dots}
                numOfElem={product?.imageUrls.length}
                index={imageScroll}
              />
            </View>
            <View style={styles.actionArea}>
              <H3 style={styles.productTopic}>{product?.title}</H3>
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
                  size='normal'
                  color='shadedTertiary'
                />
                <Button
                  type='icon'
                  icon={
                    <Feather name='heart' size={24} color={Theme.textColor} />
                  }
                  title='Wishlist'
                  size='normal'
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
                  size='normal'
                  color='shadedTertiary'
                />
              </View>
            </View>
            <View style={styles.ratingArea}>
              <Rating value={product?.overallRating} />
              <P>10 Reviews</P>
            </View>
            <View style={styles.farmerDetail}>
              <Image
                source={{ uri: product?.farmerImage?.imageUrl }}
                style={styles.farmerImage}
              />
              <H4 style={styles.farmerName}>{product?.farmerName}</H4>
            </View>
            <View style={styles.detail}>
              <Pr fontSize={20}>{product?.price}</Pr>
              <H4>/KG</H4>
            </View>
            <View style={styles.detail}>
              <H4>{product?.distance} KM Away | </H4>
              <Pr fontSize={20}>{product?.pricePerKm}</Pr>
              <H4>/KM</H4>
            </View>
            <View style={styles.detail}>
              <P>{product?.description}</P>
            </View>
            <View>
              <View style={styles.qtyArea}>
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
                title='Add to Cart'
                onPress={postCart}
              />
            </View>
          </View>
        </RefreshView>
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
    paddingHorizontal: 20,
  },
  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    // width: 350,
  },
  productImageSwiper: {
    width: 345,
    height: 325,
  },
  productImage: {
    flex: 1,
    width: 325,
    height: 325,
    borderRadius: 30,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  dots: {
    position: 'absolute',
    bottom: 5,
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productTopic: {
    flex: 4,
    alignSelf: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
  ratingArea: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  farmerDetail: {
    backgroundColor: Theme.overlay,
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 15,
    marginBottom: 10,
  },
  farmerImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  farmerName: {
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