import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Theme from "../constants/theme";
import { Button } from "../components/Buttons";
import { TextInputBox, DropDownPicker, DatePicker } from "../components/Inputs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Formik, validateYupSchema, useFormik } from "formik";
import * as Yup from "yup";
import * as Animatable from 'react-native-animatable';
import {Animations} from "../constants/Animation";

export default function ({ navigation }) {
  const [valid,setValid]=useState(false)
  const [userData,setUserData]=useState({})

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, "First Name is too short!")
      .required("First Name is required!"),
    LastName: Yup.string()
      .min(2, "Last Name is too short!")
      .required("Last Name is required!"),
    address: Yup.string().required("Address is required!"),
    // dob: Yup.string()
    //   .matches(
    //     /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
    //     "Invalid date format! (dd/mm/yyyy)"
    //   )
    //   .required("Date of birth is required!"),
    nic: Yup.string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, "Invalid NIC format! (XXXXXXXXXV)")
      .required("NIC is required!"),
  });

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      address: "",
      // dob: "",
      nic: "",
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
    setValid(true)
    setUserData(data)
    if(valid){
      navigation.navigate("beFarmer",{ type: 'Success',userData:data})
    }
      // setValid(false)
      // navigation.navigate('Message', {
      //   type: 'fail',
      //   messageTitle: 'Please check the details and submit again :(',
      //   messageText: 'Something went wrong.',
      //   // goto: '',
      //   // goButtonText: 'Go to Dashboard',
      // });
    
  }
  const animation=Animations[Math.floor(Math.random()*Animations.length)]
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View
                animation="fadeInUpBig"
                duration={1000}
                delay={2*300}
             > 
          <View style={styles.pageContent}>
       
            <Image
              source={require("../assets/signupvector.png")}
              style={styles.vectorimage}
            />
            {/* <DatePicker/> */}

            <View style={styles.inputcont}>
              <TextInputBox
                inputlabel="First Name"
                placeholder="Enter First name"
                name="FirstName"
                onChangeText={formik.handleChange("FirstName")}
                onBlur={() => formik.setFieldTouched("FirstName", true, true)}
                value={formik.values.FisrtName}
                error={formik.errors.FirstName}
                touched={formik.touched.FirstName}
              />

              <TextInputBox
                inputlabel="Last Name"
                placeholder="Enter Last name "
                name="LastName"
                onChangeText={formik.handleChange("LastName")}
                onBlur={() => formik.setFieldTouched("LastName", true, true)}
                value={formik.values.LastName}
                error={formik.errors.LastName}
                touched={formik.touched.LastName}
              />
    
              {/* <DropDownPicker
                inputlabel="Gender"
                list={[
                  { label: "Male", value: "m" },
                  { label: "Female", value: "f" },
                  { label: "Other", value: "o" },
                ]}
              /> */}
              <TextInputBox
                inputlabel="NIC Number"
                placeholder="Enter NIC"
                name="nic"
                onChangeText={formik.handleChange("nic")}
                onBlur={() => formik.setFieldTouched("nic", true, true)}
                value={formik.values.nic}
                error={formik.errors.nic}
                touched={formik.touched.nic}
              />
              <TextInputBox
                inputlabel="Address"
                placeholder="Enter Address"
                name="address"
                onChangeText={formik.handleChange("address")}
                onBlur={() => formik.setFieldTouched("address", true, true)}
                value={formik.values.address}
                error={formik.errors.address}
                touched={formik.touched.address}
              />
              <Button
                title="Next"
                color="filledSecondary"
                size="big"
                onPress={submit}
              />
           
            </View>
          </View>
          </Animatable.View> 
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    fontFamily: "Poppins",
  },
  pageContent: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginVertical: 30,
  },
  inputcont: {
    position: "relative",
    width: "90%",
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inputlabel: {
    paddingLeft: 10,
    color: Theme.textColor,
    fontFamily: "Poppins",
  },
  input: {
    position: "relative",
    height: 40,
    width: "100%",
    fontFamily: "Poppins",
    paddingLeft: 10,
    backgroundColor: Theme.overlay,
    borderColor: Theme.overlay,
    borderWidth: 1,
    borderRadius: 10,
  },
});
