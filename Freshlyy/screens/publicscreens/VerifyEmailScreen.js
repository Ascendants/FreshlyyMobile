import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { H3, H5 } from '../../components/Texts';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { auth } from '../../utils/firebase';
import LoadingModal from '../../components/LoadingModal';
import LottieView from 'lottie-react-native';

export default function ({ navigation, route }) {
  console.log(route.params.userData);
  const [errors, setErrors] = useState('');
  const [resend, setReSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [validUser, setValidUser] = useState();
  console.log(auth.currentUser);
  const handleVerifyEmail = async () => {
    try {
      const user = auth.currentUser;
      const idToken = await auth.currentUser
        .getIdToken()
        .then((token) => {
          return token;
        })
        .catch((error) => {
          if (error.code === 'auth/user-token-expired') {
            setErrors('Time out try again!');
            return;
          }
          console.error('Error getting ID token:', error);
        });
      if (user) {
        setValidUser(user);
        try {
          await user.reload();
          if (user.emailVerified) {
            setErrors('');
            console.log('Email has been verified!');
            await SendToRegister(idToken);
          } else {
            setErrors('Email has not been verified!');
          }
        } catch (error) {
          if (error.code === 'auth/internal-error') {
            setErrors('Try again later!');
            return;
          }

          if (error.code === 'auth/email-already-exists') {
            setErrors('User account already exists!');
            return;
          }
          if (error.code === 'auth/user-token-expired') {
            setErrors('User account already exists!');
            return;
          } else {
            setErrors(error.code);
          }
          //console.log("Error", error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SendToRegister = async (idToken) => {
    // console.log(idToken)
    try {
      const result = await fetch(ENV.backend + '/customer/signup', {
        method: 'POST',
        headers: {
          Authorization: idToken,
          'Content-Type': 'application/json',
        },
        body: route.params.userData,
      });
      const res = await result.json();
      console.log('Res', res);
      console.log(route.params.userData);
      if (res.message === 'Success') {
        setEmailVerified(true);
        return auth.signOut();
      }
      if (res.message === 'Unsuccessful') {
        setErrors(res.error);
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleResendVerification = () => {
    setReSend(true);
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        console.log('Email verification resent');
        setReSend(false);
      })
      .catch((error) => {
        setReSend(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrors('User account already exists!');
          return;
        }
      });
  };

  const onAnimationFinish = () => {
    navigation.navigate('login', { message: 'Success' });
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Submitting' visible={resend} />
        <Header back={true} />
        <View style={styles.pageContent}>
          {emailVerified ? (
            <LottieView
              source={{
                uri: 'https://assets10.lottiefiles.com/private_files/lf30_3ghvm6sn.json',
              }}
              autoPlay
              loop={false}
              onAnimationFinish={onAnimationFinish}
            />
          ) : (
            <>
              <Image
                source={require('../../assets/success.png')}
                style={styles.messageImage}
              />
              <H3 style={styles.messageTitle}>Verification Email Sent!</H3>
              <H5 style={styles.messageText}>
                Please verify your email to sign in
              </H5>
              {errors ? <H5 style={styles.errText}>{errors}</H5> : null}
              <View style={styles.buttCont}>
                <Button
                  title='Resend'
                  color='filledWarning'
                  size='big'
                  onPress={handleResendVerification}
                />
                <Button
                  title='Sign Up'
                  color='filledPrimary'
                  size='big'
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
    paddingBottom: 10,
    textAlign: 'center',
  },
  buttCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  errText: {
    color: Theme.danger,
    paddingBottom: 10,
    textAlign: 'center',
  },
});
