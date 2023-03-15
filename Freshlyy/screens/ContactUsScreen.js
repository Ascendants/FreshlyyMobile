import React, {useState} from "react";
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4,} from '../components/Texts';
import ENV from "../constants/env";
import { TextInputBox, } from '../components/Inputs';
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from '../components/Buttons';
import ModalComponent from "../components/ModalComponent";

export default function ({navigation}){

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');

  const [selected, setSelected] = React.useState("");

  const data = [
    {key:'1', value:'Technical issues'},
    {key:'2', value:'Account and profile management'},
    {key:'3', value:'Shipping and delivery'},
    {key:'4', value:'Payment and billing inquiries'},
    {key:'5', value:'Feedback and suggestions'},
    {key:'5', value:'Other'},
]

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
              onChangeText={setName}
              onBlur = {() => {
                console.log('');
              }}
            />
            <TextInputBox 
              inputlabel='Contact Number'
              placeholder=''
              value={phone}
              onChangeText={setPhone}
              onBlur = {() => {
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
            />
            <TextInputBox 
              inputlabel='Description'
              placeholder=''
              value={desc}
              onChangeText={setDesc}
              onBlur = {() => {
                console.log('');
              }}
            />
            <View style={styles.bottomContainer}>
            <Button title='Submit' size='normal' color='shadedSecondary' />
          </View>
          {/* <ModalComponent /> */}
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