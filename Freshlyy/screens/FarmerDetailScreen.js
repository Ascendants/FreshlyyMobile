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
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H4, P, H3 } from '../components/Texts';
import Rating from '../components/Rating';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <View>
            <Image source={require('../assets/kom.jpg')} style={styles.image} />
          </View>
          <View style={styles.textName}>
            <P style={styles.name}>Komuthu Fernando</P>
          </View>
          <Rating value={4} />
          <H4>101 Reviews</H4>
          <View style={styles.actionButtonContainer}>
            <Button
              icon={
                <Feather
                  name='message-circle'
                  size={24}
                  color={Theme.textColor}
                />
              }
              title='Chat'
              type='icon'
              size='normal'
              color='shadedTertiary'
            />
            <Button
              type='icon'
              icon={
                <Ionicons
                  name='ios-share-outline'
                  size={24}
                  color={Theme.textColor}
                />
              }
              title='Share'
              size='normal'
              color='shadedTertiary'
            />
            <Button
              type='icon'
              icon={
                <Ionicons
                  name='alert-circle-outline'
                  size={24}
                  color={Theme.textColor}
                />
              }
              title='Report'
              size='normal'
              color='shadedTertiary'
            />
          </View>
          <Button title='Follow' color='primaryShadeLighter' size='big' />
          <H3>Popular Products</H3>
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  name: {
    color: Theme.primary,
    justifyContent: 'center',
  },
  Rating: {
    justifyContent: 'center',
  },
  H4: {
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
});
