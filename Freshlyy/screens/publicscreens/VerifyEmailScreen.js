import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5 } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import * as Animatable from 'react-native-animatable';
import { Animations } from '../../constants/Animation';
import { auth } from '../../utils/firebase';
import Loading from '../../components/Loading';
import LoadingModal from '../../components/LoadingModal';
import LottieView from 'lottie-react-native';

export default function ({ navigation, route }) {
  console.log(route.params.userData)
  const [errors, setErrors] = useState("");
  const [resend, setReSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [idToken,SetIdToken]=useState()
  const [validUser, setValidUser] = useState();


  const handleVerifyEmail = async () => {
    const user = auth.currentUser;
    user
      .getIdToken()
      .then((token) => {
        // Send the idToken to the backend for authentication and database storage
        // console.log("ID token:",token);
        // console.log(route.params.userData)
        // console.log(user.toJSON().stsTokenManager.accessToken)
        SetIdToken(token)
      })
      .catch((error) => {
        if(error.code==='auth/user-token-expired'){
          setErrors("Time out try again!");
          return;
        }
        console.error("Error getting ID token:", error);
      });
    if (user) {
      setValidUser(user);
      try {
        await user.reload();
        if (user.emailVerified) {
          setErrors('')
          console.log("Success", "Email has been verified!");
          await SendToRegister(idToken);
        } 
        else{
          setErrors("Email has not been verified!")
        }
      } catch (error) {
        if(error.code==='auth/internal-error'){
          setErrors("Try again later!");
          return;
        }
       
        if(error.code==='auth/email-already-exists'){
          setErrors("User account already exists!");
          return;
        }
        if(error.code==='auth/user-token-expired'){
          setErrors("User account already exists!");
          return;
        }
        else{
          setErrors(error.code)
        }
        //console.log("Error", error.message);
      }
    }
  };

  const SendToRegister = (idToken) => {
   // console.log(idToken)
    fetch(ENV.backend + "/customer/signup", {
      method: "POST",
      headers: {
        useremail:'gimhani@freshlyy.com',
        Authorization:idToken,
        "Content-Type": "application/json",
      },
      body:route.params.userData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Hi");
        setEmailVerified(true);
        // if(res.message==='Success'){
        //   const email=res.email
        //   navigation.navigate("login",{message:'Success',userEmail:email,token:idToken});
        // }
       if(res.message==='unsuccess'){
        setErrors(res.error)
       }
      })
      .catch((err) => {
       
        setErrors(err.error)
      });
  };

  const handleResendVerification = () => {
    setReSend(true);
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        console.log("Email verification resent");
        setReSend(false);
      })
      .catch((error) => {
        setReSend(false);
       if(error.code==='auth/email-already-in-use'){
          setErrors("User account already exists!");
          return;
        }
      });
  };

    const onAnimationFinish = () => {
      navigation.navigate("login",{message:'Success',});
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
              source={require("../../assets/success.png")}
              style={styles.messageImage}
            />
            <H3 style={styles.messageTitle}>Verification Email Sent!</H3>
            <H5 style={styles.messageText}>
              Please verify your email to sign in
            </H5>
            {errors ? <H5 style={styles.errText}>{errors}</H5> : null}
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
    fontFamily: "Poppins",
    height: "100%",
  },
  pageContent: {
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  messageImage: {
    height: 150,
    resizeMode: "contain",
  },
  messageTitle: {
    fontFamily: "Poppins",
    textAlign: "center",
    paddingVertical: 50,
  },
  messageText: {
    paddingBottom: 10,
    textAlign: "center",
  },
  buttCont: {
    display: "flex",
    flexDirection: "row",
  },
  errText: {
    color: Theme.danger,
    paddingBottom: 10,
    textAlign: "center",
  },
});
