import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Theme from '../../constants/theme';
import { TextInputBox } from '../../components/Inputs';
import { Button } from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { H3 } from '../../components/Texts';
import { Ionicons, Feather } from '@expo/vector-icons';
import ENV from '../../constants/env';

export default function ({ route, navigation }) {
  const [farmer, setFarmer] = useState([]);
  const [Report, setReport] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function follow() {
    try {
      const result = await fetch(
        ENV.backend + '/customer/follow/' + farmer?.farmerId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async function unfollow() {
    try {
      const result = await fetch(
        ENV.backend + '/customer/unfollow/' + farmer?.farmerId,
        {
          method: 'POST',
          headers: {
            Authorization: route.params.auth,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == 'Success') {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/customer/report-farmer/63b6b5d2ce65a7b5a2671383', {
      //getting data from the backend (all products)
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
          setReport(res.Report);
          console.log(res);
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
          <H3>Report Farmer</H3>
          <View>
            <Image
              source={{ uri: farmer?.farmerImage?.imageUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.textName}>
            <H3 style={styles.name}>{farmer?.farmerName}</H3>
          </View>
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
          </View>
          <View>
            <Button
              title={farmer?.isFollowing ? 'Following' : 'Follow'}
              color={farmer?.isFollowing ? 'filledPrimary' : 'shadedPrimary'}
              size='normal'
              onPress={farmer?.isFollowing ? unfollow : follow}
            />
          </View>
          <View style={styles.report}>
            <TextInputBox
              inputlabel='Report'
              placeholder='Write Report'
              name='Report'
              //onChangeText={setReport('Report')}
            />
            <Button
              size='normal'
              title='Submit  Report'
              color='shadedDanger'
            ></Button>
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
    margin: 20,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    color: Theme.primary,
    justifyContent: 'center',
  },
  Rating: {
    justifyContent: 'center',
  },
  H3: {
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  report: {
    width: '90%',
    marginBottom: 100,
  },
});

// farmername: {
//   color: "blue",
// },
// delivery: {
//   textAlign: "left",
//   marginTop: 5,
//   marginBottom: 5,
// },
// communi: {
//   marginTop: 5,
//   marginBottom: 5,
// },
// rating: {
//   marginBottom: 5,
// },
// edit: {
//   marginTop: 40,
// },
// image: {
//   width: 85,
//   height: 85,
//   borderRadius: 100,
// },
// name: {
//   color: Theme.primary,
//   justifyContent: "center",
// },
// Rating: {
//   justifyContent: "center",
// },
// H4: {
//   alignItems: "center",
// },
// actionButtonContainer: {
//   flexDirection: "row",
//   //justifyContent: 'flex-end',
//   alignItems: "center",
//   flex: 3,
// },
// contaniner: {
//   display: "flex",
//   flexDirection: "row",
//   flex: 2,
// },
// innercontaniner: {
//   display: "flex",
//   flexDirection: "column",
//   marginLeft: 20,
//   justifyContent: "space-between",
//   //alignItems:'right',
// },
// contaniner2: {
//   display: "flex",
//   flexDirection: "row",
//   flex: 2,
//   margin: 20,
//   justifyContent: "center",
// },
// btn: {
//   height: "90%",
//   marginVertical: 10,
// },
//});
