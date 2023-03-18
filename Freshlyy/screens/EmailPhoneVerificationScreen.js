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
import PhoneInput from "react-native-phone-number-input";
 


export default function ({ navigation }) {
  const [valid, setValid] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Email is required!"),
    phoneNumber: Yup.string()
          .matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, 'Please enter a valid Sri Lankan phone number ex- +94783112043')
          .required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber:"",
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
    console.log(data);
    if (valid) {
      navigation.navigate("createPassword", { type: "Success" });
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
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Image
              source={require("../assets/emailVerify.png")}
              style={styles.vectorimage}
            />
            {/* <DatePicker/> */}

            <View style={styles.inputcont}>
              <TextInputBox
                inputlabel="Email"
                placeholder="Enter Email"
                type="email-address"
                name="email"
                onChangeText={formik.handleChange("email")}
                onBlur={() => formik.setFieldTouched("email", true, true)}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
              />
              <PhoneInput
                value={formik.values.phoneNumber}
                defaultCode="LK"
                placeholder="Enter Phone NUmber "
                layout="first"
                textProps={{ keyboardType: "numeric" }}
                onChangeText={formik.handleChange("phoneNumber")}
                onBlur={formik.handleBlur("phoneNumber")}
                onChangeFormattedText={formik.handleChange("phoneNumber")}
                withDarkTheme
                withShadow
                autoFocus
              />
              {formik.errors.phoneNumber && (
                <Text style={{color: Theme.danger,textAlign:'left' }}>
                  {formik.errors.phoneNumber}
                </Text>
              )}

              <Button
                title="Next"
                color="filledSecondary"
                size="big"
                onPress={submit}
              />
            </View>

            <View style={styles.inputcont}></View>
          </View>
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
    width: 250,
    height: 190,
    marginVertical: 20,
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
