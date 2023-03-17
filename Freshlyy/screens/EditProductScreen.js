import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Theme from "../constants/theme";
import { Button } from "../components/Buttons";
import { TextInputBox, DropDownPicker, DatePicker } from "../components/Inputs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { H1, H2 } from "../components/Texts";
import env from "../constants/env";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/firebase";
import { FreshlyyImageStore } from "../utils/firebase";
import { async } from "@firebase/util";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { min } from "react-native-reanimated";
import { getStorage } from "firebase/storage";
import ENV from "../constants/env";

export default function ({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [minQtyIncrement, setMinQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[result.assets.length - 1].uri };
      if (images.length < 3) {
        setImages([...images, source]);
        // setImage(source);
      }
    }
  };
  // const ProductAddedMessage = () => {
  //   return (
  //     <View style={{ flexDirection: "row", alignItems: "center" }}>
  //       <Image
  //         source={require("../assets/ProductAdded.png")}
  //         style={{ width: 20, height: 20, marginRight: 10 }}
  //       />
  //       <Text>Product Updated Successfully</Text>
  //     </View>
  //   );
  // };

  const uploadImages = async () => {
    // const uploadedImageUrls = [];
    const maxImages = 3;
    const limitedImages = images?.slice(0, maxImages) || []; // Handle null or undefined image
    //
    const uploadPromises = limitedImages.map(async (image) => {
      if (!image) {
        return;
      }
      setUploading(true);
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const fileName = `ProductImages/${uuid.v4()}`;
        const imageRef = ref(FreshlyyImageStore, fileName);
        // const imageRef = ref(FreshlyyImageStore, "ProductImages/" + blob);
        await uploadBytes(imageRef, blob);
      } catch (e) {
        console.log(e);
      }
      setUploading(false);
    });
    await Promise.all(uploadPromises);
    setImages([]);
    // Alert.alert("Success", "Images uploaded successfully!");
  };

  const handleProductNameChange = (text) => {
    setTitle(text);
    setProduct((prevProduct) => ({
      ...prevProduct,
      title: text,
    }));
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      title:
        text.length < 2
          ? "Product Name must be at least 2 characters"
          : /\d/.test(text)
          ? "Product Name cannot contain numbers"
          : null,
    }));
  };

  const handleProductPriceChange = (text) => {
    setPrice(text);
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: text,
    }));
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: isNaN(Number(text)) ? "Product Price must be a number" : null,
    }));
  };

  const handleProductQuantityChange = (text) => {
    setQuantity(text);
    setProduct((prevProduct) => ({
      ...prevProduct,
      qtyAvailable: text,
    }));
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      quantity: isNaN(Number(text))
        ? "Product Quantity must be a number"
        : null,
    }));
  };

  const handleMinimumQuantityChange = (text) => {
    setMinQuantity(text);
    setProduct((prevProduct) => ({
      ...prevProduct,
      minQtyIncrement: text,
    }));

    // perform validation here and update errors
    const isValidQuantity =
      !isNaN(Number(text)) && Number(text) <= Number(quantity);
    console.log(isValidQuantity);
    setErrors((prevErrors) => ({
      ...prevErrors,
      minQtyIncrement: isValidQuantity
        ? null
        : "Minimum Quantity must be a number and less than or equal to the Available Quantity",
    }));
  };
  const handleDescription = (text) => {
    setDescription(text);
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: text,
    }));
  };

  const isValid =
    title.length >= 2 &&
    price !== "" &&
    !isNaN(Number(price)) &&
    quantity !== "" &&
    !isNaN(Number(quantity)) &&
    minQtyIncrement !== "" &&
    !isNaN(Number(minQtyIncrement)) &&
    Number(minQtyIncrement) <= Number(quantity);

  useEffect(() => {
    const storage = getStorage();

    fetch(
      ENV.backend + "/farmer/get-selling-product",
      // "${ENV.backend}/farmer/getSellingProduct/?productId=63f4d385b1a06dad48ec25ba",
      {
        method: "GET",
        headers: {
          useremail: route.params.userEmail,
          "Content-Type": "application/json",
        },
        productId: "63f4d385b1a06dad48ec25ba",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message != "Success") {
          throw new Error("Malformed Response");
        }
        const data = res.product;
        console.log(data);
        setProduct(data);
      })

      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setProductId("63f4d385b1a06dad48ec25ba");
  }, []);

  const handleUpdate = async () => {
    const productId = "63f4d385b1a06dad48ec25ba";
    try {
      // Fetch existing product data
      const response = await fetch(
        env.backend + "/farmer/get-product/" + productId
      );
      const existingData = await response.json();

      // Merge new values with existing data
      const updatedData = {
        ...existingData,
        title: title || existingData.title,
        price: price || existingData.price,
        qtyAvailable: quantity || existingData.qtyAvailable,
        description: description || existingData.description,
        minQtyIncrement: minQtyIncrement || existingData.minQtyIncrement,
      };

      // Update product data in the database
      const updateResponse = await fetch(
        env.backend + "/farmer/update-product/" + productId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await updateResponse.json();
      console.log(data);

      navigation.navigate("productupdated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <H1 style={styles.AddText}>Edit your product</H1>

          <TextInputBox
            inputlabel="Product Name"
            value={product?.title}
            // placeholder={product.title}
            onChangeText={handleProductNameChange}
            error={errors.title}
            touched={true}
          />
          {product && product.qtyAvailable !== undefined && (
            <TextInputBox
              inputlabel="Quantity Available (Kg)"
              value={
                product && product.qtyAvailable
                  ? product.qtyAvailable.toString()
                  : ""
              }
              // value={product.qtyAvailable.toString()}
              onChangeText={handleProductQuantityChange}
              keyboardType="numeric"
              error={errors.quantity}
              touched={true}
            />
          )}
          {product && product.minQtyIncrement !== undefined && (
            <TextInputBox
              inputlabel="Minimum Quantity (Kg)"
              value={
                product && product.minQtyIncrement
                  ? product.minQtyIncrement.toString()
                  : ""
              }
              // value={product.minQtyIncrement.toString()}
              onChangeText={handleMinimumQuantityChange}
              keyboardType="numeric"
              error={errors.minQtyIncrement}
              touched={true}
            />
          )}

          {product && product.price !== undefined && (
            <TextInputBox
              inputlabel="Price of 1Kg (Rs)"
              value={product && product.price ? product.price.toString() : ""}
              onChangeText={handleProductPriceChange}
              keyboardType="numeric"
              error={errors.price}
              touched={true}
            />
          )}

          <TextInputBox
            inputlabel="Any description"
            value={product.description}
            onChangeText={handleDescription}
            error={errors.description}
            touched={true}
          />
          {/* <TextInputBox
            inputlabel="Add product image"
            placeholder="add 3 images here"
          /> */}

          {!isValid && (
            <Text style={{ color: "red" }}>
              Please fill in all fields correctly
            </Text>
          )}
          {images.length < 3 && (
            <View style={styles.buttcont}>
              <Button
                title="Add Image"
                type="icon"
                icon={
                  <Ionicons name="add-circle" size={48} color={Theme.primary} />
                }
                color="shadedPrimary"
                size="normal"
                onPress={pickImage}
                disabled={images.length >= 3}
              />
            </View>
          )}
          <View style={styles.imagecont}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200 }}
              />
            ))}
          </View>
          <View style={styles.buttco}>
            <Button title="Delete image" color="shadedDanger" size="normal" />
            <Button title="Upload image" color="shadedPrimary" size="normal" />
          </View>
          {/* </View> */}
          <Button
            title="Upload"
            color="filledPrimary"
            size="big"
            onPress={() => handleUpdate(navigation.navigate("productupdated"))}
            disabled={images.length === 0 || !isValid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins",
    height: "100%",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginTop: 10,
  },
  AddText: {
    color: Theme.primary,
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
    // justifyContent: 'space-between',
    width: "80%",
  },

  imagecont: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttco: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
