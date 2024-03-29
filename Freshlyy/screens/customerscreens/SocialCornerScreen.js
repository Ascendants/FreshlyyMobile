import { contains } from '@firebase/util';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
  StatusBar,
} from 'react-native';
import { H1, H2, H3, H4, H5, H7, H6, P } from '../../components/Texts';
import Theme from '../../constants/theme';
import { FilledBigButton } from '../../components/Buttons';
import theme from '../../constants/theme';
import {
  findFocusedRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Rating from '../../components/Rating';
import ENV from '../../constants/env';
import { Rate5 } from '../../components/Rate5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabMenu from '../../components/TabMenu';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
const DATA = [
  {
    showSection: false,
    title: 'Recommended Products',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    showSection: false,
    title: 'Best Sellers',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    showSection: false,
    title: 'Famous Products',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    showSection: true,
    title: 'Newly Added',
    data: ['Cheese Cake', 'Ice Cream', 'Mango', 'Watalappan'],
  },
];

export default function ({ navigation, route }) {
  const auth = useAuth();
  const [products, setProducts] = useState([]);
  const [showSocial, setSocial] = useState(true);
  const [activeTab, setActiveTab] = useState('All Products');

  const handleLike = async (productId, newLike, method) => {
    console.log(productId, method, newLike);
    fetch(ENV.backend + '/customer/like/' + productId, {
      method: 'POST',
      headers: {
        Authorization: route.params.auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: method,
        newLike: newLike,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const sendToProductDetail = async (pubUrl) => {
    navigation.navigate('Product Detail', {
      purl: pubUrl,
    });
  };
  // function changeTab(tab) {
  //   setActiveTab(tab);
  //   if (tab == 'For You') {
  //     handleFetchProducts();
  //   } else {
  //     fetchSocialCorner();
  //   }
  // }

  // async function handleFetchProducts() {
  //   setSocial(false);
  //   const result = await fetch(ENV.backend + '/customer/following-products', {
  //     method: 'GET',
  //     headers: {
  //       useremail: 'gimhani@freshlyy.com',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }
  function fetchSocialCorner() {
    setSocial(true);
    fetch(ENV.backend + '/customer/social-corner/', {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.socialProducts;

        setProducts(Object.values(data));
        // console.log(products);
      })
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    fetchSocialCorner();
  }, []);
  //  console.log(products[0].data[0].imageUrl[0].imageUrl)
  console.log(products);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header back={false} />

        <View style={styles.screen}>
          <H4 style={styles.heading}>Social Corner</H4>

          <SectionList
            sections={products}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            keyExtractor={(item, index) => item + index}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => {
              return section.showSection ? (
                <View
                  style={[
                    section.horizontalScroll
                      ? { backgroundColor: Theme.primaryShade }
                      : null,
                  ]}
                >
                  <H4 style={styles.header}>{section.title}</H4>
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => (
                      <ProductCard
                        cardType='social'
                        title={item.title}
                        id={item._id}
                        userEmail={auth.user.userEmail}
                        imageUrl={item.imageUrl}
                        unit={item.unit}
                        likes={item.likes}
                        overallRating={item.overallRating}
                        price={item.price}
                        farmerName={item.farmerName}
                        publicUrl={item.publicUrl}
                        onPress={sendToProductDetail}
                        onLike={handleLike}
                      />
                    )}
                    keyExtractor={(prod, index) => prod._id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              ) : null;
            }}
            renderItem={({ item, section }) => {
              return <View></View>;
            }}
          />
          <Navbar social={true} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageCont: {
    alignItems: 'center',
  },
  heading: {
    color: Theme.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  cont: {
    //  backgroundColor:{section.horizontalScroll?Theme.primaryShade:null}
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'blue',
    // backgroundColor:'#FFFFFF'
  },
  item: {
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 15,
  },
  socialPic: {
    width: 200,
    height: 100,
    marginTop: 10,
    marginBottom: 20,
  },
  selectP: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 3,
    backgroundColor: Theme.yellow,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  line: {
    width: 2,
    backgroundColor: 'black',
  },
  selectTagSugg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    paddingVertical: 6,
  },
  selectTagFoll: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});
