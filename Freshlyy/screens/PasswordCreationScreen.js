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
import { TextInputBox, DropDownPicker,CheckBox } from '../components/Inputs';
import Header from '../components/Header';

import { H1, H2,H4} from '../components/Texts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function (){
    return(
       <SafeAreaView>
        
        <View style={styles.screen}> 
          <Header back={true}/>
          <Image source={require('../assets/passwordvec.png')} style={styles.loginpic}/>
          <View style={styles.inputcont}>
          <TextInputBox inputlabel="Password" type="new-password" />
          <TextInputBox inputlabel="Confirm Password" type="new-password" />
          </View>
          <View>
          
          </View>
          <Button title="Next" color="filledSecondary" size="normal"/>
          
          {/* <CheckBox /> */}
        </View>
       
        </SafeAreaView>
        
    )
}
const styles=StyleSheet.create({
    screen: {
        height:'100%',
        alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: 'Poppins',
      },
      logo:{
        height:50,
        resizeMode:'contain',
        marginTop:50
      },
      loginpic:{
        width: 300,
        height: 200,
        marginTop:50,
        marginBottom:0

      },
      logintext:{
        margin:0,
        color:Theme.primary
      },
      inputcont:{
         width:'80%',
         justifyContent:'center',
         alignItems:'center',
         marginBottom:30
         
      },
    

});