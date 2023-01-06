import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "../constants/theme";
import { Button } from "../components/Buttons";
import { TextInputBox, DropDownPicker } from "../components/Inputs";
import { H1, H2, H4, P } from "../components/Texts";
import Header from "../components/Header";

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <Image
          source={require("../assets/befarmer.png")}
          style={styles.loginpic}
        />
        <H4 style={styles.logintext}>Do you want to become farmer too?</H4>
        <View>
          <View style={styles.buttoncont}>
            <Button title="Yes" color="filledPrimary" size="normal" />
            <H4 style={styles.desctext}>
              Additional information will be collected
            </H4>
          </View>
          <View style={styles.buttoncont}>
            <Button title=" No " color="filledSecondary" size="normal" />
            <H4 style={styles.desctext}>You can be a farmer later as well</H4>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: "100%",
    alignItems: "center",
    //justifyContent: 'center',
    fontFamily: "Poppins",
  },
  loginpic: {
    width: 300,
    height: 200,
    marginTop: 50,
    marginBottom: 0,
  },
  logintext: {
    margin: 10,
    color: Theme.textColor,
    fontFamily: "Poppins",
  },
  buttoncont: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: 20,
  },
  desctext: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
