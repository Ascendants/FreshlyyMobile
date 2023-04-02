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
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { H4, P, H3 } from '../components/Texts';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LocationCard from '../components/LocationCard';

export default function () {
  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Locations</H3>
          <LocationCard />
          <Button title='Add Location' color='shadedPrimary' size='normal' />
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
});
