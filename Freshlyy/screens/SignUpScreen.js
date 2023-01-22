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
import { Formik, validateYupSchema } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  nic: Yup.string().matches(
    '^([0-9]{9}[x|X|v|V]|[0-9]{12})$',
    'Enter Valid NIC number'
  ),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../assets/signupvector.png')}
              style={styles.vectorimage}
            />
            {/* <DatePicker/> */}
            <Formik
              initialValues={{
                name: '',
                lname: '',
                email: '',
                nic: '',
              }}
              validationSchema={SignupSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
                isValid,
                setFieldTouched,
              }) => (
                <View style={styles.inputcont}>
                  <TextInputBox
                    inputlabel='First Name'
                    placeholder='Enter first name'
                    value={values.name}
                    onChange={handleChange('name')}
                    error={errors.name}
                    onBlur={() => handleBlur('name')}
                  />

                  <TextInputBox
                    inputlabel='Last Name'
                    placeholder='Enter last name '
                    value={values.lname}
                    onChange={handleChange('lname')}
                    error={errors.lname}
                    onBlur={() => handleBlur('lname')}
                  />
                  <TextInputBox
                    inputlabel='Email'
                    placeholder='Enter email'
                    type='email-address'
                    value={values.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                    onBlur={() => handleBlur('email')}
                  />

                  <DropDownPicker
                    inputlabel='Gender'
                    list={[
                      { label: 'Male', value: 'm' },
                      { label: 'Female', value: 'f' },
                      { label: 'Other', value: 'o' },
                    ]}
                  />
                  <TextInputBox
                    inputlabel='NIC Number'
                    placeholder='Enter NIC'
                    value={values.nic}
                    onChange={handleChange('nic')}
                    error={errors.nic}
                  />
                  <TextInputBox
                    inputlabel='Street No'
                    placeholder='Enter street no'
                  />
                  <TextInputBox
                    inputlabel='Address line 1'
                    placeholder='Enter address 1'
                  />
                  <TextInputBox
                    inputlabel='Address line 2'
                    placeholder='Enter address 2'
                  />
                  <Button title='Next' color='filledSecondary' size='big' onPress={()=>navigation.navigate('createPassword')}/>
                </View>
              )}
            </Formik>
            <View style={styles.inputcont}></View>
          </View>
        </ScrollView>
      </View>
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
    alignItems: 'center',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginVertical: 30,
  },
  inputcont: {
    position: 'relative',
    width: '90%',
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputlabel: {
    paddingLeft: 10,
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
});
{
  /* <View>
<Image source={require('../assets/logo.png')} style={styles.logo} />
</View>
<Image
source={require('../assets/signupvector.png')}
style={styles.vectorimage}
/> */
}
