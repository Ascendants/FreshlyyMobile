import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import { H4, H5, H8, P } from '../../components/Texts';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';
import { TextInputBox } from '../../components/Inputs';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';
import { is } from 'date-fns/locale';
// import ImagePicker from 'react-native-image-crop-picker';

export default function ({ navigation, route }) {
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [desc, setDesc] = useState('');
  const [email, setEmail] = useState('');

  const issue = 'Cant SignIn';

  const toggleCollapsed1 = () => {
    setCollapsed1(!collapsed1);
  };

  const toggleCollapsed2 = () => {
    setCollapsed2(!collapsed2);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(ENV.backend + '/farmer/support-ticket/', {
        method: 'POST',
        headers: {
          useremail: route.params.userEmail,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          number: number,
          issue: issue,
          desc: desc,
          email: email,
        }),
      });
      const data = await response.json();
      const id = data.id;
      navigation.navigate('Message', {
        type: 'Success',
        messageTitle: 'Ticket Sent Successfully!',
        subjectId: id,
        messageText:
          ' is your ticket number. An administrator will be in touch with you shortly!',
        goto: 'Farmer Dashboard',
        goButtonText: 'Dashboard',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} />
        <H4 style={{ textAlign: 'center', color: Theme.primary }}>
          Can't Sign In
        </H4>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={toggleCollapsed1}>
            <View style={styles.button}>
              <View style={styles.barContainer}>
                <H5>I forgot my password</H5>
                <AntDesign name='down' size={24} color={Theme.textColor} />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed1}>
            <View style={styles.collapsContainer}>
              <P>
                Tap the link below to reset your password. You'll receive an
                email with a unique link you can use to create a new password.
              </P>
              <P></P>
              <P>
                Be careful not to share your password with others - Freshlyy
                support will never ask you for your password.
              </P>
              <P></P>
              <TouchableOpacity>
                <H5 style={{ textAlign: 'center', color: Theme.secondary }}>
                  Reset my password
                </H5>
              </TouchableOpacity>
            </View>
          </Collapsible>
          <TouchableOpacity onPress={toggleCollapsed2}>
            <View style={styles.button}>
              <View style={styles.barContainer}>
                <H5>I can't sign in to my account</H5>
                <AntDesign name='down' size={24} color={Theme.textColor} />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed2}>
            <ScrollView
              style={styles.collapsContainer}
              showsVerticalScrollIndicator={false}
            >
              <P>
                If you're unable to sign in to your account for any other
                reason, let us know below. We usually respond to all requests
                within 24 hours.
              </P>
              <P></P>
              <P>
                We ask that you give us with some additional info so we can
                confirm your identity. This helps us keep your account secure.
              </P>
              <P></P>
              <TextInputBox
                inputlabel='First and Last Name'
                placeholder=''
                value={name}
                onChangeText={(text) => setName(text)}
                onBlur={() => {
                  console.log('');
                }}
                onFocus={() => {
                  console.log('');
                }}
              />
              <TextInputBox
                inputlabel='Mobile Number'
                placeholder=''
                value={number}
                onChangeText={(text) => setNumber(text)}
                onBlur={() => {
                  console.log('');
                }}
                onFocus={() => {
                  console.log('');
                }}
              />
              <TextInputBox
                inputlabel='Share details for the issue you are facing while signing in'
                placeholder=''
                value={desc}
                onChangeText={(text) => setDesc(text)}
                onBlur={() => {
                  console.log('');
                }}
                onFocus={() => {
                  console.log('');
                }}
              />
              <Text style={styles.inputLabel}>
                Screenshot of the error message while you are trying to sign in
              </Text>
              <TouchableOpacity>
                <View style={styles.inputImgBox}>
                  <Ionicons name='image' size={22} color={Theme.tertiary} />
                  <H8 style={{ color: Theme.tertiary }}>Select file</H8>
                </View>
              </TouchableOpacity>
              <TextInputBox
                inputlabel='Email address where our support team can contact you'
                placeholder=''
                value={email}
                onChangeText={(text) => setEmail(text)}
                onBlur={() => {
                  console.log('');
                }}
                onFocus={() => {
                  console.log('');
                }}
              />
              <View style={{ width: '40%', alignSelf: 'center' }}>
                <Button
                  size='normal'
                  color='shadedSecondary'
                  title='submit'
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </Collapsible>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Theme.tertiaryShade,
    borderRadius: 10,
    padding: 8,
    marginVertical: 12,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsContainer: {
    backgroundColor: Theme.tertiaryShade,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  inputLabel: {
    color: Theme.textColor,
    fontFamily: 'Poppins',
  },
  inputImgBox: {
    backgroundColor: Theme.contrastTextColor,
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
