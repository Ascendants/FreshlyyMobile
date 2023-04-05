import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Theme from '../constants/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import { H5 } from './Texts';
import { Button } from './Buttons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        secureTextEntry={props.secure ? true : false}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Theme.placeholderText}
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
        placeholderTextColor={Theme.placeholderText}
      />
      {props.error && props.touched && (
        <Text style={styles.errormsg}>{props.error}</Text>
      )}
    </View>
  );
};

module.exports.DropDownPicker = function () {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <DropDownPicker
      items={items}
      defaultValue={selectedItem}
      containerStyle={{ height: 40 }}
      itemStyle={{ justifyContent: 'flex-start' }}
      onChangeItem={(item) => {
        setSelectedItem(item.value);
        onSelect(item.value);
      }}
    />
  );
};

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
module.exports.DatePicker = function (props) {
  let showDatePicker = null;
  let showMode = null;
  if (Platform.OS === 'android') {
    showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: props.value,
        onChange,
        mode: currentMode,
        is24Hour: true,
        minimumDate: props.minimumDate,
        maximumDate: props.maximumDate,
      });
    };

    showDatePicker = () => {
      showMode('date');
    };
  }
  function onChange(event, date) {
    props.onPress();
    date !== undefined ? props.onChange(date) : null;
  }
  return (
    <View style={styles.inputcont}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.dateCont}>
          <H5
            style={{
              color: Theme.textColor,
            }}
          >
            {props.inputlabel}
          </H5>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              themeVariant='light'
              name={props.name}
              mode='date'
              value={props.value}
              accentColor={Theme.primary}
              minimumDate={props.minimumDate}
              onChange={onChange}
              maximumDate={props.maximumDate}
            />
          ) : (
            <Button
              size='normal'
              color='shadedTertiary'
              onPress={showDatePicker}
              title={
                props.value instanceof Date
                  ? props.value.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Pick Date'
              }
            />
          )}
        </View>
        {props.touched && props.error ? (
          <Text style={styles.errormsg}>{props.error}</Text>
        ) : null}
      </TouchableWithoutFeedback>
    </View>
  );
};

// module.exports.DatePicker = function (props) {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   return (
//     <View>
//       <Button
//         size='big'
//         color='shadedPrimary'
//         onPress={showDatepicker}
//         title='Show date picker!'
//       />
//       <Text>selected: {date.toLocaleString()}</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  errormsg: {
    color: Theme.danger,
    fontFamily: 'Poppins',
    marginVertical: 5,
    marginHorizontal: 4,
    fontSize: 14,
  },
  inputcont: {
    width: '100%',
    marginVertical: 10,
  },
  inputlabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  input: {
    fontFamily: 'Poppins',
    color: Theme.textColor,
    padding: 9,
    paddingHorizontal: 10,
    backgroundColor: Theme.contrastTextColor,
    borderRadius: 10,
    fontSize: 18,
  },
  inputFocused: {
    backgroundColor: Theme.primaryShade,
  },
  dateCont: {
    padding: 10,
    paddingHorizontal: 10,
    marginVertical: 0,
    borderRadius: 10,
    backgroundColor: Theme.contrastTextColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
