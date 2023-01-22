import React from 'react';
import { StyleSheet, View, Image, ScrollView, TextInput } from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { H2 } from '../components/Texts';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Formik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import CardTypeSelector from '../components/CardTypeSelector';

const CardSchema = Yup.object().shape({
  Nickname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  CardHolderName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  CardNumber: Yup.string()
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      'Invalid Card'
    )
    .required('Required'),
  CVV: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'Invalid CVV/CVN')
    .required('Required'),
  ExpiryDate: Yup.date().required('Required'),
});

export default function () {
  const [cardType, setCardType] = React.useState();
  function determineCardType(cardNumber) {
    if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      setCardType('Amex');
    } else if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      setCardType('Visa');
    } else if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        cardNumber
      )
    ) {
      setCardType('Master');
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2 style={{ textAlign: 'center' }}>Add Card</H2>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../assets/bigcard.png')}
              style={styles.vectorimage}
            />
            <CardTypeSelector selectedType={cardType} />
            <Formik
              initialValues={{
                Nickname: '',
                CardHolderName: '',
                CardNumber: '',
                CVV: '',
                ExpiryDate: '',
              }}
              validationSchema={CardSchema}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldTouched,
              }) => (
                <View style={styles.inputcont}>
                  <TextInputBox
                    inputlabel='Card Number'
                    placeholder='Enter card card number'
                    name='CardNumber'
                    value={values.CardNumber}
                    onChangeText={handleChange('CardNumber')}
                    error={errors.CardNumber}
                    onBlur={() => {
                      setFieldTouched('CardNumber', true, true);
                      if (!errors.CardNumber)
                        determineCardType(values.CardNumber);
                    }}
                    touched={touched.CardNumber}
                  />
                  <TextInputBox
                    inputlabel='Card Nickname'
                    placeholder='Enter a nickname'
                    name='Nickname'
                    onChangeText={handleChange('Nickname')}
                    onBlur={() => setFieldTouched('Nickname', true, true)}
                    value={values.Nickname}
                    error={errors.Nickname}
                    touched={touched.Nickname}
                  />
                  <TextInputBox
                    inputlabel='Card Holder Name'
                    placeholder='Enter card holder name'
                    name='CardHolderName'
                    value={values.CardHolderName}
                    onChangeText={handleChange('CardHolderName')}
                    error={errors.CardHolderName}
                    onBlur={() => setFieldTouched('CardHolderName', true, true)}
                    touched={touched.CardHolderName}
                  />
                  <TextInputBox
                    inputlabel='CVV/CVN'
                    placeholder='Enter CVV/CVN'
                    name='CVV'
                    value={values.CVV}
                    onChangeText={handleChange('CVV')}
                    error={errors.CVV}
                    onBlur={() => setFieldTouched('CVV', true, true)}
                    touched={touched.CVV}
                  />
                  <TextInputBox
                    inputlabel='Expiry Date'
                    placeholder='-- Select'
                    name='ExpiryDate'
                    value={values.ExpiryDate}
                    onChangeText={handleChange('ExpiryDate')}
                    error={errors.ExpiryDate}
                    onBlur={() => setFieldTouched('ExpiryDate', true, true)}
                    touched={touched.ExpiryDate}
                  />
                  <Button title='Save Card' color='filledWarning' size='big' />
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
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  vectorimage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  inputcont: {
    width: '100%',
    alignItems: 'center',
  },
});
