import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H1, H2 } from '../components/Texts';
import env from '../constants/env';

export default function () {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const[quantity,setQuantity]=useState('');
  const [description, setDescription]= useState('');
  const [minQtyIncrement, setMinQuantity]= useState('');


  const handleSubmit = async () => {
   
    try {
      const response = await fetch(env.backend+'/farmer/insertProduct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title:title,
          price:price,
          quantity:quantity,
          description:description,
          minQtyIncrement: minQtyIncrement,
        }),
      });
      // if (response.status === 200) {
      //   // Navigate to the next screen after successful product addition
      //   navigation.navigate('');
      // }
      const data = await response.json();
      console.log(data)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
   return (
    <SafeAreaView>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Image
            source={require('../assets/InsertProduct.png')}
            style={styles.vectorimage}
          />
          

          <H1 style={styles.AddText}>Add your product</H1>

          <TextInputBox
            inputlabel='Product Name'
            placeholder='Enter product name'
            value={title} 
            onChangeText={setTitle}
          />
          <TextInputBox
            inputlabel='Quantity Available (Kg)'
            placeholder='Enter quantity available '
            value={quantity} 
            onChangeText={setQuantity}
            keyboardType= 'numeric'
          />
          <TextInputBox
            inputlabel='Minimum Quantity (Kg)'
            placeholder='Enter minimum quantity that can be provide '
            value={minQtyIncrement} 
            onChangeText={setMinQuantity}
            keyboardType= 'numeric'
          />
          <TextInputBox
            inputlabel='Price of 1Kg'
            placeholder='Enter price of 1Kg'
            value={price} 
            onChangeText={setPrice}
            keyboardType= 'numeric'
          />
          <TextInputBox
            inputlabel='Any description'
            placeholder='Enter description if you need'
            value={description}
            onChangeText={setDescription}
          />
          <TextInputBox
            inputlabel='Add product image'
            placeholder='add 3 images here'
          />
          <View style={styles.buttcont}>
            <Button title='Upload' color='shadedPrimary' size='normal' />
            <Button title='Delete image' color='shadedDanger' size='normal' />
          </View>
          <Button title='Submit' color='filledPrimary' size='big' onPress={handleSubmit}/>
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
    marginBottom: 80
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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    },
});
