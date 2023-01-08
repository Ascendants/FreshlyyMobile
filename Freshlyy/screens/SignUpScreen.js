import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker,DatePicker } from '../components/Inputs';
import {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Formik, validateYupSchema} from 'formik'
import * as Yup from 'yup'


const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function () {
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.screen}>
      <Header back={true}/>
      <Image
        source={require('../assets/signupvector.png')}
        style={styles.vectorimage}
      />
      {/* <DatePicker/> */}
      <Formik
       initialValues={{
         name: '',
         email: '',
       }}
       validationSchema={SignupSchema}>

        {({values, errors, touched,handleChange,handleSubmit,isValid,setFieldTouched })=>(
      <View style={styles.inputcont}>
         <TextInputBox inputlabel="First Name" placeholder="Enter first name" value={values.name} onChange={handleChange('name')}/>
         {errors.name && (<Text style={styles.errormsg}>hellooosad</Text>)}
      </View>
     
      
      // <TextInputBox inputlabel="Last Name" placeholder="Enter last name "  />
      // <TextInputBox inputlabel="Email" placeholder="Enter email" type="email-address" />
     


      // <DropDownPicker
      //   inputlabel='Gender'
      //   list={[
      //     { label: 'Male', value: 'm'},
      //     { label: 'Female', value: 'f' },
      //     { label: 'Other', value: 'o' },
      //   ]}
      // />
      //  <TextInputBox inputlabel="NIC Number" placeholder="Enter NIC" />
      //  <TextInputBox inputlabel="Street No" placeholder="Enter street no" />
      //  <TextInputBox inputlabel="Address line 1" placeholder="Enter address 1" />
      //  <TextInputBox inputlabel="Address line 2" placeholder="Enter address 2" />
      // <TouchableOpacity>
      //   <Button title="Next" color="filledSecondary" size="normal"/>
      // </TouchableOpacity>
      )}
      </Formik>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginTop: 30,
  },
  inputcont: {
    position: 'relative',
    width: '90%',
    marginVertical:30,
    justifyContent:'center',
    alignItems:'center'
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
  errormsg:{
    color:'red'
  }
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
