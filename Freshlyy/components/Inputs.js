import { contains } from '@firebase/util';
import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Theme from '../constants/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BigButton } from './Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';

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
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );
};

module.exports.DatePicker = function (props) {
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Date = {date.toDateString()}</Text>

        <Text>Time = {time.toLocaleTimeString('en-US')}</Text>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}

        {!datePicker && (
          <View style={{ margin: 10 }}>
            <BigButton
              title='Show Date Picker'
              color='green'
              onPress={showDatePicker}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
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
    width: '80%',
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
    backgroundColor: Theme.overlay,
    borderRadius: 10,
  },
  inputFocused: {
    backgroundColor: Theme.primaryShade,
  },
});
