import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../../constants/theme';
import { Button } from '../../components/Buttons';
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from '../../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, P, H3 } from '../../components/Texts';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LocationCard from '../../components/LocationCard';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [location, setLocation] = useState([]);

  const getData = React.useCallback(() => {
    return fetch(ENV.backend + '/customer/locations/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == 'Success') {
          setLocation(res.location);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  async function selectLocation(data) {
    try {
      const result = await fetch(ENV.backend + '/customer/select-location', {
        method: 'POST',
        headers: {
          Authorization: route.params.auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteLocation(index) {
    try {
      const result = await fetch(
        ENV.backend + '/customer/delete-location/' + index,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await result.json();
      console.log(res.message);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
      <Header back={true} />
      <RefreshView
        style={{
          marginHorizontal: 10,
          backgroundColor: 'red',
          flex: 1,
        }}
        getData={getData}
      >
        <View style={styles.screen}>
          <H3>Locations</H3>
          {location?.map((item, index) => {
            return (
              <LocationCard
                key={index}
                locationName={item?.name}
                longitude={item?.longitude}
                selected={item?.isSelected}
                latitude={item?.latitude}
                onDelete={() => deleteLocation(index)}
                selectLocation={() => selectLocation(item)}
              />
            );
          })}
          {location?.length == 0 && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Image
                style={{
                  width: 250,
                  height: 250,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={require('../../assets/location.png')}
              />
              <H4 style={{ textAlign: 'center' }}>
                Save a location to go shopping!
              </H4>
            </View>
          )}

          <View style={{ marginVertical: 50 }}>
            <Button
              title='Add Location'
              color='shadedPrimary'
              size='big'
              onPress={() => navigation.navigate('Add Location Screen')}
            />
          </View>
        </View>
      </RefreshView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
});
