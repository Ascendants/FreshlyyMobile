import { React, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
import { H4, P, H6 } from '../../components/Texts';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LocationCard } from '../../components/LocationCard';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Loading from '../../components/Loading';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

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

  const getAddress = async (latitude, longitude) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'AIzaSyCorJgnsZs2Y8q_c4eMqUtUV_0icAmHWhw'}`
    );
    const data = await response.json();
    return data.results[0].formatted_address;
  };

  const handleLocationSelect = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation(event.nativeEvent.coordinate);
    const address = await getAddress(latitude, longitude);
    setSelectedLocation((prevState) => {
      return {
        ...prevState,
        address: address,
      };
    });
  };

  const handleLocationNameChange = (name) => {
    setLocationName(name);
    setSelectedLocation((prevState) => {
      return {
        ...prevState,
        name: name,
      };
    });
  };

  let text = <Loading/>;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
  
    

    return (
      <SafeAreaView>
        <ScrollView>
          <Header back={true} />
          <View style={styles.screen}>
            <H4>Select your Address</H4>
            <TextInputBox style={styles.textBox}></TextInputBox>
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
                <Marker coordinate={selectedLocation}>
                  
                </Marker>
              )}
            </MapView>
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
  textBox:{
    padding: 10,
  },
  map: {
    margin: 10,
    border: 10,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
});
