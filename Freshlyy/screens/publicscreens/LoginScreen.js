import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import { TextInputBox, DropDownPicker } from '../../components/Inputs';
import { H1, H2, H4, H6, H7 } from '../../components/Texts';
import Header from '../../components/Header';
import * as Yup from 'yup';
import LoadingModal from '../../components/LoadingModal';
import { Formik, validateYupSchema, useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function ({ navigation, route }) {
  const [valid, setValid] = useState(false);
  const [err, setErr] = useState('');
  const auth = getAuth();
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: validationSchema,
  });

  const handleLogin = async (email, password) => {
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is signed in
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setErr('Something went wrong');
      if (err.code === 'auth/wrong-password') {
        setErr('Invalid Credentials!');
        return;
      }
      if (err.code === 'auth/user-not-found') {
        setErr('Invalid Credentials!');
        return;
      }
      if (err.code === 'auth/internal-error') {
        setErr('Try again later!');
        return;
      }
      if (err.code === 'auth/user-token-expired') {
        setErr('User account already exists!');
        return;
      } else {
        setErr('Try again later!');
      }
    }
  };
  //    await auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
  //     // User is signed in
  //     const user =userCredential.user
  //     if(user){
  //       setSubmitting(false);
  //      // console.log('User logged in:', user);
  //       //console.log(user.toJSON().stsTokenManager.accessToken)
  //       //navigation.navigate("Farmer Dashboard",{message:'Success',userData:JSON.stringify(route.params.userData)});

  //      navigation.navigate("homePage",{message:'Success',token:idToken});
  //     }
  //     else{
  //       setSubmitting(false);
  //     }

  //   })
  //   .catch((error) => {
  //     setSubmitting(false);
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     if(errorCode==='auth/user-not-found'){
  //       setErr("Invalid user credentials")
  //       // console.error('Error logging in:', errorMessage,errorCode);
  //     }

  //   });
  // };

  const submit = async () => {
    setErr('');
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) {
      setSubmitting(false);
      return;
    }
    for (let error in formik.errors)
      if (error) {
        setSubmitting(false);
        return;
      }
    const data = formik.values;
    setValid(true);
    handleLogin(data.email, data.password);
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.screen}>
          <LoadingModal message='Logging In' visible={submitting} />
          <Header back={true} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pageContent}>
              <Image
                source={require('../../assets/loginpic.png')}
                style={styles.loginpic}
              />
              <H4 style={styles.logintext}>Log In</H4>
              <View style={styles.inputcont}>
                <TextInputBox
                  inputlabel='Email'
                  placeholder='Enter Email'
                  type='email-address'
                  name='email'
                  onChangeText={formik.handleChange('email')}
                  onBlur={() => formik.setFieldTouched('email', true, true)}
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onFocus={() => formik.setFieldTouched('email', true, true)}
                />
                <TextInputBox
                  inputlabel='Password'
                  placeholder='Password'
                  type='password'
                  name='password'
                  secure={true}
                  onChangeText={formik.handleChange('password')}
                  onBlur={() => formik.setFieldTouched('password', true, true)}
                  value={formik.values.password}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  onFocus={() => formik.setFieldTouched('password', true, true)}
                />
              </View>
              {err ? <H6 style={styles.messageText}> {err}</H6> : null}
              <Button
                title='Login'
                color='filledPrimary'
                size='big'
                onPress={submit}
              />
              <H7 style={{ color: Theme.secondary }}>Forgot Password</H7>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  loginpic: {
    width: 300,
    height: 200,
    marginTop: 50,
    marginBottom: 0,
  },
  logintext: {
    margin: 0,
    color: Theme.primary,
  },
  inputcont: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageText: {
    color: Theme.danger,
    paddingBottom: 10,
    textAlign: 'center',
  },
});
