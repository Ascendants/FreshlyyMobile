import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../constants/theme';
import { H1, H2,H3,H4, H7, H6,P } from "../components/Texts";

module.exports.Rate5 = function (props) {
    var newStar=[];
    function rating() {
        for (let i = 0; i <props.value; i++) {
          newStar.push('star');
        }
    }
    rating();
return(
    <View style={styles.starContainer} >
    {newStar.map((rating, index) => {
      return (
        <AntDesign key={index} name={rating} size={18} color={Theme.yellow} />
      

      );
    })}
  </View>
    )
  };
  const styles = StyleSheet.create({
    starContainer: {
      marginRight: 10,
      flexDirection: 'row',
      paddingHorizontal:2
    },
  });
  