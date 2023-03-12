import { React, useState } from "react";
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

export default function () {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [minQtyIncrement, setMinQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async () => {
    try {
      const response = await fetch(env.backend + "/farmer/insertProduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          quantity: quantity,
          description: description,
          minQtyIncrement: minQtyIncrement,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductNameChange = (text) => {
    setTitle(text);
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
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: isNaN(Number(text)) ? "Product Price must be a number" : null,
    }));
  };

  const handleProductQuantityChange = (text) => {
    setQuantity(text);
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

  // const handleSubmit = () => {
  //   // handle form submission
  // };

  const isValid =
    title.length >= 2 &&
    price !== "" &&
    !isNaN(Number(price)) &&
    quantity !== "" &&
    !isNaN(Number(quantity)) &&
    minQtyIncrement !== "" &&
    !isNaN(Number(minQtyIncrement)) &&
    Number(minQtyIncrement) <= Number(quantity);
  return (
    <SafeAreaView>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Image
            source={require("../assets/InsertProduct.png")}
            style={styles.vectorimage}
          />

          <H1 style={styles.AddText}>Add your product</H1>

          <TextInputBox
            inputlabel="Product Name"
            placeholder="Enter product name"
            value={title}
            onChangeText={handleProductNameChange}
            error={errors.title}
            touched={true}
          />
          <TextInputBox
            inputlabel="Quantity Available (Kg)"
            placeholder="Enter quantity available "
            value={quantity}
            onChangeText={handleProductQuantityChange}
            keyboardType="numeric"
            error={errors.quantity}
            touched={true}
          />

          <TextInputBox
            inputlabel="Minimum Quantity (Kg)"
            placeholder="Enter minimum quantity that can be provide "
            value={minQtyIncrement}
            onChangeText={handleMinimumQuantityChange}
            keyboardType="numeric"
            error={errors.minQtyIncrement}
            touched={true}
          />

          <TextInputBox
            inputlabel="Price of 1Kg"
            placeholder="Enter price of 1Kg"
            value={price}
            onChangeText={handleProductPriceChange}
            keyboardType="numeric"
            error={errors.price}
            touched={true}
          />

          <TextInputBox
            inputlabel="Any description"
            placeholder="Enter description if you need"
            value={description}
            onChangeText={setDescription}
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
          {/* </View> */}
          <Button
            title="Submit"
            color="filledPrimary"
            size="big"
            // onPress={() => {
            //   handleSubmit();
            //   uploadImages();
            // }}
            onPress={async () => {
              const formValid = await handleSubmit();
              const imagesValid = uploadImages();
              if (formValid && imagesValid) {
                // Submit the form
              } else {
                Alert.alert(
                  "Error",
                  "Please fill all the details and select 3 images.",
                  [{ text: "OK" }]
                );
              }
            }}
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
});
