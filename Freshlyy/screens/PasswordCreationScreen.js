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
import { TextInputBox, DropDownPicker, CheckBox } from '../components/Inputs';
import Header from '../components/Header';

import { H1, H2, H4 } from '../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik, validateYupSchema, useFormik } from 'formik';
import * as Yup from 'yup';

export default function ({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  console.log(route.params);
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    cpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      cpassword: '',
    },

    validationSchema: validationSchema,
  });

  async function submit() {
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) return;
    for (let error in formik.errors) if (error) return;
    const data = formik.values;
    setValid(true);
    console.log(data);
    if (valid) {
      navigation.navigate('beFarmer', { type: 'Success' });
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require('../assets/passwordvec.png')}
            style={styles.loginpic}
          />
          <View style={styles.inputcont}>
            <TextInputBox
              inputlabel='password'
              placeholder='password'
              type='password'
              name='password'
              secure={true}
              onChangeText={formik.handleChange('password')}
              onBlur={() => formik.setFieldTouched('password', true, true)}
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
            <TextInputBox
              inputlabel='confirmPassword'
              placeholder='Confirm Password'
              type='password'
              name='cpassword'
              secure={true}
              onChangeText={formik.handleChange('cpassword')}
              onBlur={() => formik.setFieldTouched('cpassword', true, true)}
              value={formik.values.cpassword}
              error={formik.errors.cpassword}
              touched={formik.touched.cpassword}
            />
          </View>
          <View></View>
          <Button
            title='Next'
            color='filledSecondary'
            size='big'
            onPress={submit}
          />

          {/* <CheckBox /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
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
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
