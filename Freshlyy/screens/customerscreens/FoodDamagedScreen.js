import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { H8, H4, H5, P } from '../../components/Texts';
import { TextInputBox } from '../../components/Inputs';
import * as ImagePicker from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Buttons';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import { async } from '@firebase/util';
import ENV from '../../constants/env';

export default function ({ navigation, route }) {
  // handleChoosePhoto = () => {
  //   const options = {};
  //   launchImageLibrary({mediaType:'photo',cameraType:'front'},(res)=>{ console.log('my result is',res) })
  // };

  const [selectedImage, setSelectedImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const orderId = route.params.orderId;
  const userEmail = route.params.userEmail;

  // const selectImage = () => {
  //   ImagePicker.launchImageLibrary({ title: 'Select Image' }, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       setSelectedImage(response.uri);
  //     }
  //   });
  // };

  // const uploadImage = async () => {
  //   setUploading(true);
  //   setUploadProgress(0);

  //   // Get the filename and path of the selected image
  //   const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
  //   const path = `images/${filename}`;

  //   // Create a reference to the Firebase storage bucket and upload the image
  //   const storageRef = firebase.storage().ref(path);
  //   const response = await fetch(selectedImage);
  //   const blob = await response.blob();
  //   const task = storageRef.put(blob);

  //   // Update the upload progress as the image uploads
  //   task.on('state_changed', (snapshot) => {
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     setUploadProgress(progress);
  //   });

  //   // Wait for the upload to complete
  //   await task;

  //   // Get the download URL of the uploaded image and log it
  //   const downloadURL = await storageRef.getDownloadURL();
  //   console.log('Image uploaded to: ', downloadURL);

  //   // Reset the state and clear the selected image
  //   setSelectedImage(null);
  //   setUploading(false);
  //   setUploadProgress(0);
  // }
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const issue = 'Food Damaged';

  const handleSubmit = async () => {
    try {
      console.log(route.params.userEmail);
      const response = await fetch(ENV.backend + '/farmer/support-ticket/', {
        method: 'POST',
        headers: {
          Authorization: route.params.auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          issue: issue,
          desc: desc,
          orderId: orderId,
        }),
      });
      const data = await response.json();
      const id = data.id;
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Ticket Sent Successfully!',
        subjectId: id,
        messageText:
          ' is your ticket number. An administrator will be in touch with you shortly!',
        goto: 'Farmer Dashboard',
        goButtonText: 'Dashboard',
      });
      // console.log(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>
          Help With an Order
        </H4>
        <H5 style={{ textAlign: 'center', marginVertical: 10 }}>
          Food damage or quality issue
        </H5>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <P>
            If you were not happy with the quality of your food, please give the
            restaurant direct feedback by rating them on the Freshlyy app. You
            can do so by tapping "All Orders" at the dashboard of your app, then
            tapping "Review" next to the total amount.
          </P>
          <P></P>
          <P>Please leave a review if:</P>
          <P>- The portion size was smaller than expected</P>
          <P>- You were unhappy with the taste or preparation of the food</P>
          <P>- The food was too hot or too cold</P>
          <P></P>
          <P>
            Your reviews are an important way for Freshlyy toensure that we
            partner with only the highest quality farmers.
          </P>
          <P>
            If you have other issues with the food quality or if you received a
            damaged order, please share a few details about what was wrong so
            our team can help. A photo of the affected item is also required in
            order to review your concern.
          </P>
          <P></P>
          <P>
            Once you've submitted your information we'll assess whether you're
            eligible for a refund.
          </P>
          <TextInputBox
            inputlabel='Name(s) of item(s) affected'
            placeholder=''
            value={name}
            onChangeText={(text) => setName(text)}
            onBlur={() => {
              console.log('');
            }}
            onFocus={() => {
              console.log('');
            }}
          />
          <Text style={styles.inputLabel}>
            Screenshot of the error message while you are trying to sign in
          </Text>
          <TouchableOpacity>
            <View style={styles.inputImgBox}>
              <Ionicons name='image' size={22} color={Theme.tertiary} />
              <H8 style={{ color: Theme.tertiary }}>Select file</H8>
            </View>
          </TouchableOpacity>
          <TextInputBox
            inputlabel='Share details'
            placeholder=''
            value={desc}
            onChangeText={(text) => setDesc(text)}
            onBlur={() => {
              console.log('');
            }}
            onFocus={() => {
              console.log('');
            }}
          />
          <View style={{ width: '40%', alignSelf: 'center' }}>
            <Button
              size='normal'
              color='shadedSecondary'
              title='submit'
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: '100%',
    paddingHorizontal: 20,
  },
  inputLabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  inputImgBox: {
    backgroundColor: Theme.contrastTextColor,
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
