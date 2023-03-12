import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Theme from "../constants/theme";
import { Button } from "../components/Buttons";
import { TextInputBox, DropDownPicker, DatePicker } from "../components/Inputs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { H1, H2, H3, H6, Pr } from "../components/Texts";
import ENV from "../constants/env";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebase from "../utils/firebase";
import "firebase/storage";
import { FreshlyyImageStore } from "../utils/firebase";

export default function ({ navigation, route }) {
  const [product, setProduct] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Initialize Firebase storage
    const storage = getStorage();
    // console.log(productId);
    fetch(ENV.backend + "/farmer/getSellingProduct/", {
      method: "GET",
      headers: {
        useremail: route.params.userEmail,
      },
      productId: "63f4d385b1a06dad48ec25ba",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != "Success") {
          throw new Error("Malformed Response");
        }
        const data = res.product;
        console.log(data);
        setProduct(data);

        const storageRef = ref(storage, `FreshlyyImageStore/${data.image}`);
        getDownloadURL(storageRef)
          .then((url) => setImageUrl(url))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H1 style={styles.AddText}>Selling Products</H1>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} />
          ) : (
            <Image
              source={require("../assets/carrot.jpg")}
              style={styles.vectorimage}
            />
          )}
          {/* <Image
            source={require("../assets/carrot.jpg")}
            style={styles.vectorimage}
          /> */}
          {/* <DatePicker/> */}
          <H6 style={styles.PText}>{product?.title}</H6>
          <View style={styles.DeBox}>
            <H2 style={styles.DText}>Available Quantity -:</H2>
            <H1 style={styles.DText}>
              {product?.qtyAvailable}
              {product?.unit}
            </H1>
            <H2 style={styles.DText}>Minimum Quantity -:</H2>
            <H1 style={styles.DText}>
              {" "}
              {product.minQtyIncrement}
              {product.unit}
            </H1>
            <H2 style={styles.DText}>Price -: </H2>
            <Pr>
              <H1 style={styles.DText}>{product.price} </H1>
            </Pr>
            <H2 style={styles.DText}>Description -: </H2>
            <H1 style={styles.DText}>{product.description}</H1>
          </View>

          <View style={styles.buttcont}>
            <Button
              title="Edit"
              color="shadedPrimary"
              size="big"
              onPress={() => navigation.navigate("editScreen")}
            />
            <Button title="Delete" color="shadedDanger" size="big" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    fontFamily: "Poppins",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginTop: 50,
  },
  vectorimage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  AddText: {
    // color: Theme.primary,
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 2,
  },
  PText: {
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  DText: {
    fontSize: 20,
    paddingBottom: 2,
  },
  DeBox: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: -10,
    backgroundColor: Theme.overlayShade,
    padding: 10,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: "80%",
  },
  inputcont: {
    position: "relative",
    width: "100%",
  },

  buttcont: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 80,
    width: "80%",
  },
});
