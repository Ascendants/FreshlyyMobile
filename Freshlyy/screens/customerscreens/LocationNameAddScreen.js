import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
import { H4, P, H6 } from "../../components/Texts";
import Loading from "../../components/Loading";
import { Formik, validateYupSchema, useFormik } from "formik";
import * as Yup from "yup";

export default function App({ navigation, route }) {
  const [valid, setValid] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState({});

  const validationSchema = Yup.object().shape({
    LocationName: Yup.string()
      .min(2, "Location name is too short!")
      .required("Location name is required!"),
  });

  const formik = useFormik({
    initialValues: {
      LocationName: "",
    },
    validationSchema: validationSchema,
  });

  async function submit() {
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) return;
    for (let error in formik.errors) if (error) return;
    const data = formik.values;
    setValid(true);
    setUserData(data);
    console.log(userData);
    navigation.navigate("selectLocation", {
      type: "Success",
      userData: JSON.stringify(data),
    });
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header back={true} />
        <View style={styles.screen}>
          <H4>Select your Location Name</H4>
          <View style={styles.inputcont}>
            <TextInputBox
              inputlabel="Name"
              placeholder="Enter Location name"
              name="LocationName"
              onChangeText={formik.handleChange("LocationName")}
              onBlur={() => formik.setFieldTouched("LocationName", true, true)}
              value={formik.values.LocationName}
              error={formik.errors.LocationName}
              touched={formik.touched.LocationName}
            />
          </View>

          <View>
            <Button
              title="Next"
              color="shadedPrimary"
              size="normal"
              onPress={submit}
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
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    padding: 10,
  },
  map: {
    margin: 10,
    // marginRight: 10,
    //border: 10,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callout: {
    width: 200,
    height: 200,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 8,
    padding: 4,
  },
  inputcont: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});
