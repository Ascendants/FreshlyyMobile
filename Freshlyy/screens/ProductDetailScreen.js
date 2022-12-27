import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FreshlyyImageStore } from '../utils/firebase';
import { ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { H1, P, H3, H4, Pr } from '../components/Texts';
import {
  GreyButton,
  FilledBigButton,
  ShadedBigButton,
} from '../components/Buttons';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import ImageDots from '../components/ImageDots';
import Theme from '../constants/theme';

export default function ({ route, navigation }) {
  const [imageScroll, setImageScroll] = React.useState(0);
  const [selectedQuantity, setSelectedQuantity] = React.useState(0.5);
  const [product, setProduct] = React.useState({ pid: route.params.pid });
  const [pImages, setPImages] = React.useState([]);
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
    const productId = product.pid;
    setProduct((prev) => {
      return {
        ...prev,
        title: 'Sri Lankan Carrots',
        description:
          "I dug these bad boys up just today morning from my farm. I'll deliver them for you real quick so that the freshness of them will be intact!",
        seller: 'Haritha',
        price: '1250',
        unit: 'KG',
        distance: 2.5,
        pricePerKm: 100,
        minQtyIncrement: 0.5,
        numOfReviews: 10,
        overallRating: 4,
      };
    });
    const imageFolder = ref(FreshlyyImageStore, '/ProductImages/' + productId);
    listAll(imageFolder)
      .then((res) => {
        Promise.all(res.items.map((item) => getDownloadURL(item))).then(
          (urls) => {
            setPImages(
              urls.sort((pitem, nitem) => {
                const pattern = new RegExp(/%2..*%2F(.*?)\?alt/);
                const pnum = parseInt(
                  pattern.exec(pitem)[1].split('_')[1].split('.')[0]
                );
                const nnum = parseInt(
                  pattern.exec(nitem)[1].split('_')[1].split('.')[0]
                );
                return pnum - nnum;
              })
            );
          }
        );
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
                <Image
                  source={{ uri: pImages[0] }}
                  style={styles.productImage}
                />
                <Image
                  source={{ uri: pImages[1] }}
                  style={styles.productImage}
                />
                <Image
                  source={{ uri: pImages[2] }}
                  style={styles.productImage}
                />
              </ScrollView>
              <ImageDots
                style={styles.dots}
                numOfElem={pImages.length}
                index={imageScroll}
              />
            </View>
            <View style={styles.actionArea}>
              <H3 style={styles.productTopic}>{product.title}</H3>
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
              <P>{product.numOfReviews} Reviews</P>
            </View>
            <View style={styles.sellerDetail}>
              <Image
                source={require('../assets/seller.jpg')}
                style={styles.sellerImage}
              />
              <H4 style={styles.sellerName}>{product.seller}</H4>
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
                <ShadedBigButton
                  title={
                    <Feather name='minus' size={24} color={Theme.primary} />
                  }
                  onPress={decreaseQuantity}
                />
                <H3 style={{ width: 100, textAlign: 'center' }}>
                  {selectedQuantity} KG
                </H3>
                <FilledBigButton
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
    borderRadius: 15,
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
