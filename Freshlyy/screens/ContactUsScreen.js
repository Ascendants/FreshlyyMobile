import React, {useState} from "react";
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4,} from '../components/Texts';
import { TextInputBox, } from '../components/Inputs';
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from '../components/Buttons';
import ModalComponent from "../components/ModalComponent";
import ENV from "../constants/env";

export default function ({navigation, route}){

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [desc, setDesc] = useState('');
  const [issue, setIssue] = useState('');

  const [selected, setSelected] = useState('');
  
  const orderId = route.params.orderId;

  const data = [
    {key:'1', value:'Technical issues'},
    {key:'2', value:'Account and profile management'},
    {key:'3', value:'Shipping and delivery'},
    {key:'4', value:'Payment and billing inquiries'},
    {key:'5', value:'Issue with an order'},
    {key:'6', value:'Feedback and suggestions'},
    {key:'7', value:'Other'},
  ]

  const handleSubmit = async() => {
    try {
      const response = await fetch(ENV.backend + "/farmer/support-ticket/", {
        method: 'POST',
        headers: {
          useremail:route.params.userEmail,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          number: number,
          issue: selected,
          desc: desc,
          orderId: orderId,
        })
      })
      setName('');
      setNumber('');
      setSelected('');
      setDesc('');
      const data = await response.json();
      const id = data.id;
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Ticket Sent Successfully!',
        subjectId: id,
        messageText: ' is your ticket number. An administrator will be in touch with you shortly!',
        goto: 'Farmer Dashboard',
        goButtonText: 'Dashboard',
      });
      // console.log(data.id);
    }catch (error) {
      console.log(error);
    }
  }



  return(
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true}/>
        <H4 style={{textAlign: 'center', color: Theme.primary}}>Contact Us</H4>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <P>Welcome to Freshlyy help center! We are excited to hear from you and would be happy to answer any questions you may have.</P>
          <P></P>
          <P>If you have any inquiries, feedback or suggestions about our platform, please feel free to contact us using the provided form. We are always looking to improve our services and provide the best possible experience to our customers.</P>
          <P>We take pride in our quick response times and will do our best to get back to you as soon as possible. Your satisfaction is our top priority, and we strive to ensure that every interaction with our platform is a positive one.</P>
          <View style={styles.formContainer}>
            <TextInputBox 
              inputlabel='Name'
              placeholder=''
              value={name}
              onChangeText={(text) => setName(text)}
              onBlur = {() => {
                console.log('');
              }}
              onFocus = {() => {
                console.log('');
              }}
            />
            <TextInputBox 
              inputlabel='Contact Number'
              placeholder=''
              value={number}
              onChangeText={(text) => setNumber(text)}
              keyboardType="numeric"
              onBlur = {() => {
                console.log('');
              }}
              onFocus = {() => {
                console.log('');
              }}
            />
            <Text style={{fontSize:15,color: Theme.textColor,fontFamily: 'Poppins',}}>Select a Subject</Text>
            <SelectList 
              setSelected={(val) => setSelected(val)} 
              data={data} 
              save="value"
              placeholder="--"
              fontFamily= 'Poppins'
              inputStyles={{color: Theme.textColor}}
              boxStyles={{borderColor:'white', backgroundColor:'white'}}
              dropdownTextStyles={{color: Theme.textColor,}}
              dropdownStyles={{borderColor:'white',backgroundColor:'white'}}
              value={issue}
            />
            <TextInputBox 
              inputlabel='Description'
              placeholder=''
              value={desc}
              onChangeText={(text) => setDesc(text)}
              onBlur = {() => {
                console.log('');
              }}
              onFocus = {() => {
                console.log('');
              }}
            />
            <View style={styles.bottomContainer}>
              <Button title='Submit' size='normal' color='shadedSecondary' onPress={handleSubmit}/>
            </View>
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
  formContainer: {
    marginTop: 10,
  },
  bottomContainer: {
    marginTop: 10,
    width: '40%',
    alignSelf: 'center'
  },
})