import { contains } from '@firebase/util';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2 ,P, Pr} from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Button } from '../components/Buttons';
import Rating from '../components/Rating';

export default function (props) {
    const product = props.product;
    return (
        <View style={styles.screen}>
        <View style={styles.card}>
            <Image
            source={require('../assets/carrot.jpg')}
            style={styles.productimage}
            />
            <View style={styles.cardinner}>
                <P style={styles.productname}>Carrot</P>
                <P style={styles.productWeight}>20 KG</P>
                <Pr style={styles.productprice}> 1000</Pr>
                
            </View>
            <View  style={styles.cardinner2}>
            <Button title='View' color='shadedSecondary' size='small' style={styles.writebutton} />
            <Rating  style={styles.rating} value={4}/>
            </View>
        </View>
        <View style = {styles.lineStyle}></View>
        </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    fontFamily: 'Poppins',
  },
  card: {
    display:'flex',
    padding:8,
    flexDirection:'row',
    alignItems:'center',
    //paddingLeft:20,
    //backgroundColor:Theme.overlay,
    width:'90%',
    height:80,
    borderRadius:20,
    marginVertical:10,
    justifyContent:'space-between',
  },
  productimage: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    margin: 15,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  cardinner:{
    display:'flex',
    flexDirection:'column',
    flex:3,
  },
  productname: {
    position: 'relative',
    textAlign: 'left',
    fontSize:15,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  productWeight: {
    position: 'relative',
    textAlign: 'left',
    fontSize:12,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  productprice: {
    position: 'relative',
    textAlign: 'center',
    fontSize:12,
    fontWeight: 'bold',
    color: Theme.textColor,
  },
  cardinner2:{
    display:'flex',
    flexDirection:'column',
    flex:2,
  },
  rating:{
    
  },
  writebutton:{
    border:20,
    width:"50%"
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    
}
});
