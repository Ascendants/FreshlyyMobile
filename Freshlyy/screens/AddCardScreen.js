import React from 'react';
import { StyleSheet, View, Image, ScrollView, Settings } from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, MaskedTextInputBox } from '../components/Inputs';
import { H2, P } from '../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import CardTypeSelector from '../components/CardTypeSelector';
import ENV from '../constants/env';
import LoadingModal from '../components/LoadingModal';
// test page
const cardTypes = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  master:
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
  amex: /^3[47][0-9]{13}$/,
};

const CardSchema = Yup.object().shape({
  Nickname: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  CardHolderName: Yup.string()
    .min(2, 'Too Short!')
    .max(22, 'Too Long!')
    .required('Required'),
  CardNumber: Yup.string()
    .matches(
      cardTypes.amex.source +
        '|' +
        cardTypes.master.source +
        '|' +
        cardTypes.visa.source,
      'Invalid Card'
    )
    .required('Required'),
  CVV: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'Invalid CVV/CVN')
    .required('Required'),
  ExpiryDate: Yup.string().matches(/((0[1-9])|(1[02]))\/\d{2}/, 'Invalid Date'),
});

export default function ({ navigation, route }) {
  const [cardType, setCardType] = React.useState();
  const [isAmex, setIsAmex] = React.useState();
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      Nickname: '',
      CardHolderName: '',
      CardNumber: '',
      CVV: '',
      ExpiryDate: '',
    },
    validationSchema: CardSchema,
  });

  function handleCardNumber(e) {
    if (formik.values.CardNumber.startsWith('3')) {
      setIsAmex(true);
    } else {
      setIsAmex(false);
    }
    const value = e.replace(/ /g, '');
    formik.setFieldValue('CardNumber', value);
  }
  function determineCardType() {
    if (!formik.errors.CardNumber) {
      if (cardTypes.amex.test(formik.values.CardNumber)) {
        setCardType('Amex');
      } else if (cardTypes.visa.test(formik.values.CardNumber)) {
        setCardType('Visa');
      } else if (cardTypes.master.test(formik.values.CardNumber)) {
        setCardType('Master');
      } else {
        setCardType(null);
      }
    } else {
      setCardType(null);
    }
  }
  async function submit() {
    for (let error in formik.errors) if (error) return;
    const data = formik.values;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 2300);
    fetch(ENV.backend + '/customer/save-card/', {
      method: 'POST',
      headers: {
        userEmail: route.params.userEmail,
        'Content-Type': 'application/json',
        //this will be replaced with an http only token
        //after auth gets set
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') throw new Error('Something went wrong');
        navigation.navigate('Message', {
          type: 'Success',
          messageTitle: 'Card Saved!',
          messageText: 'The card has been saved securely',
          goto: 'Card Management',
          goButtonText: 'View Cards',
        });
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        if ((err.message = 'Not Available')) {
          navigation.navigate('Message', {
            type: 'fail',
            messageTitle: 'Card could not be saved :(',
            messageText: 'There was something wrong with your card.',
            goto: 'Card Management',
            goButtonText: 'View Cards',
          });
          return;
        }
      });
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message='Saving Card' visible={submitting} />
        <Header back={true} home={true} />
        <H2 style={{ textAlign: 'center' }}>Add Card</H2>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require('../assets/bigcard.png')}
              style={styles.vectorimage}
            />
            <CardTypeSelector selectedType={cardType} />
            <View style={styles.inputcont}>
              <MaskedTextInputBox
                mask={isAmex ? '9999 999999 99999' : '9999 9999 9999 9999'}
                inputlabel='Card Number'
                placeholder='Enter card card number'
                name='CardNumber'
                value={formik.values.CardNumber}
                onChangeText={handleCardNumber}
                error={formik.errors.CardNumber}
                onBlur={() => {
                  formik.setFieldTouched('CardNumber', true, true);
                  determineCardType();
                }}
                touched={formik.touched.CardNumber}
              />
              <TextInputBox
                inputlabel='Card Nickname'
                placeholder='Enter a nickname'
                name='Nickname'
                onChangeText={formik.handleChange('Nickname')}
                onBlur={() => formik.setFieldTouched('Nickname', true, true)}
                value={formik.values.Nickname}
                error={formik.errors.Nickname}
                touched={formik.touched.Nickname}
              />
              <TextInputBox
                inputlabel='Card Holder Name'
                placeholder='Enter card holder name'
                name='CardHolderName'
                value={formik.values.CardHolderName}
                onChangeText={formik.handleChange('CardHolderName')}
                error={formik.errors.CardHolderName}
                onBlur={() =>
                  formik.setFieldTouched('CardHolderName', true, true)
                }
                touched={formik.touched.CardHolderName}
              />
              <TextInputBox
                inputlabel='CVV/CVN'
                placeholder='Enter CVV/CVN'
                name='CVV'
                value={formik.values.CVV}
                onChangeText={formik.handleChange('CVV')}
                error={formik.errors.CVV}
                onBlur={() => formik.setFieldTouched('CVV', true, true)}
                touched={formik.touched.CVV}
              />
              <MaskedTextInputBox
                mask='99/99'
                inputlabel='Expiry Date'
                placeholder='MM/YY'
                name='ExpiryDate'
                value={formik.values.ExpiryDate}
                onChangeText={formik.handleChange('ExpiryDate')}
                error={formik.errors.ExpiryDate}
                onBlur={() => formik.setFieldTouched('ExpiryDate', true, true)}
                touched={formik.touched.ExpiryDate}
              />
              <Button
                title='Save Card'
                color='filledWarning'
                size='big'
                onPress={submit}
              />
              <P style={{ color: Theme.danger }}>
                {!formik.isValid && Object.keys(formik.touched).length
                  ? 'You have entered invalid data'
                  : null}
              </P>
            </View>
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
