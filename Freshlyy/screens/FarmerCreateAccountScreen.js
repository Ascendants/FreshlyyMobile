import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Theme from '../constants/theme';
import { Button } from '../components/Buttons';
import { TextInputBox, DropDownPicker, DatePicker } from '../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Formik, validateYupSchema, useFormik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import { Animations } from '../constants/Animation';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from 'react-native-modal-dropdown';
import { H2, H4, H5, H6, H7, H8 } from '../components/Texts';

export default function ({ navigation, route }) {
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasVehicle, setHasVehicle] = useState(null);
  const vehicle = ['Has a vehicle to deliver', 'No vehicle to deliver'];

  function handleDateChange(event, date) {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
      formik.setFieldValue(
        'dob',
        date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      ); // save date in ISO string format
    }
  }
  const handleDropdownSelect = (index, value) => {
    setHasVehicle(value);
    formik.setFieldValue('hasVehicle', value);
  };

  const validationSchema = Yup.object().shape({
    Occupation: Yup.string().required('Occupation is required!'),
    delDistance: Yup.string().required(
      'Maximum delivery distance is required!'
    ),
    delCharge: Yup.string().required('Delivery Charge per Km is required!'),

    hasVehicle: Yup.string().required(
      'Vehicle accessabilty details are required!'
    ),
    address: Yup.string().required('Address is required!'),
    nic: Yup.string()
      .matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, 'Invalid NIC format!')
      .required('NIC is required!'),
  });

  const formik = useFormik({
    initialValues: {
      Occupation: '',
      delDistance: '',
      delCharge: '',
      address: '',
      hasVehicle: '',
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
    if (valid) {
      navigation.navigate('beFarmer', { type: 'Success', userData: data });
    }
  }
  const animation = Animations[Math.floor(Math.random() * Animations.length)];
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation='fadeInUpBig'
            duration={1000}
            delay={2 * 300}
          >
            <View style={styles.pageContent}>
              <Image
                source={require('../assets/farmer.png')}
                style={styles.vectorimage}
              />
              {/* <DatePicker/> */}

              <View style={styles.inputcont}>
                <TextInputBox
                  inputlabel='Occupation'
                  placeholder='Enter Occupation'
                  name='Occupation'
                  onChangeText={formik.handleChange('Occupation')}
                  onBlur={() =>
                    formik.setFieldTouched('Occupation', true, true)
                  }
                  value={formik.values.Occupation}
                  error={formik.errors.Occupation}
                  touched={formik.touched.Occupation}
                />

                <TextInputBox
                  inputlabel='Maximum Delivery Distance'
                  placeholder='Enter Maximum Delivery Distance'
                  name='delDistance'
                  onChangeText={formik.handleChange('delDistance')}
                  onBlur={() =>
                    formik.setFieldTouched('delDistance', true, true)
                  }
                  keyboardType='number-pad'
                  value={formik.values.delDistance}
                  error={formik.errors.delDistance}
                  touched={formik.touched.delDistance}
                />

                <TextInputBox
                  inputlabel='Delivery Charge'
                  placeholder='Enter delivery charge per Km'
                  name='delCharge'
                  onChangeText={formik.handleChange('delCharge')}
                  onBlur={() => formik.setFieldTouched('delCharge', true, true)}
                  keyboardType='number-pad'
                  value={formik.values.delCharge}
                  error={formik.errors.delCharge}
                  touched={formik.touched.delCharge}
                />

                <View style={styles.datFullCont}>
                  <H6 style={styles.inputlabel}>Vehicle Accessability</H6>
                  <Dropdown
                    options={vehicle}
                    onSelect={handleDropdownSelect}
                    defaultValue={hasVehicle ?? '-----Select-----'}
                    style={styles.dropDownCont}
                    textStyle={{
                      fontSize: 16,
                      fontFamily: 'Poppins',
                      color: hasVehicle ? Theme.textColor : '#A7A7A7',
                    }}
                    dropdownStyle={styles.dropDown}
                    dropdownTextHighlightStyle={{
                      backgroundColor: Theme.primaryShade,
                    }}
                  />
                  {formik.touched.hasVehicle && formik.errors.hasVehicle ? (
                    <Text style={{ color: Theme.danger }}>
                      {formik.errors.hasVehicle}
                    </Text>
                  ) : null}
                </View>

                <TextInputBox
                  inputlabel='Address'
                  placeholder='Enter Address'
                  name='address'
                  onChangeText={formik.handleChange('address')}
                  onBlur={() => formik.setFieldTouched('address', true, true)}
                  value={formik.values.address}
                  error={formik.errors.address}
                  touched={formik.touched.address}
                />
                <Button
                  title='Next'
                  color='filledSecondary'
                  size='big'
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
    height: '100%',
    fontFamily: 'Poppins',
  },
  pageContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 200,
    marginVertical: 30,
  },
  inputcont: {
    position: 'relative',
    width: '90%',
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  dateCont: {
    width: 320,
    padding: 9,
    paddingHorizontal: 10,
    marginVertical: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
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
  dropDownCont: {
    width: 320,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 9,
    color: '#A7A7A7',
  },
  dropDown: {
    display: 'flex',

    justifyContent: 'flex-start',
    width: 310,
    borderColor: 'white',
    height: 75,
    borderRadius: 5,
  },
});
