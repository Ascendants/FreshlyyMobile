import { contains } from '@firebase/util';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { H1, H2 } from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

export default function () {
  return <View style={styles.screen}></View>;
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
});
{
  /* <TouchableOpacity>
<ProductCard />
</TouchableOpacity>
<TouchableOpacity>
<ProductCard />
</TouchableOpacity> */
}
