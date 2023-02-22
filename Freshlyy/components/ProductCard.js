import { contains } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2,H3,H5,H7,H6,Pr,P} from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Rating from '../components/Rating';
import ENV from '../constants/env';

export default function (props,onLikePress) {
  const [like,setLike]=useState(false)
  const [likecount,setLikeCount]=useState(props.likes.length)
  const [liked, setLiked] = useState(false);


  // console.log(userID+" "+productID)
 

  const handleLikePress = async () => {
    console.log("helloo")
    // Update state to indicate that the product has been liked
    setLiked(true);
    // Call the onLikePress function passed in as a prop
    props.onLikePress(props.prodId);
  };

  return (
      <TouchableOpacity>
      <View style={[styles.card,props.cardType=='social'?{height:280}:{height:255}]} >
        <View style={styles.imgcont}>
        <Image
          source={{ uri: props.imageUrl }}
          style={styles.cardimage}
        />
        </View>
       
        <View style={styles.desccont}>
        <H7 style={styles.prodname}>{props.title}</H7>
        <View style={styles.reviewCont}> 
          <Rating value={props.overallRating} />
          <P>({props.overallRating})</P>
        </View>
      
        <Pr>{props.price}/{props.unit}</Pr>
        <H6>By Haritha</H6>
        {props.cardType=='social' &&
        <View style={styles.likecont}>
        <H6>{likecount} Likes</H6> 
        {liked?<AntDesign name="like1" size={29} color={Theme.primary} onPress={handleLikePress} style={styles.likeIco} /> :<AntDesign name="like2" size={29} color="black" onPress={handleLikePress} style={styles.likeIco} />}
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
    width: 160,
    backgroundColor: Theme.overlay,
    borderRadius: 20,
    boxShadow: '100px 100px 17px -12px rgba(0,3,0,0.75)',
    marginVertical:15,
    marginHorizontal:10
  },
  imgcont:{
    paddingTop:10,    
    justifyContent:'center',
    alignItems:'center'
  },
  cardimage: {
    width: 135,
    height: 120,
    borderRadius: 10,
    resizeMode:'contain',
  },
  prodname:{
    fontWeight:'bold'
  },
  reviewCont:{
     display:'flex',
     flexDirection:'row'
  },
  desccont:{
    position:'relative',
    width:180,

    paddingHorizontal:10,
    marginTop:10
  },
  likecont:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  
  },
  likeIco:{
    position:"absolute",
    left:110,
    top:-6
  }

});