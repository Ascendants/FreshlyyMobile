import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Theme from "../../constants/theme";
import { Button } from "../../components/Buttons";
import {
  TextInputBox,
  DropDownPicker,
  DatePicker,
} from "../../components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { H4, P, H3 } from "../../components/Texts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LocationCard from "../../components/LocationCard";
import ENV from "../../constants/env";

export default function ({ navigation, route }) {
  const [location, setLocation] = useState([]);
  const [address, setAddress] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + "/customer/selected-location/", {
      method: "GET",
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == "Success") {
          setLocation(res.location);
        }
        isRefreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <Header back={true} />
      <ScrollView>
        <View style={styles.screen}>
          <H3>Locations</H3>
          {location?.map((item) => {
            return (
              <LocationCard
                locationName={item?.locationName}
                address={address?.address}
                longitude={item?.longitude}
                latitude={item?.latitude}
                onEdit={() => editLocation(item?.userId)}
                onDelete={() => deleteLocation(item?.userId)}
              />
            );
          })}
          <Button title="Add Location" color="shadedPrimary" size="normal" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    fontFamily: "Poppins",
  },
});
