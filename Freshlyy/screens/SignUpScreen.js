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
import * as Animatable from "react-native-animatable";
import { Animations } from "../constants/Animation";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "react-native-modal-dropdown";
import { H2, H4, H5, H6, H7, H8 } from "../components/Texts";

export default function ({ navigation }) {
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState(null);
  const genders = ["Male", "Female"];

  function handleDateChange(event, date) {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
      formik.setFieldValue(
        "dob",
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      ); // save date in ISO string format
    }
  }
  const handleDropdownSelect = (index, value) => {
    setSelectedGender(value);
    formik.setFieldValue("gender", value);
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, "First Name is too short!")
      .required("First Name is required!"),
    LastName: Yup.string()
      .min(2, "Last Name is too short!")
      .required("Last Name is required!"),
    dob: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 15)),
        "You must be at least 15 years old to register."
      )
      .required("Date of birth is required!"),
    gender: Yup.string().required("Gender is required!"),
    address: Yup.string().required("Address is required!"),
    nic: Yup.string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, "Invalid NIC format!")
      .required("NIC is required!"),
  });

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      address: "",
      dob: "",
      gender: "",
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
    setValid(true);
    setUserData(data);
    console.log(userData)
    if (valid) {
      navigation.navigate("beFarmer", { type: "Success", userData: data });
    }
  }
  const animation = Animations[Math.floor(Math.random() * Animations.length)];
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="fadeInUpBig"
            duration={1000}
            delay={2 * 300}
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

                <TouchableOpacity
                  onPress={() => setShowDatePicker(!showDatePicker)}
                >
                  <View style={styles.dateFullCont}>
                  <H6 style={styles.inputlabel}>Date of Birth</H6>
                    <View style={styles.dateCont}>
                      
                      <H6 style={{  color: Theme.textColor,}}>
                        {selectedDate.toDateString()
                        }
                      </H6>

                      {showDatePicker ? (
                        <DateTimePicker
                          name="dob"
                          mode="date"
                          value={date}
                          display="date"
                          accentColor ={Theme.primaryShade}
                          minimumDate={new Date(1950, 0, 1)}
                          onChange={handleDateChange}
                        />
                      ) : null}
                    </View>
                    {formik.errors.dob ? (
                      <Text style={styles.errormsg}>{formik.errors.dob}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>


                <View style={styles.datFullCont}>
                  <H6 style={styles.inputlabel}>Gender</H6>
                <Dropdown
                  options={genders}
                  onSelect={handleDropdownSelect}
                  defaultValue={selectedGender ?? "Select Gender"}
                  style={styles.dropDownCont}
                  textStyle={{ fontSize: 16, fontFamily: 'Poppins',color:Theme.textColor,}}
                  dropdownStyle={styles.dropDown}
                  dropdownTextHighlightStyle={{backgroundColor:Theme.primaryShade}}
                />
                {formik.touched.gender && formik.errors.gender ? (
                  <Text style={{ color:Theme.danger }}>{formik.errors.gender}</Text>
                ) : null}
               </View>


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
  dateCont: {
    width: 320,
    padding: 9,
    paddingHorizontal: 10,
    marginVertical: 0,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    
  },
  errormsg: {
    color: Theme.danger,
  },
  dateFullCont: {
    marginVertical: 10,
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    fontSize: 15,
  },
  dropDownCont:{
    width: 320,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
   paddingHorizontal:9,
   color:"#A7A7A7",
  },
   dropDown:{
   display:'flex',
  
   justifyContent:'flex-start',
    width:310,
    borderColor:"white",
    height:75,
    borderRadius:5,
   
  },

});
