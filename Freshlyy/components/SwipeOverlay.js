import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { H4 } from '../components/Texts';
import Theme from '../constants/theme';
import SwipeOverlayCard from './SwipeOverlayCard';
import { AntDesign } from '@expo/vector-icons';

export default function () {
  return (
    <View style={styles.container}>
      <H4 style={styles.topic}>Selling Products</H4>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SwipeOverlayCard
          imgUrl={require('../assets/carrot.jpg')}
          topic='Sri Lankan Carrots'
          subTopic='10 KG'
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    alignSelf: 'center',
  },
  top: {
    alignSelf: 'center',
    margin: 10,
    marginTop: 20,
  },
  topic: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
