import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, } from 'react-native';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H6 } from '../components/Texts';
import { TextInputBox,} from '../components/Inputs';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


export default function ({ navigation }) {
  const [createDate, setCreateDate] = useState(new Date());
  const [expireDate, setExpireDate] = useState(new Date());
  const [showCreateDatePicker, setShowCreateDatePicker] = useState(false);
  const [showExpireDatePicker, setShowExpireDatePicker] = useState(false);
  const [createDateString, setCreateDateString] = useState('--');
  const [expireDateString, setExpireDateString] = useState('--');

  const [presentage, setPresentage] = useState('');
  const [code, setCode] = useState('');


  const handleCreateDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || createDate;
    setCreateDate(currentDate);
    setCreateDateString(format(currentDate, 'yyyy-MM-dd'));
    setShowCreateDatePicker(false);
    // console.log(createDate);
  };

  const handleExpireDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expireDate;
    setExpireDate(currentDate);
    setExpireDateString(format(currentDate, 'yyyy-MM-dd'));
    setShowExpireDatePicker(false);
    // console.log(date);
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>Create a Coupon</H4>
        <ScrollView style={styles.container}>
          <P>Coupons are a promotional tactic used to encourage customers to buy. Coupons can be used to promote your items and enhance sales. </P>
          <P></P>
          <P>To create a coupon, you can follow these steps:</P>
          <P></P>
          <P>-- Determine the percentage of the coupon: Decide on the amount or percentage discount that the coupon will offer.</P>
          <P>-- Choose a coupon code: Create a unique code that the farmer can share with their customers to redeem the coupon.</P>
          <P>-- Set the expiration date: Determine how long the coupon will be valid. </P>
          <P></P>
          <TextInputBox
            inputlabel='Precentage'
            placeholder=''
            value={presentage}
            onChange={setPresentage}
            onBlur = {() => {
              console.log('');
            }}
          />
          <TextInputBox
            inputlabel='Coupon Code'
            placeholder=''
            value={code}
            onChange={setCode}
            onBlur = {() => {
              console.log('');
            }}
          />
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
                display="spinner"
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
                display="spinner"
                onChange={handleExpireDateChange}
              />
            )}
          </View>
          <View style={styles.bottomContainer}>
            <Button title='Create Coupon' size='normal' color='shadedSecondary' />
          </View>
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
  }

})