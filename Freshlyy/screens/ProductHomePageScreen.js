import { contains } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { H1, H2, H7, H6 } from "../components/Texts";
import Theme from "../constants/theme";
import { FilledBigButton } from "../components/Buttons";
import theme from "../constants/theme";
import {
  findFocusedRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../components/Header";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ENV from "../constants/env";


export default function ({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  

  React.useEffect(() => {
    fetch(ENV.backend + "/customer/main-page/", {
      //getting data from the backend (all products)
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.products;
        setProducts(Object.values(data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLikePress = async (productId) => {
    // Send a POST request to update the product's likes array in MongoDB
    const response = await fetch(`/customer/${productId}/like`, {
      method: 'POST',
      body: JSON.stringify({ email: 'example@example.com' }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // Update the local products state with the updated product data
    setProducts(products.map(p => p._id === data._id ? data : p));
  };

  const handleSearch = (query) => {
    setSearchText(query);
  };

  const handlePriceSort = () => {
    setSortByPrice(!sortByPrice);
  };

  const sortedProducts = sortByPrice
  ? products.slice().sort((a, b) => a.price - b.price)
  : products;

  const filteredProducts = sortedProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchText.toLowerCase());
  });



  console.log(filteredProducts);

  return (
    <SafeAreaView>
      <Header back={true} />

      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.searchCont}>
            <AntDesign
              name="search1"
              size={20}
              color="black"
              style={styles.searchico}
            />
            <TextInput
              placeholder="Search produce"
              value={searchText}
              style={styles.searchinput}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.filterCont}>
            <TouchableOpacity>
              <View style={styles.filterSelect}>
                <AntDesign name="arrowdown" size={24} color="black" />
                <H6>Best match</H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePriceSort}>
              <View style={styles.filterSelect}>
                <Ionicons name="swap-vertical" size={24} style={sortByPrice?{color:Theme.primary}:{color:"black"}} />
                <H6 style={sortByPrice?{color:Theme.primary}:{}}>Price</H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filterSelect}>
                <Ionicons name="swap-vertical" size={24} color="black" />
                <H6>Distance</H6>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filterSelect}>
                <Ionicons name="filter" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={styles.prodCont}>
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <FlatList
              
              numColumns={2}
              data={filteredProducts}
              renderItem={({ item }) => (
                <ProductCard
                  cardType="social"
                  prodId={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  unit={item.unit}
                  overallRating={item.overallRating}
                  likes={item.likes}
                  userID={route.params.userEmail}
                  onLikePress={handleLikePress}
                />
              )}
              keyExtractor={(prod, index) => prod._id}
            />
            </ScrollView>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: "Poppins",
  },
  searchico: {
    paddingRight: 10,
  },
  searchinput: {
    width: "87%",
  },
  searchCont: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    //paddingLeft:20,
    backgroundColor: Theme.overlay,
    width: "90%",
    borderRadius: 20,
    marginVertical: 10,
  },
  filterCont: {
    display: "flex",
    width: "86%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterSelect: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  prodCont: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  
});
