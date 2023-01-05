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
import Theme from '../constants/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { BigButton } from './Buttons';

module.exports.TextInputBox = function (props) {
  const [state, setState] = useState(0);

  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
      <TextInput
        onFocus={() => setState(1)}
        onBlur={() => setState(0)}
        style={[styles.input, state ? styles.inputFocused : null]}
        placeholder={props.placeholder}
        textContentType={props.type}
      />
    </View>
  );
};

module.exports.DropDownPicker = function (props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.list);
  return (
    <View
      style={[
        styles.inputcont,
        {
          zIndex: Platform.OS === 'ios' ? 100 : null,
        },
      ]}
    >
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
      <DropDownPicker
        placeholder={props.placeholder ? props.placeholder : '-- Select'}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        listMode='SCROLLVIEW'
        setItems={setItems}
        dropDownDirection='BOTTOM'
        style={{
          backgroundColor: Theme.overlay,
          borderWidth: 0,
          paddingHorizontal: 10,
          paddingVertical: 7,
          borderRadius: 10,
          minHeight: 20,
        }}
        textStyle={{
          fontFamily: 'Poppins',
          color: Theme.textColor,
        }}
        dropDownContainerStyle={{
          backgroundColor: Theme.overlay,
          borderWidth: 0,
        }}
        placeholderStyle={{
          color: Theme.tertiary,
          // fontFamily:""
        }}
      />
    </View>
  );
};
// module.exports.DatePicker = function (props) {
//   const [date, setDate] = useState(new Date());

//   return <DatePicker date={date} onDateChange={setDate} />;
// };
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 50,
  },
  vectorimage: {
    width: 247,
    height: 143,
    marginTop: 30,
  },
  inputcont: {
    width: '80%',
    marginVertical: 10,
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  input: {
    fontFamily: 'Poppins',
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Theme.overlay,
    borderRadius: 10,
  },
  inputFocused: {
    backgroundColor: Theme.primaryShade,
  },
});
