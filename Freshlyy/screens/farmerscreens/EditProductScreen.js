import { React, useState, useEffect } from 'react';
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
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from '../../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H1, H2 } from '../../components/Texts';
import env from '../../constants/env';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../utils/firebase';
import { FreshlyyImageStore } from '../../utils/firebase';
import { async } from '@firebase/util';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { min } from 'react-native-reanimated';
import { getStorage, deleteObject } from 'firebase/storage';
import ENV from '../../constants/env';

export default function ({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [minQtyIncrement, setMinQuantity] = useState('');
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState(null);
  const [numImages, setNumImages] = useState(0);

  const pickImage = async () => {
    if (images.length >= 3) {
      return; // Do nothing if three images have already been selected
    }

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
    setNumImages(images.length + 1);
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
      } catch (error) {
        // } catch (e) {
        //   console.log(e);
        console.error(error);
        throw new Error('An error occurred while uploading images.');
      }
      setUploading(false);
      return true;
    });
    const results = await Promise.all(uploadPromises);
    const allImagesUploaded = results.every((result) => result === true); // Check if all images are uploaded successfully
    setImages([]);

    // return allImagesUploaded;
    // Return a boolean value indicating whether all images are uploaded successfully or not
    if (!allImagesUploaded) {
      throw new Error('Not all images were uploaded successfully.');
    }

    return true;
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
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
          ? 'Product Name must be at least 2 characters'
          : /\d/.test(text)
          ? 'Product Name cannot contain numbers'
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
      price: isNaN(Number(text)) ? 'Product Price must be a number' : null,
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
        ? 'Product Quantity must be a number'
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
        : 'Minimum Quantity must be a number and less than or equal to the Available Quantity',
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
    price !== '' &&
    !isNaN(Number(price)) &&
    quantity !== '' &&
    !isNaN(Number(quantity)) &&
    minQtyIncrement !== '' &&
    !isNaN(Number(minQtyIncrement)) &&
    Number(minQtyIncrement) <= Number(quantity);

  useEffect(() => {
    const storage = getStorage();

    fetch(
      ENV.backend + '/farmer/selling-product/' + '63b6b7b160d78bea22456aa8',
      // "${ENV.backend}/farmer/getSellingProduct/?productId=63f4d385b1a06dad48ec25ba",
      {
        method: 'GET',
        headers: {
          useremail: route.params.userEmail,
          'Content-Type': 'application/json',
        },
        productId: '63f4d385b1a06dad48ec25ba',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Malformed Response');
        }
        const data = res.product;
        console.log(data);
        setProduct(data);
      })

      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setProductId('63f4d385b1a06dad48ec25ba');
  }, []);

  const handleUpdate = async () => {
    const productId = '63f4d385b1a06dad48ec25ba';
    try {
      await uploadImages();
      // Fetch existing product data
      const response = await fetch(
        env.backend + '/farmer/selling-product/' + '63b6b7b160d78bea22456aa8'
        // "/farmer/get-product/" + productId
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
        env.backend + '/farmer/update-product/' + '63b6b7b160d78bea22456aa8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await updateResponse.json();
      console.log(data);

      navigation.navigate('productupdated');
    } catch (error) {
      console.error(error);
    }
  };

  const image =
    product.imageUrls?.length > 0 ? product.imageUrls[0].imageUrl : '';
  console.log(image);

  const handleClose = async () => {
    try {
      // Get Firebase Storage reference
      const storage = getStorage();
      const storageRef = ref(storage, 'FreshlyyImagestore');

      // Delete image from Firebase Storage
      if (product.imageUrls?.length > 0) {
        const fileName = product.imageUrls[0].imageUrl.split('/').pop();
        const imageRef = ref(storageRef, fileName);
        await deleteObject(imageRef);
        console.log('Image deleted successfully');
      }

      // Remove image from component state
      setProduct((prevProduct) => ({ ...prevProduct, imageUrls: [] }));
    } catch (error) {
      console.log('Error deleting image:', error);
    }
    setProduct((prevProduct) => ({ ...prevProduct, imageUrls: [] }));
  };
  console.log(images.length);
  return (
    <SafeAreaView>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <H1 style={styles.AddText}>Edit your product</H1>
          <TextInputBox
            inputlabel='Product Name'
            value={product?.title}
            // placeholder={product.title}
            onChangeText={handleProductNameChange}
            error={errors.title}
            touched={true}
          />
          {product && product.qtyAvailable !== undefined && (
            <TextInputBox
              inputlabel='Quantity Available (Kg)'
              value={
                product && product.qtyAvailable
                  ? product.qtyAvailable.toString()
                  : ''
              }
              // value={product.qtyAvailable.toString()}
              onChangeText={handleProductQuantityChange}
              keyboardType='numeric'
              error={errors.quantity}
              touched={true}
            />
          )}
          {product && product.minQtyIncrement !== undefined && (
            <TextInputBox
              inputlabel='Minimum Quantity (Kg)'
              value={
                product && product.minQtyIncrement
                  ? product.minQtyIncrement.toString()
                  : ''
              }
              // value={product.minQtyIncrement.toString()}
              onChangeText={handleMinimumQuantityChange}
              keyboardType='numeric'
              error={errors.minQtyIncrement}
              touched={true}
            />
          )}
          {product && product.price !== undefined && (
            <TextInputBox
              inputlabel='Price of 1Kg (Rs)'
              value={product && product.price ? product.price.toString() : ''}
              onChangeText={handleProductPriceChange}
              keyboardType='numeric'
              error={errors.price}
              touched={true}
            />
          )}
          <TextInputBox
            inputlabel='Any description'
            value={product.description}
            onChangeText={handleDescription}
            error={errors.description}
            touched={true}
          />

          {!isValid && (
            <Text style={{ color: 'red' }}>
              You can upload maximum three images of a product
            </Text>
          )}
          <View style={styles.previmage}>
            {image && (
              <>
                <Image source={{ uri: image }} style={styles.fillimage} />
                <TouchableOpacity
                  onPress={handleClose}
                  style={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <Ionicons name='close-circle' size={24} color='white' />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.maincont}>
            <View style={styles.buttcont}>
              {images.length < 3 && (
                <Button
                  title='Add Image'
                  type='icon'
                  icon={
                    <Ionicons
                      name='add-circle'
                      size={48}
                      color={Theme.primary}
                    />
                  }
                  color='shadedPrimary'
                  size='normal'
                  onPress={pickImage}
                  disabled={numImages >= 3} // use the numImages state variable
                />
              )}
            </View>

            <View style={styles.imageCon}>
              {/* {images.map((image, index) => (
              
                  <Image key={index} source={image} style={styles.newimage} />
                  
                  <TouchableOpacity
                    onPress={() => handleDeleteImage(index)}
                    style={{ position: "absolute", top: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={24} color="white" />
                  </TouchableOpacity>
                
              ))} */}
              {images.map((image, index) => (
                <View key={index}>
                  <Image source={image} style={styles.newimage} />
                  <TouchableOpacity
                    onPress={() => handleDeleteImage(index)}
                    style={{ position: 'absolute', top: 10, right: 10 }}
                  >
                    <Ionicons name='close-circle' size={24} color='white' />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <Button
            title='Update'
            color='filledPrimary'
            size='big'
            onPress={() => handleUpdate(navigation.navigate('productupdated'))}
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
    width: 200,
  },

  imagecont: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttco: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  fillimage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  maincont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCon: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -5,
  },
  newimage: {
    width: 150,
    height: 150,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
});
