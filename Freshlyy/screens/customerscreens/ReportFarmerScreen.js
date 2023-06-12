import React, { useEffect, useState } from "react";
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
import { H4, P, H3, H5, H6 } from "../../components/Texts";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import ENV from "../../constants/env";

export default function () {
  const [farmer, setFarmer] = useState([]);
  // const [items, setItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function follow() {
    try {
      const result = await fetch(
        ENV.backend + "/customer/follow/" + farmer?.farmerId,
        {
          method: "POST",
          headers: {
            useremail: route.params.userEmail,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == "Success") {
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
        ENV.backend + "/customer/unfollow/" + farmer?.farmerId,
        {
          method: "POST",
          headers: {
            useremail: route.params.userEmail,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      if (res.message == "Success") {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  const getData = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + "/customer/reportFarmer/63b6b5d2ce65a7b5a2671383", {
      //getting data from the backend (all products)
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "Success") {
          setFarmer(res.farmer);
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
        </View>
        <View style={styles.actionButtonContainer}>
          <Button
            icon={
              <Feather
                name="message-circle"
                size={24}
                color={Theme.textColor}
              />
            }
            title="Chat"
            type="icon"
            size="normal"
            color="shadedTertiary"
          />
          <Button
            type="icon"
            icon={
              <Ionicons
                name="ios-share-outline"
                size={24}
                color={Theme.textColor}
              />
            }
            title="Share"
            size="normal"
            color="shadedTertiary"
          />
        </View>
        <View>
          <Button
            title={farmer?.isFollowing ? "Following" : "Follow"}
            color={farmer?.isFollowing ? "filledPrimary" : "shadedPrimary"}
            size="normal"
            onPress={farmer?.isFollowing ? unfollow : follow}
          />
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
    margin: 20,
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    color: Theme.primary,
    justifyContent: "center",
  },
  Rating: {
    justifyContent: "center",
  },
  H3: {
    alignItems: "center",
  },
  actionButtonContainer: {
    flexDirection: "row",
    //justifyContent: 'flex-end',
    alignItems: "center",
    flex: 2,
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
