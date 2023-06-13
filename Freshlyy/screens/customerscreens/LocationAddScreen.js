import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from '../../components/Buttons';
import { TextInputBox } from '../../components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H4, P, H6 } from '../../components/Texts';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Loading from '../../components/Loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ENV from '../../constants/env';

export default function ({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const validationSchema = Yup.object().shape({
    LocationName: Yup.string()
      .min(2, 'Location name is too short!')
      .required('Location name is required!'),
  });

  const formik = useFormik({
    initialValues: {
      LocationName: '',
    },
    validationSchema: validationSchema,
  });

  async function submitSelectedLocation() {
    try {
      formik.validateForm();
      Object.keys(formik.values).forEach((value) => {
        formik.setFieldTouched(value);
      });
      if (!Object.keys(formik.touched).length) return;
      for (let error in formik.errors) if (error) return;
      const data = formik.values;
      console.log(data);
      console.log(selectedLocation);
      data.longitude = selectedLocation.longitude;
      data.latitude = selectedLocation.latitude;

      const result = await fetch(ENV.backend + '/customer/sendLocation', {
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
        navigation.navigate('Location Screen');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = <Loading />;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header back={true} />
          <View style={styles.screen}>
            <H4>Select your Address</H4>
            <View style={styles.inputcont}>
              <TextInputBox
                inputlabel='Name'
                placeholder='Enter First name'
                name='LocationName'
                onChangeText={formik.handleChange('LocationName')}
                onBlur={() =>
                  formik.setFieldTouched('LocationName', true, true)
                }
                value={formik.values.LocationName}
                error={formik.errors.LocationName}
                touched={formik.touched.LocationName}
              />
            </View>
            <View style={styles.map}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 7.8731,
                  longitude: 80.7718,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                }}
                onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
              >
                {selectedLocation && (
                  <Marker coordinate={selectedLocation}></Marker>
                )}
              </MapView>
            </View>
            <View>
              <Button
                title='Save Location'
                color='shadedPrimary'
                size='normal'
                onPress={submitSelectedLocation}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    padding: 10,
  },
  map: {
    margin: 10,
    marginTop: 0,
    //border: 10,
    width: 320,
    height: 520,
  },
  callout: {
    width: 200,
    height: 200,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    padding: 4,
  },
  inputcont: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
