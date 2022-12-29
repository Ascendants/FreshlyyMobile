import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FreshlyyImageStore } from '../utils/firebase';
import { ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { H1, P, H3, H4, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import ImageDots from '../components/ImageDots';
import Theme from '../constants/theme';
import ENV from '../constants/env';

import Rating from '../components/Rating';

export default function ({ route, navigation }) {
  const [imageScroll, setImageScroll] = React.useState(0);
  const [selectedQuantity, setSelectedQuantity] = React.useState(0.5);
  const [product, setProduct] = React.useState({
    purl: route.params.purl,
    imageUrls: [],
  });
  function increaseQuantity() {
    setSelectedQuantity((curr) => curr + 0.5);
  }
  function decreaseQuantity() {
    setSelectedQuantity((curr) => Math.max(curr - 0.5, 0.5));
  }
  function scrollImage(e) {
    const scroll = Math.round(e.nativeEvent.contentOffset.x / 345);
    setImageScroll(scroll);
  }
  React.useEffect(() => {
    const purl = product.purl;
    fetch(ENV.backend + '/public/product/' + purl, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct((prev) => {
          return { ...prev, ...res.product };
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
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
                {product.imageUrls.map((image) => {
                  return (
                    <Image
                      key={image}
                      source={{ uri: image }}
                      style={styles.productImage}
                    />
                  );
                })}
              </ScrollView>
              <ImageDots
                style={styles.dots}
                numOfElem={product.imageUrls.length}
                index={imageScroll}
              />
            </View>
            <View style={styles.actionArea}>
              <H3 style={styles.productTopic}>{product.title}</H3>
              <View style={styles.actionButtonContainer}>
                <Button
                  title={
                    <Feather
                      name='message-circle'
                      size={24}
                      color={Theme.textColor}
                    />
                  }
                  size='small'
                  color='shadedTertiary'
                />
                <Button
                  title={
                    <Feather name='heart' size={24} color={Theme.textColor} />
                  }
                  size='small'
                  color='shadedTertiary'
                />
                <Button
                  title={
                    <Ionicons
                      name='ios-share-outline'
                      size={24}
                      color={Theme.textColor}
                    />
                  }
                  size='small'
                  color='shadedTertiary'
                />
              </View>
            </View>
            <View style={styles.ratingArea}>
              <Rating value={product.overallRating} />
              <P>10 Reviews</P>
            </View>
            <View style={styles.farmerDetail}>
              <Image
                source={{ uri: product.farmerImage }}
                style={styles.farmerImage}
              />
              <H4 style={styles.farmerName}>{product.farmerName}</H4>
            </View>
            <View style={styles.detail}>
              <Pr fontSize={20}>{product.price}</Pr>
              <H4>/KG</H4>
            </View>
            <View style={styles.detail}>
              <H4>{product.distance} KM Away | </H4>
              <Pr fontSize={20}>{product.pricePerKm}</Pr>
              <H4>/KM</H4>
            </View>
            <View style={styles.detail}>
              <P>{product.description}</P>
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
              <Button size='big' color='shadedPrimary' title='Add to Cart' />
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
