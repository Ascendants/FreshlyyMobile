

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
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H1, H4,H2,H6, Pr } from '../components/Texts';

export default function () {
    const [isChecked, SetIsChecked] = useState (false);
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
        <H1 style={styles.AddText}>Selling Products</H1>
          <Image
            source={require('../assets/carrot.jpg')}
            style={styles.vectorimage}
          />
          {/* <DatePicker/> */}
          <H6 style={styles.PText}>Sri Lankan Carrots</H6>
          <View style={styles.ProContainer}>
          <View style={styles.DeBox}>
           
            <H4 style={styles.DText}>10KG</H4>

            <H4 style={styles.DText}>Total: <Pr fontSize={20} >100.00</Pr></H4>

            <H4 style={styles.DText}>To Haritha</H4>
            <View style={styles.statusCont}>
              <H4 style={styles.DText}>Current Status: </H4>
              <Button title='Processing' color='shadedTertiary' size='small' />
            </View>
            </View>
            </View>
          
          {/* <View style={styles.Check}>
          < CheckBox isChecked= {isChecked} onClick={() => SetIsChecked(!isChecked)}  /> <H1> Processing</H1>
          < CheckBox isChecked= {isChecked} onClick={() => SetIsChecked(!isChecked)} leftText="Processing" />
          < CheckBox isChecked= {isChecked} onClick={() => SetIsChecked(!isChecked)} leftText="Processing" />
         
          </View> */}
      
          <View style={styles.buttcont}>
            <Button title='Process Finished' color='filledPrimary' size='normal' />
            
          </View>
           
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
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  AddText: {
    // color: Theme.primary,
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 2,
  },
  PText:{
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
    

  },
  DText:{
    paddingBottom:2,
    // fontWeight:'bold',
    
  }, 
  statusCont:{
    flexDirection:'row',
    alignItems:'baseline'
  },
  ProContainer: {
    padding: 10,
    backgroundColor: Theme.overlayShade,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
  },
  DeBox:{
    color:Theme.overlayShade,
    display:'flex',
    justifyContent: 'flex-start',
    width:'100%',
    marginLeft: 8,
    marginRight: 5,

  },
 CheckleftText:{
    color: Theme.overlayShade,
 },
 inputcont: {
  position: 'relative',
  width: '100%',
},

buttcont: {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingTop: 20,
  width: '80%',
  color:'Teritary'
},
});

