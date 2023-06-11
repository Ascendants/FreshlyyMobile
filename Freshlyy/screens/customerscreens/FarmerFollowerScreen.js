import React,{useEffect, useState } from 'react';
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
import { H4, P } from '../../components/Texts';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FarmerFollowCard from '../../components/FarmerFollowCard';
import ENV from '../../constants/env';

export default function (navigation,route) {
  const [farmers, setFarmer]  = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  
  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/followDetail/63b6b5d2ce65a7b5a2671383', {
      method: 'GET',
      headers: {
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.message=="Success"){
          setFarmer(res.farmers);
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
          <View style={styles.searchCont}>
            <AntDesign
              name='search1'
              size={20}
              color='black'
              style={styles.searchico}
            />
            <TextInput placeholder='Search' style={styles.searchinput} />
          </View>
          <View style={styles.followingList}>
            {farmers?.map(farmer=>{
            return  
            <FarmerFollowCard 
              farmerName={farmer?.farmerName}
              imageUrl={farmer?.imageUrl}
            />
            })
          }
            <FarmerFollowCard
            />
          </View>
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
  vectorimage: {
    width: 247,
    height: 143,
    marginVertical: 30,
  },
  inputcont: {
    position: 'relative',
    width: '80%',
  },
  inputlabel: {
    paddingLeft: 10,
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  input: {
    position: 'relative',
    height: 40,
    width: '100%',
    fontFamily: 'Poppins',
    paddingLeft: 10,
    backgroundColor: Theme.overlay,
    borderColor: Theme.overlay,
    borderWidth: 1,
    borderRadius: 10,
  },
  loctext: {
    alignSelf: 'baseline',
  },
  searchico: {
    paddingRight: 10,
  },
  searchinput: {
    width: '87%',
  },
  searchCont: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingLeft:20,
    backgroundColor: Theme.overlay,
    width: '90%',
    borderRadius: 20,
    marginVertical: 10,
  },
  followingList: {},
});
