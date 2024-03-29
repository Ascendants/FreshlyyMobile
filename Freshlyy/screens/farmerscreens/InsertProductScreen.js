import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { TextInputBox } from '../../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H1, H2 } from '../../components/Texts';
import env from '../../constants/env';
import * as ImagePicker from 'expo-image-picker';
import { FreshlyyImageStore } from '../../utils/firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

import uuid from 'react-native-uuid';
import LoadingModal from '../../components/LoadingModal';

export default function ({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [minQtyIncrement, setMinQuantity] = useState('');
  const [errors, setErrors] = useState({});
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const pickImage = async () => {
    if (uploadedImageUrls.length >= 3) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[result.assets.length - 1].uri };
      await uploadImage(source);
    }
  };
  const handleDeleteImage = (index) => {
    setUploadedImageUrls((curr) => curr.filter((item) => item !== curr[index]));
  };

  const uploadImage = async (image) => {
    setUploadingImage(true);
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName = `ProductImages/${uuid.v4()}`;
      const imageRef = ref(FreshlyyImageStore, fileName);
      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      setUploadedImageUrls((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.log(error);
    }
    setUploadingImage(false);
  };

  const handleSubmit = async () => {
    try {
      const imageData = [];
      uploadedImageUrls?.forEach((image) => {
        imageData.push({ imageUrl: image, placeholder: '#10ab68' });
      });
      const response = await fetch(env.backend + '/farmer/insert-product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: route.params.auth,
        },
        body: JSON.stringify({
          title: title,
          price: price,
          qtyAvailable: quantity,
          description: description,
          minQtyIncrement: minQtyIncrement,
          images: imageData,
        }),
      });
      const data = await response.json();
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFormSubmit = async () => {
    if (
      !title ||
      !price ||
      !quantity ||
      !minQtyIncrement ||
      uploadedImageUrls.length === 0
    ) {
      Alert.alert(
        'Error',
        'Please fill all the required details and select at least one image.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const isDataValid = await handleSubmit();

      if (isDataValid) {
        console.log('Form submitted successfully.');
        navigation.navigate('productAddedSuccessfully');
      } else {
        Alert.alert(
          'Error',
          'An error occurred while submitting the form. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'An error occurred while submitting the form. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleProductNameChange = (text) => {
    setTitle(text);
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      title:
        text.length < 2
          ? 'Product Name must be at least 2 characters'
          : /\d/.test(text)
          ? 'Product Name cannot contain numbers'
          : null,
    }));
  };
  const handleNameBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      title:
        title.length < 2
          ? 'Product Name must be at least 2 characters'
          : /\d/.test(title)
          ? 'Product Name cannot contain numbers'
          : null,
    }));
  };

  const handleProductPriceChange = (text) => {
    setPrice(text);
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: isNaN(Number(text)) ? 'Product Price must be a number' : null,
    }));
  };

  const handleProductQuantityChange = (text) => {
    setQuantity(text);
    // perform validation here and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      quantity: isNaN(Number(text))
        ? 'Product Quantity must be a number'
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
        : 'Minimum Quantity must be a number and less than or equal to the Available Quantity',
    }));
  };

  React.useEffect(() => {
    for (let key in errors) {
      if (errors[key] !== null) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  }, [errors]);
  return (
    <SafeAreaView>
      <Header back={true} />
      <LoadingModal message='Uploading Image' visible={uploadingImage} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Image
            source={require('../../assets/InsertProduct.png')}
            style={styles.vectorimage}
          />

          <H1 style={styles.AddText}>Add your product</H1>

          <TextInputBox
            inputlabel='Product Name'
            placeholder='Enter product name'
            value={title}
            onChangeText={handleProductNameChange}
            onBlur={handleNameBlur}
            error={errors.title}
            touched={true}
          />
          <TextInputBox
            inputlabel='Quantity Available (Kg)'
            placeholder='Enter quantity available '
            value={quantity}
            onChangeText={handleProductQuantityChange}
            keyboardType='numeric'
            error={errors.quantity}
            touched={true}
            onBlur={() => null}
          />

          <TextInputBox
            inputlabel='Minimum Quantity (Kg)'
            placeholder='Enter minimum quantity that can be provide '
            value={minQtyIncrement}
            onChangeText={handleMinimumQuantityChange}
            keyboardType='numeric'
            error={errors.minQtyIncrement}
            touched={true}
            onBlur={() => null}
          />

          <TextInputBox
            inputlabel='Price of 1Kg'
            placeholder='Enter price of 1Kg'
            value={price}
            onChangeText={handleProductPriceChange}
            keyboardType='numeric'
            error={errors.price}
            touched={true}
            onBlur={() => null}
          />

          <TextInputBox
            inputlabel='Any description'
            placeholder='Enter description if you need'
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            touched={true}
            onBlur={() => null}
          />
          {/* <TextInputBox
            inputlabel="Add product image"
            placeholder="add 3 images here"
          /> */}

          {!isValid && (
            <Text style={{ color: 'red' }}>
              Please fill in all fields correctly
            </Text>
          )}
          {uploadedImageUrls.length < 3 && (
            <View style={styles.buttcont}>
              <Button
                title='Add Image'
                type='icon'
                icon={
                  <Ionicons name='add-circle' size={48} color={Theme.primary} />
                }
                color='shadedPrimary'
                size='normal'
                onPress={pickImage}
                disabled={uploadedImageUrls.length >= 3}
              />
            </View>
          )}
          <View style={styles.imagecont}>
            {uploadedImageUrls.map((image, index) => (
              <View key={index} style={{ position: 'relative' }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteImage(index)}
                  style={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <Ionicons name='close-circle' size={24} color='white' />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* </View> */}
          <Button
            title='Submit'
            color='filledPrimary'
            size='big'
            onPress={handleFormSubmit}
            disabled={uploadedImageUrls.length === 0 || !isValid}
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
    justifyContent: 'center',
    fontFamily: 'Poppins',
    height: '100%',
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
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
    position: 'relative',
    width: '80%',
  },
  inputlabel: {
    paddingLeft: 50,
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  input: {
    position: 'relative',
    height: 40,
    width: '100%',
    fontFamily: 'Poppins',
    paddingLeft: 10,
    backgroundColor: Theme.overlay,
    borderColor: Theme.overlay,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttcont: {
    // justifyContent: 'space-between',
    width: '80%',
  },

  imagecont: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
