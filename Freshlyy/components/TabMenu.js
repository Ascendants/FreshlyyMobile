import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button } from './Buttons';
import Theme from '../constants/theme';

function MenuContainer(props){
  if(props.center){
    return <View style={styles.centeredMenu}>{props.children}</View>;
  }
  return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>{props.children}</ScrollView>

}

export default function (props) {
  let buttonSize = props.buttonSize || 'normal';
//   ,{    alignItems: props.center? 'center':'flex-start',
// }
  return (
    <View style={styles.container}>
      <MenuContainer center={props.center}>
        {props.tabs &&
          props.tabs.map((tab) => (
            <Button
              key={tab}
              size={buttonSize}
              title={tab}
              onPress={() => props.onPress(tab)}
              color={props.active == tab ? 'shadedPrimary' : 'shadedTertiary'}
            />
          ))}
      </MenuContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent:"flex-start",
    marginVertical: 10,
  
  },
  centeredMenu:{
    alignContent:'center',
    justifyContent:'center',
    justifyItems:'center',
    flexDirection:'row',

  },
  dotsContainer: {
    backgroundColor: Theme.overlayShade,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 4,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  dot: {
    paddingHorizontal: 3,
    margin: 0,
  },
});
