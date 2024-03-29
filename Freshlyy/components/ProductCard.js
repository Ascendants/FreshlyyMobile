import { contains } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2, H3, H4, H5, H7, H6, Pr, P } from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Rating from '../components/Rating';
import ENV from '../constants/env';
import LinearGradient from 'react-native-linear-gradient';

export default function (props, onLikePress) {
  const [isLiked, setIsLiked] = useState(props.likes.includes(props.userEmail));
  const [likecount, setLikeCount] = useState(props.likes.length); //props.likes.length
  const [liked, setLiked] = useState(true);

  // console.log(userID+" "+productID)
  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    const method = newIsLiked ? 'add' : 'remove';
    props.onLike(props.id, newIsLiked, method);
    if (method === 'add') {
      setLikeCount(likecount + 1);
    } else {
      setLikeCount(likecount - 1);
    }

    // fetch(`http://example.com/products/${product.id}/likes/${userEmail}`, { method });
  };

  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress(props.publicUrl)}
    >
      <View styles={styles.cardBigCont}>
        <View style={[styles.card]}>
          {props.bestMatch && props.cheaper ? (
            <View style={styles.cheaperCont}>
              <H4 style={styles.cheaperText}>
                <AntDesign name='star' size={20} color={Theme.yellow} />
                Cheaper
              </H4>
            </View>
          ) : null}
          <View style={styles.imgcont}>
            <Image
              source={{ uri: props.imageUrl?.imageUrl }}
              style={[
                styles.cardimage,
                { backgroundColor: props.imageUrl?.placeholder },
              ]}
            />
          </View>

          <View style={styles.desccont}>
            <H6 style={styles.prodname} numberOfLines={1}>
              {props.title}
            </H6>
            <View style={styles.reviewCont}>
              <Rating value={props.overallRating} />
              <P>({props.overallRating})</P>
            </View>

            <Pr>
              {props.price}/{props.unit}
            </Pr>
            {props.farmerName ? <H6>{props.farmerName}</H6> : null}
            {props.distanceAway != null ? (
              <H6>{props.distanceAway} Away</H6>
            ) : null}
            {props.cardType == 'social' && (
              <View style={styles.likecont}>
                <H6>{likecount} Likes</H6>
                {isLiked ? (
                  <AntDesign
                    name='like1'
                    size={29}
                    color={Theme.primary}
                    onPress={handleLike}
                    style={styles.likeIco}
                  />
                ) : (
                  <AntDesign
                    name='like2'
                    size={29}
                    color='black'
                    onPress={handleLike}
                    style={styles.likeIco}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardBigCont: {
    backgroundColor: 'red',
    padding: 10,
  },
  card: {
    width: 166,
    backgroundColor: Theme.overlay,
    borderRadius: 20,
    boxShadow: '100px 100px 17px -12px rgba(0,3,0,0.75)',
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 0,
    flex: 1,
  },
  cheaperCont: {
    position: 'absolute',
    backgroundColor: '#FFB400',
    borderRadius: 3.5,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    height: 25,
    width: 95,
  },
  cheaperText: {
    fontSize: 15,
  },
  imgcont: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardimage: {
    width: 145,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  prodname: {},
  reviewCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  desccont: {
    position: 'relative',
    width: 180,

    paddingHorizontal: 10,
    marginTop: 10,
  },
  likecont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  likecont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  likeIco: {
    position: 'absolute',
    left: 110,
    top: -6,
  },
});
