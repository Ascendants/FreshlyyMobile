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
import Theme from '../../constants/theme';
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
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setSelectedLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          name: 'Home',
        });
        console.log(location);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);
  console.log(location);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header back={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.screen}>
          {location ? (
            <>
              <H4>Select your Address</H4>
              <View style={styles.inputcont}>
                <TextInputBox
                  inputlabel='Name'
                  placeholder='Give a nickname'
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
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'blue',
                  width: 350,
                  borderWidth: 2,
                  borderColor: Theme.primary,
                  borderRadius: 10,
                }}
              >
                <MapView
                  style={styles.map}
                  // customMapStyle={styles.map}
                  initialRegion={{
                    latitude: parseFloat(location.coords.latitude) || 0,
                    longitude: parseFloat(location.coords.longitude) || 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
                >
                  {selectedLocation && (
                    <Marker coordinate={selectedLocation}></Marker>
                  )}
                </MapView>
              </View>
              <View style={{ marginVertical: 20 }}>
                <Button
                  title='Save Location'
                  color='shadedPrimary'
                  size='big'
                  onPress={submitSelectedLocation}
                />
              </View>
            </>
          ) : (
            <Loading />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    //border: 10,
    alignSelf: 'center',
    flex: 1,
    height: 346,
    width: 346,
    borderRadius: 10,
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
