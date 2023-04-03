import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, } from 'react-native';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H7, H6 } from '../components/Texts';
import { TextInputBox, } from '../components/Inputs';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, getDate, min } from 'date-fns';
import ENV from "../constants/env";
import { Formik } from "formik";
import * as Yup from "yup";


export default function ({ navigation, route }) {
  const [createDate, setCreateDate] = useState(new Date());
  const [expireDate, setExpireDate] = useState(new Date());
  const [showCreateDatePicker, setShowCreateDatePicker] = useState(false);
  const [showExpireDatePicker, setShowExpireDatePicker] = useState(false);
  const [createDateString, setCreateDateString] = useState('--');
  const [expireDateString, setExpireDateString] = useState('--');

  const [presentage, setPresentage] = useState('');
  const [code, setCode] = useState('');

  const [showInstructions, setShowInstructions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


  const handleCreateDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || createDate;
    setCreateDate(currentDate);
    setCreateDateString(format(currentDate, 'yyyy-MM-dd'));
    setShowCreateDatePicker(false);
  };

  const handleExpireDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setExpireDate(currentDate);
    setExpireDateString(format(currentDate, 'yyyy-MM-dd'));
    setShowExpireDatePicker(false);
    // console.log(date);
  };

  useEffect(() => {
    const generateCouponCode = () => {
      const randomDigits = Math.floor(Math.random() * 10000);
      const formattedDigits = String(randomDigits).padStart(4, "0");
      const couponCode = `CP${formattedDigits}`;
      return couponCode;
    };
  
    const generateSuggestions = () => {
      const couponCodes = [];
      for (let i = 0; i < 2; i++) {
        const couponCode = generateCouponCode();
        couponCodes.push(couponCode);
      }
      setSuggestions(couponCodes);
    };
  
    generateSuggestions();
  }, []);

  const couponRegex = /^CP\d{4}$/;

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch(ENV.backend + '/farmer/verify-coupon-code/', {
  //       method: 'POST',
  //       headers: {
  //         useremail: route.params.userEmail,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         cCode: code,
  //       })
  //     })
  //     const result = await response.json();
  //     if (result.isExist) {
  //       alert(`Coupon code ${code} already exists`);
  //     } else {
  //       const response = await fetch(ENV.backend + "/farmer/create-coupon/", {
  //         method: 'POST',
  //         headers: {
  //           useremail: route.params.userEmail,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           presentage: presentage,
  //           cCode: code,
  //           cDate: createDateString,
  //           eDate: expireDateString,
  //         })
  //       })
  //       // console.log(response.id);
  //       navigation.navigate('Message', {
  //         type: 'Success',
  //         messageTitle: 'Coupon Created Successfully!',
  //         messageText: 'An administrator will be in touch with you shortly!',
  //         goto: 'Farmer Dashboard',
  //         goButtonText: 'Dashboard',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 1);

  const expMinimumDate = createDate;
  expMinimumDate.setDate(expMinimumDate.getDate() + 1);

  const couponCodeSchema = Yup.object().shape({
    presentage: Yup.number()
      .min(1, "Coupon presentage must be at least 1%")
      .max(100, "Coupon presentage must be at most 100%")
      .required("Coupon presentage is required"),
    code: Yup.string()
      .matches(couponRegex, "Coupon code must start with 'CP' and end with 4 digits")
      .required("Coupon code is required"),
  });

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>Create a Coupon</H4>
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
          <P>Coupons are a promotional tactic used to encourage customers to buy. Coupons can be used to promote your items and enhance sales. </P>
          <P></P>
          <P>To create a coupon, you can follow these steps:</P>
          <P></P>
          <P>-- Determine the percentage of the coupon: Decide on the amount or percentage discount that the coupon will offer.</P>
          <P>-- Choose a coupon code: Create a unique code that the farmer can share with their customers to redeem the coupon.</P>
          <P>-- Set the expiration date: Determine how long the coupon will be valid. </P>
          <P></P>
          <Formik 
            initialValues={{ presentage: '', code: '' }}
            validationSchema={couponCodeSchema}
            onSubmit={
              async () => {
                try {
                  const response = await fetch(ENV.backend + '/farmer/verify-coupon-code/', {
                    method: 'POST',
                    headers: {
                      useremail: route.params.userEmail,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      cCode: code,
                    })
                  })
                  const result = await response.json();
                  if (result.isExist) {
                    alert(`Coupon code ${code} already exists`);
                  } else {
                    const response = await fetch(ENV.backend + "/farmer/create-coupon/", {
                      method: 'POST',
                      headers: {
                        useremail: route.params.userEmail,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        presentage: presentage,
                        cCode: code,
                        cDate: createDateString,
                        eDate: expireDateString,
                      })
                    })
                    // console.log(response.id);
                    navigation.navigate('Message', {
                      type: 'Success',
                      messageTitle: 'Coupon Created Successfully!',
                      messageText: 'An administrator will be in touch with you shortly!',
                      goto: 'Farmer Dashboard',
                      goButtonText: 'Dashboard',
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }
          >
            {({ values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid}) => (
            <View>
              <TextInputBox
                inputlabel='Precentage'
                placeholder=''
                value={values.presentage}
                keyBoardType='numeric'
                onChangeText={handleChange('presentage')}
                onFocus={() => {
                  console.log('');
                }}
                onBlur={() => {
                  setFieldTouched('presentage');
                }}
              />
              {errors.presentage && touched.presentage && (
                <H7 style={{color: 'red' }}>{errors.presentage}</H7>
              )}
              <TextInputBox
                inputlabel='Coupon Code'
                placeholder=''
                value={values.code}
                onChangeText={handleChange('code')}
                onFocus={() => setShowInstructions(true)}
                onBlur={() => {
                  setShowInstructions(false)
                  setFieldTouched('code');
                }}
              />
              {errors.code && touched.code && (
                <H7 style={{color: 'red' }}>{errors.code}</H7>
              )}
              {showInstructions && suggestions.length > 0 && (
                <View style={styles.instructionContainer}>
                  <H6>Code format -- "CP" and 4 digit code.</H6>
                  <H6>Suggestions:</H6>
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity key={index} onPress={() => setCode(suggestion)}><H6>{suggestion}</H6></TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={styles.datePickerContainer}>
                <Text style={styles.inputlabel}>Select Create Date</Text>
                <View style={styles.datePickerBox}>
                  <H6>{createDateString}</H6>
                  <TouchableOpacity onPress={() => setShowCreateDatePicker(true)}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                </View>
                {showCreateDatePicker && (
                  <DateTimePicker
                    value={createDate}
                    mode="date"
                    display="datepicker"
                    minimumDate={minimumDate}
                    onChange={handleCreateDateChange}
                  />
                )}

              </View>
              <View style={styles.datePickerContainer}>
                <Text style={styles.inputlabel}>Select Expire Date</Text>
                <View style={styles.datePickerBox}>
                  <H6>{expireDateString}</H6>
                  <TouchableOpacity onPress={() => setShowExpireDatePicker(true)}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                </View>
                {showExpireDatePicker && (
                  <DateTimePicker
                    value={expireDate}
                    mode="date"
                    display="datepicker"
                    // minimumDate={expMinimumDate}
                    onChange={handleExpireDateChange}
                  />
                )}
              </View>
              <View style={styles.bottomContainer}>
                <Button title='Create Coupon' size='normal' color='shadedSecondary' onPress={handleSubmit} disabled={!isValid}/>
              </View>
            </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: "100%",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center'
  },
  datePickerContainer: {
    marginTop: 10,
  },
  datePickerBox: {
    width: '100%',
    height: 45,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // borderRadius: '10',
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    fontSize: 15,
  },
  instructionContainer: {
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // height: 40,
    padding: 5,
    paddingLeft: 10,
  },

})