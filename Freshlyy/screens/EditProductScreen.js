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
import { H1, H2, H6 } from "../components/Texts";
import ENV from "../constants/env";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// export default function () {
export default function ({ navigation, route }) {
  const [product, setProduct] = useState({});

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

        // const storageRef = ref(storage, `FreshlyyImageStore/${data.image}`);
        // getDownloadURL(storageRef)
        //   .then((url) => setImageUrl(url))
        //   .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H1 style={styles.AddText}>Edit Details</H1>

          {/* <DatePicker/> */}

          <TextInputBox
            inputlabel="Product Name"
            // placeholder={product?.title}
            defaultValue={product.title}
          />
          <TextInputBox
            inputlabel="Quantity Available"
            // defaultValue={product.qtyAvailable.toString()}

            //   product.qtyAvailable !== undefined
            //     ? product.qtyAvailable.toString()
            //     : ""
            // }
          />
          <TextInputBox
            inputlabel="Minimum Quantity Available"
            // placeholder={product.minQtyIncrement}
          />
          <TextInputBox inputlabel="Price of 1Kg" />

          <TextInputBox
            inputlabel="Any description"
            placeholder={product.description}
          />

          {/* <Image
            source={require('../assets/carrot.jpg')}
            style={styles.vectorimage}
          /> */}
          <TextInputBox inputlabel="Add product image" />

          <View style={styles.buttcont}>
            <Button title="Delete image" color="shadedDanger" size="normal" />
            <Button title="Upload image" color="shadedPrimary" size="normal" />
          </View>
          <Button title="Upload" color="filledPrimary" size="big" />
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
    marginBottom: 80,
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
  inputcont: {
    position: "relative",
    width: "80%",
  },
  inputlabel: {
    paddingLeft: 50,
    color: Theme.textColor,
    fontFamily: "Poppins",
  },
  input: {
    position: "relative",
    height: 40,
    width: "100%",
    fontFamily: "Poppins",
    paddingLeft: 10,
    backgroundColor: Theme.overlay,
    borderColor: Theme.overlay,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttcont: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
