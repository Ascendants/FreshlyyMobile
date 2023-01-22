import { contains } from '@firebase/util';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2,H3,H5,H7,H6,Pr} from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProductHomePageScreen from '../screens/ProductHomePageScreen';
import { AntDesign } from '@expo/vector-icons';

export default function (props) {
  return (
      <TouchableOpacity>
      <View style={[styles.card,props.cardType=='social'?{height:250}:{height:230}]} >
        <View style={styles.imgcont}>
        <Image
          source={require('../assets/carrot.jpg')}
          style={styles.cardimage}
        />
        </View>
       
        <View style={styles.desccont}>
        <H7 style={styles.prodname}>Sri Lankan Carrots</H7>
        <Pr>1250/KG</Pr>
        <H6>By Haritha</H6>
        {props.cardType=='social' &&
        <View style={styles.likecont}>
        <H6>{props.likeCount} Likes</H6>
        {props.like?<AntDesign name="like1" size={29} color={Theme.primary} onPress={props.handlePress}/> :<AntDesign name="like2" size={29} color="black" onPress={props.handlePress} />}
        </View>
        }
       
        </View>
      </View>
      </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    fontFamily: 'Poppins',
  },
  card: {
    width: 150,
    backgroundColor: Theme.overlay,
    borderRadius: 20,
    boxShadow: '100px 100px 17px -12px rgba(0,3,0,0.75)',
    marginVertical:15
  },
  imgcont:{
    paddingTop:10,    
    justifyContent:'center',
    alignItems:'center'
  },
  cardimage: {
    width: 125,
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  prodname:{
    fontWeight:'bold'
  },
  desccont:{
    position:'relative',
    width:155,

    paddingHorizontal:10,
    marginTop:10
  },
  likecont:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    paddingHorizontal:2
  }

});