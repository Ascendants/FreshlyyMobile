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

export default function (props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.tabs &&
          props.tabs.map((tab) => (
            <Button
              key={tab}
              size='normal'
              title={tab}
              onPress={() => props.onPress(tab)}
              color={props.active == tab ? 'shadedPrimary' : 'shadedTertiary'}
            />
          ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 10,
    flexDirection: 'row',
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
