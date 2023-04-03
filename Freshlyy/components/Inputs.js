import { contains } from '@firebase/util';
import { React, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Theme from '../constants/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BigButton } from './Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import { H6 } from './Texts';

module.exports.TextInputBox = function (props) {
  const [state, setState] = useState(0);

  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
     
      <TextInput
        onFocus={() => {
          setState(1);
        }}
        onBlur={() => {
          props.onBlur();
          setState(0);
        }}
        name={props.name}
        style={[styles.input, state ? styles.inputFocused : null]}
        placeholder={props.placeholder}
        textContentType={props.type}
        secureTextEntry={props.secure?true:false}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={props.onChangeText}
        value={props.value}
      />
      {props.error && props.touched && (
        <Text style={styles.errormsg}>{props.error}</Text>
      )}
    </View>
  );
};

module.exports.MaskedTextInputBox = function (props) {
  const [state, setState] = useState(0);
  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
      <MaskedTextInput
        onFocus={() => {
          setState(1);
        }}
        onBlur={() => {
          props.onBlur();
          setState(0);
        }}
        name={props.name}
        mask={props.mask}
        style={{ ...styles.input, ...(state ? styles.inputFocused : null) }}
        placeholder={props.placeholder}
        textContentType={props.type}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={props.onChangeText}
        value={props.value}
      />
      {props.error && props.touched && (
        <Text style={styles.errormsg}>{props.error}</Text>
      )}
    </View>
  );
};

// module.exports.DropDownPicker = function (props) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState(props.list);
//   return (
//     <View
//       style={[
//         styles.inputcont,
//         {
//           zIndex: 1000,
//         },
//       ]}
//     >
//       <Text style={styles.inputlabel}>{props.inputlabel}</Text>
//       <DropDownPicker
//         placeholder={props.placeholder ? props.placeholder : '-- Select'}
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         listMode='SCROLLVIEW'
//         setItems={setItems}
//         dropDownDirection='BOTTOM'
//         style={{
//           backgroundColor: Theme.overlay,
//           borderWidth: 0,
//           paddingHorizontal: 10,
//           paddingVertical: 7,
//           borderRadius: 10,
//           minHeight: 20,
//         }}
//         textStyle={{
//           fontFamily: 'Poppins',
//           color: Theme.textColor,
//         }}
//         dropDownContainerStyle={{
//           backgroundColor: Theme.overlay,
//           borderWidth: 0,
//         }}
//         placeholderStyle={{
//           color: Theme.tertiary,
//           // fontFamily:""
//         }}
//       />
//     </View>
//   );
// };

module.exports.CheckBox = function (props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <CheckBox
        disabled={false}
        value={props.value}
        onValueChange={(newValue) => props.setCheckBox(newValue)}
        style={{ margin: 10 }}
        color={Theme.textColor}
      />
      <H6 style={{ fontFamily: 'Poppins' }}>{props.label}</H6>
    </View>
  );
};

// module.exports.DatePicker = function (props) {
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   return(
//     <TouchableOpacity
//     onPress={() => setShowDatePicker(!showDatePicker)}
//   >
//     <View style={styles.dateFullCont}>
//     <View style={styles.dateCont}>
//       <H6>Date of Birth</H6>
//       <H7>{selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</H7>

//       {showDatePicker ? (
//         <DateTimePicker
//           name="dob"
//           mode="date"
//           value={date}
//           display="date"
//           minimumDate={new Date(1950, 0, 1)}
//           onChange={handleDateChange}
//         />
//       ) : null}
//     </View>
//     {formik.errors.dob ? (
//       <Text style={styles.errormsg}>{formik.errors.dob}</Text>
//     ) : null}
//     </View>
//   </TouchableOpacity>
//   )
// };
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  errormsg: {
    color: Theme.danger,
  },
  inputcont: {
    width: '100%',
    marginVertical: 10,
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    fontSize: 15,
  },
  input: {
    fontFamily: 'Poppins',
    color: Theme.textColor,
    padding: 9,
    paddingHorizontal: 10,
    backgroundColor: Theme.contrastTextColor,
    borderRadius: 10,
  },
  inputFocused: {
    backgroundColor: Theme.primaryShade,
  },
});
