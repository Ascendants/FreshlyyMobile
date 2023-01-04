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
  return (
    <View style={styles.inputcont}>
      <Text style={styles.inputlabel}>{props.inputlabel}</Text>
      <TextInput style={styles.input} placeholder={props.placeholder} keyboardType={props.type} />
    </View>
  );
};

module.exports.DropDownPicker = function (props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.list);
  return (
    <View style={styles.dropdowncont}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
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
    position: 'relative',
    width: '80%',
    paddingTop: 15,
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
  dropdowncont: {
    paddingTop: 15,
  },
  dropdown: {
    backgroundColor: Theme.overlay,
    width: '80%',
    borderColor: Theme.overlay,
  },
});
