import { React, useState, useEffect } from "react";
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
import { H3, H4, H5,H6 } from "../components/Texts";
import * as Yup from "yup";
import PhoneInput from "react-native-phone-number-input";
import * as Animatable from "react-native-animatable";
import { Animations } from "../constants/Animation";
import { auth } from "../utils/firebase";
import Loading from "../components/Loading";
import LoadingModal from "../components/LoadingModal";

export default function ({ navigation, route }) {
  const [valid, setValid] = useState(false);
  const[err,setErr]=useState("")
  const [password, setPassword] = useState("123456");
  const [isVerified, setIsVerified] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSignUp = async (email) => {
    setSubmitting(true);
    console.log(email)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await user.sendEmailVerification();
        setSubmitting(false);
        console.log("Verification email sent!");
        navigation.navigate("EmailVerify",{message:'Success',userData:route.params.userData});
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error);
      setErr("The email address is already in use by another account")
    }
  };

  // const handleVerifyEmail = async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     try {
  //       console.log(user)
  //       await user.reload();
  //       if (user.emailVerified) {
  //         setIsVerified(true);
  //         console.log(user);
  //         console.log("Success", "Email has been verified!");
  //         navigation.navigate("");
  //       } else {
  //         console.log("Error", "Email has not been verified!");
  //       }
  //     } catch (error) {
  //       console.log("Error", error.message);
  //     }
  //   }
  // };

  // const handleResendVerification = () => {
  //   auth.currentUser.sendEmailVerification()
  //     .then(() => {
  //       console.log('Email verification resent');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Email is required!"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },

    validationSchema: validationSchema,
  });

  const submit = async () => {
    setErr("")
    formik.validateForm();
    Object.keys(formik.values).forEach((value) => {
      formik.setFieldTouched(value);
    });
    if (!Object.keys(formik.touched).length) return;
    for (let error in formik.errors) if (error) return;
    const data = formik.values;
    setValid(true);
    sendToSignup(data.email);
  };
  const sendToSignup = (email) => {
    handleSignUp(email);
  };
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <LoadingModal message="Submitting" visible={submitting} />
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="fadeInUpBig"
            duration={1000}
            delay={2 * 300}
          >
            <View style={styles.pageContent}>
              <Image
                source={require("../assets/signup.png")}
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
                <TextInputBox
                  inputlabel="password"
                  placeholder="password"
                  type="password"
                  name="password"
                  secure={true}
                  onChangeText={formik.handleChange("password")}
                  onBlur={() => formik.setFieldTouched("password", true, true)}
                  value={formik.values.password}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                />
                <TextInputBox
                  inputlabel="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  name="cpassword"
                  secure={true}
                  onChangeText={formik.handleChange("cpassword")}
                  onBlur={() => formik.setFieldTouched("cpassword", true, true)}
                  value={formik.values.cpassword}
                  error={formik.errors.cpassword}
                  touched={formik.touched.cpassword}
                />
                {err?<H6 style={styles.messageText}> {err}</H6>:null}

                <Button
                  title="Submit"
                  color="filledSecondary"
                  size="big"
                  onPress={submit}
                />
              </View>

              <View style={styles.inputcont}></View>
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
    marginVertical: 20,
    alignItems: "center",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    marginTop: 50,
  },
  vectorimage: {
    width: 250,
    height: 200,
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
  messageText: {
    color:Theme.danger,
    paddingBottom:10,
    textAlign: 'center',
  },
});
