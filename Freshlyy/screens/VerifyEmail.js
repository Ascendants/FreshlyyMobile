import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5 } from '../components/Texts';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import ProductHomePageScreen from './ProductHomePageScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import * as Yup from "yup";
import PhoneInput from "react-native-phone-number-input";
import * as Animatable from "react-native-animatable";
import { Animations } from "../constants/Animation";
import { auth } from "../utils/firebase";
import Loading from '../components/Loading';
import LoadingModal from '../components/LoadingModal';
import LottieView from 'lottie-react-native';

export default function ({ navigation, route }) {
    const[errors,setErrors]=useState("")
    const [resend,setReSend]=useState(false)
    const [emailVerified, setEmailVerified] = useState(false);
    console.log(route.params.userData)
    const handleVerifyEmail = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            console.log(user)
            await user.reload();
            if (user.emailVerified) {
              console.log(user);
              console.log("Success", "Email has been verified!");
              setEmailVerified(true);
            } else {
                setErrors("Email has not been verified!")
              console.log("Error", "Email has not been verified!");
            }
          } catch (error) {
            setErrors(error.message)
            console.log("Error", error.message);
          }
        }
      };

      const handleResendVerification = () => {
        setReSend(true)
        auth.currentUser.sendEmailVerification()
          .then(() => {
            console.log('Email verification resent');
            setReSend(false)
          })
          .catch((error) => {
            setReSend(false)
            console.log(error);
            setErrors("Try again!")
         
          });
      };

      const onAnimationFinish = () => {
        navigation.navigate("homePage");
    };
  
  return (
    <SafeAreaView>
    <View style={styles.screen}>
      <LoadingModal message="Submitting" visible={resend} />
      <Header back={true} />
      <View style={styles.pageContent}>
        {emailVerified ? (
          <LottieView
            source={{
              uri:
                "https://assets10.lottiefiles.com/private_files/lf30_3ghvm6sn.json",
            }}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
          />
        ) : (
          <>
            <Image
              source={require("../assets/success.png")}
              style={styles.messageImage}
            />
            <H3 style={styles.messageTitle}>Verification Email Sent!</H3>
            <H5 style={styles.messageText}>
              Please verify your email to sign in
            </H5>
            {errors?<H5 style={styles.errText}>{errors}</H5>:null}
            <View style={styles.buttCont}>
              <Button
                title="Resend"
                color="filledWarning"
                size="big"
                onPress={handleResendVerification}
              />
              <Button
                title="Sign Up"
                color="filledPrimary"
                size="big"
                onPress={handleVerifyEmail}
              />
            </View>
          </>
        )}
      </View>
    </View>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    fontFamily: 'Poppins',
    height: '100%',
  },
  pageContent: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  messageImage: {
    height: 150,
    resizeMode: 'contain',
  },
  messageTitle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingVertical: 50,
  },
  messageText: {
    paddingBottom:10,
    textAlign: 'center',
  },
  buttCont:{
    display:'flex',
    flexDirection:'row',
  },
  errText:{
    color:Theme.danger,
    paddingBottom:10,
    textAlign: 'center',
  }

});
